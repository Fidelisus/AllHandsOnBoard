using AllHandsOnBoardBackend.Helpers;
using AllHandsOnBoardBackend.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllHandsOnBoardBackend.Services
{
    public interface ITasksService
    {
        bool addTask(Tasks task, List<int> tags);
        TaskWithUploader getTask(int id);
        bool applyToTask(int taskId, int userId);
        Tasks validateTask(int taskId);
        List<TaskWithUploader> getTasks(int numberOfTasks, List<int> tags, int pageNumber);
    }

    public class GetTasksRequest
    {
        public int numberOfTasks { get; set; }
        public List<int> listTags { get; set; }
        public int pageNumber { get; set; }

        public GetTasksRequest() {; }
    }

    public class addTaskRequest
    {
        public Tasks task { get; set; }
        public List<int> tags { get; set; }

        public addTaskRequest() {; }
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

        public Tasks validateTask(int taskId)
        {
            Tasks task = context.Tasks.Find(taskId);
            if (task != null)
            {
                try
                {
                    task.Stateoftask = "DONE";
                    task.SigningFinishDate = DateTime.Now;
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

        public List<TaskWithUploader> getTasks(int numberOfTasks, List<int> tagsList, int pageNumber)
        {
            IQueryable<TaskWithUploader> table_join;

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
                    //where tagsList.Contains(tags.TagId) || tags.TagId is null
                    where  tagsList.Contains(tags.TagId)
                    select new TaskWithUploader()
                    {
                        task = tasks,
                        UploaderName = users.Name,
                        UploaderSurname = users.Surname,
                        UploaderEmail = users.Email,
                        tags = new List<string>()
                    }
                ).Distinct();
            }
            else
            {
                table_join = (
                    from tasks in context.Tasks
                    join users in context.Users
                    on tasks.UploaderId equals users.UserId
                    select new TaskWithUploader()
                    {
                        task = tasks,
                        UploaderName = users.Name,
                        UploaderSurname = users.Surname,
                        UploaderEmail = users.Email,
                        tags = new List<string>()
                    }
                ).Distinct();
            }

            var taskList = table_join.Skip((pageNumber - 1) * numberOfTasks).Take(numberOfTasks).ToList();
            //return taskList;
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
