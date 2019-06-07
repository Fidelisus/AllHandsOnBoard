using AllHandsOnBoardBackend.Helpers;
using AllHandsOnBoardBackend.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic;

namespace AllHandsOnBoardBackend.Services
{
    public interface ITasksService
    {
        bool addTask(Tasks task, List<int> tags);
        TaskWithUploader getTask(int id);
        bool applyToTask(int taskId, int userId);
        bool taskStart (int taskId);
        Tasks validateTask(int taskId,int studentId,int rating);
        List<TaskWithUploader> getTasks(int numberOfTasks, List<int> tags, int pageNumber, string columnToSearch, string keyword);
        List<Users> getApplied(int id);
    }

    public class GetTasksRequest
    {
        public int numberOfTasks { get; set; }
        public List<int> listTags { get; set; }
        public int pageNumber { get; set; }

        public string columnToSearch { get; set; }
        public string keyword { get; set; }

        public GetTasksRequest() {; }
    }

    public class addTaskRequest
    {
        public Tasks task { get; set; }
        public List<int> tags { get; set; }

        public addTaskRequest() {; }
    }

    public class applyTaskRequest
    {
        public int taskId {get;set;}
    }

    public class validationRequest{
        public int taskId{get;set;}
        public int studentId{get;set;}
        public int rating{get;set;}
    }

    public class TasksService : ITasksService
    {
        private readonly AppSettings appSettings;
        private all_hands_on_boardContext context;


        public TasksService(AppSettings appSettingsParam)
        {
            appSettings = appSettingsParam;
            context = new all_hands_on_boardContext();
        }

        public bool addTask(Tasks task, List<int> tags)
        {
            if(task.TaskId == -1)
                task.TaskId = context.Tasks.Count()+1;
            try
            {
                context.Tasks.Add(task);
                foreach (var tag in tags)
                {
                    var tg = new TaskTags();
                    tg.TaskId = task.TaskId;
                    tg.TagId = tag;
                    context.TaskTags.Add(tg);
                }

                context.SaveChanges();
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("Failed to add task to database: ", e.Message));
                return false;
            }
            return true;
        }

        public List<Users> getApplied(int id){
            
            var aggregation = context.TaskAggregation.Where(t => t.TaskId == id);
            List<Users> applied = new List<Users>();
            Users tempU;
            foreach(TaskAggregation uId in aggregation){
                tempU = context.Users.Where(t => t.UserId == uId.UserId);
                tempU.Password = null;
                applied.Add(tempU);
            }
            return applied;
        }

        public TaskWithUploader getTask(int id)
        {
            var table_join = (
                from tasks in context.Tasks
                join users in context.Users
                on tasks.UploaderId equals users.UserId
                where tasks.TaskId == id
                select new TaskWithUploader()
                {
                    task = tasks,
                    UploaderName = users.Name,
                    UploaderSurname = users.Surname,
                    UploaderEmail = users.Email,
                }
                );
            try
            {
                var oneTask = table_join.FirstOrDefault<TaskWithUploader>();
                var tag_table = (
                        from task_Tags in context.TaskTags
                        join tags in context.Tags
                        on task_Tags.TagId equals tags.TagId
                        select new { tags, task_Tags }
                    );
                var tagList = tag_table.ToList();


                oneTask.tags = new List<string>();
                oneTask.task.TaskTags = null;
                for (var j = 0; j < tagList.Count; j++)
                {
                    if (oneTask.task.TaskId == tagList[j].task_Tags.TaskId)
                    {
                        oneTask.tags.Add(tagList[j].tags.TagDescription);
                    }
                }
                return oneTask;
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("Failed to get task: ", e.Message));
                return null;
            }


        }

        public bool applyToTask(int taskId, int userId)
        {
            var task = context.Tasks.Find(taskId);
            var taskAggregation = new TaskAggregation();
            taskAggregation.Task = task;
            taskAggregation.User = context.Users.Find(userId);
            try
            {
                context.TaskAggregation.Add(taskAggregation);
                task.NoOfStudents++;
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("Failed to add task aggregation on db : ", e.Message));
                return false;
            }
            return true;
        }


        public bool taskStart (int taskId){
            try
            {
                Tasks task = context.Tasks.Find(taskId);
                task.WorkStartDate = DateTime.Now;
                task.Stateoftask = "GOING";
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("Failed to start the task in database: ", e.Message));
                return false;
            }
            return true;
        }

        public Tasks validateTask(int taskId,int studentId,int rating)
        {
            Tasks task = context.Tasks.Find(taskId);
            Users student = context.Users.Find(studentId);
            
            if (task != null)
            {
                try
                {
                    task.Stateoftask = "DONE";
                    task.SigningFinishDate = DateTime.Now;
                    var taskValidated = new TasksValidated();
                    taskValidated.TaskId = task.TaskId;
                    taskValidated.UserId = student.UserId;
                    context.TasksValidated.Add(taskValidated);
                    student.Points += task.PointsGained;
                    var DBRating = new UserRating();
                    DBRating.UserId = studentId;
                    DBRating.Rating = rating;
                    context.UserRating.Add(DBRating);

                    var removeAggregation = context.TaskAggregation.Where(w => w.TaskId == task.TaskId);
                    foreach (TaskAggregation taskAgg in removeAggregation){
                        context.TaskAggregation.Remove(taskAgg);
                    }
                    task.TasksValidated = null;
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    Log.Error(String.Concat("Failed to validate a task on db : ", e.Message));
                    return task;
                }
                return task;
            }
            return task;
        }

        public List<TaskWithUploader> getTasks(int numberOfTasks, List<int> tagsList, int pageNumber, string columnToSearch, string keyword)
        {
            IQueryable<TaskWithUploader> table_join;
            if (columnToSearch == "")
            {
                columnToSearch = "ShortDescription";
                keyword = "";
            }
            keyword = keyword.ToLower();
            columnToSearch = "task." + columnToSearch;
            try
            {
                if (tagsList.Count() > 0)
                {
                    table_join = (
                    from taskAgrr in context.TaskTags
                    join tasks in context.Tasks
                    on taskAgrr.TaskId equals tasks.TaskId
                    join tags in context.Tags
                    on taskAgrr.TagId equals tags.TagId
                    join users in context.Users
                    on tasks.UploaderId equals users.UserId
                    where tagsList.Contains(tags.TagId)
                    select new TaskWithUploader()
                    {
                        task = tasks,
                        UploaderName = users.Name,
                        UploaderSurname = users.Surname,
                        UploaderEmail = users.Email,
                        tags = new List<string>()
                    }
                    ).Where(columnToSearch + ".ToLower().Contains" + "(\"" + keyword + "\")").Distinct();
                }
                else
                {
                    table_join = (
                        from tasks in context.Tasks
                        join users in context.Users
                        on tasks.UploaderId equals users.UserId
                        //where { columnToSearch + ".Contains" + "(\"" + keyword.ToLower() + "\")" }
                        select new TaskWithUploader()
                        {
                            task = tasks,
                            UploaderName = users.Name,
                            UploaderSurname = users.Surname,
                            UploaderEmail = users.Email,
                            tags = new List<string>()
                        }
                    ).Where(columnToSearch + ".ToLower().Contains" + "(\"" + keyword + "\")").Distinct();
                }
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("No such a column : ", e.Message));
                return null;
            }
            var taskList = table_join.Skip((pageNumber - 1) * numberOfTasks).Take(numberOfTasks).ToList();
            var tag_table = (
                                    from task_Tags in context.TaskTags
                                    join tags in context.Tags
                                    on task_Tags.TagId equals tags.TagId
                                    select new { tags, task_Tags }
                );
            var tagList = tag_table.ToList();
            for (var i = 0; i < taskList.Count; i++)
            {
                taskList[i].tags = new List<string>();
                taskList[i].task.TaskTags = null;
                for (var j = 0; j < tagList.Count; j++)
                {
                    if (taskList[i].task.TaskId == tagList[j].task_Tags.TaskId)
                    {
                        taskList[i].tags.Add(tagList[j].tags.TagDescription);
                    }
                }
            }
            return taskList;
        }
    }

}
