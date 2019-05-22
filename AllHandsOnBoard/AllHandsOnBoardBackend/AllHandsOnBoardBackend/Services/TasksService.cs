﻿using AllHandsOnBoardBackend.Helpers;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllHandsOnBoardBackend.Services
{
    public interface ITasksService
    {
        bool addTask(Tasks task,List<int> tags);
        Tasks getTask(int id);
        bool applyToTask(int taskId, int userId);
        Tasks validateTask(int  taskId);
        List<Tasks> getTasks(int numberOfTasks, List<int> tags,int pageNumber);
    }

    public class GetTasksRequest{
        public int numberOfTasks {get; set;}
        public List<int> listTags  {get; set;}
        public int pageNumber  {get; set;}

        public GetTasksRequest(){;}
    }

    public class addTaskRequest{
        public Tasks task  {get; set;}
        public List<int> tags  {get; set;}

        public addTaskRequest(){;}
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
                foreach(var tag in tags){
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

        public Tasks getTask(int id)
        {
            var task = new Tasks();
            task = context.Tasks.Find(id);
            return task;
        }

        public bool applyToTask(int taskId, int  userId){
            var task = context.Tasks.Find(taskId);
            var taskAggregation = new TaskAggregation();
            taskAggregation.Task = task;
            taskAggregation.User = context.Users.Find(userId);  
            try{                
                context.TaskAggregation.Add(taskAggregation);
                task.NoOfStudents++;
                context.SaveChanges();
            }catch(Exception e){
                Log.Error(String.Concat("Failed to add task aggregation on db : ", e.Message));
                return false;
            }
            return true;
        }

        public Tasks validateTask(int taskId){            
            Tasks task = context.Tasks.Find(taskId);
            if(task != null){
                try{
                    task.Stateoftask = "DONE"; 
                    task.SigningFinishDate = DateTime.Now;
                    context.SaveChanges();
                }catch(Exception e){
                    Log.Error(String.Concat("Failed to validate a task on db : ", e.Message));
                    return task;
                }
                return task;
            }
            return task;
        }

        public List<Tasks> getTasks(int numberOfTasks, List<int> tagsList, int pageNumber){
            List<Tasks> taskList = new List<Tasks>();
            if(tagsList.Count > 0){
                var table_join = (
                    from task_Tags in context.TaskTags
                    join task in context.Tasks 
                    on task_Tags.TaskId equals task.TaskId
                    join tags in context.Tags
                    on  task_Tags.TagId equals tags.TagId
                    where  tagsList.Contains(tags.TagId)
                    select task
                    ).Distinct();

                taskList = table_join.Skip((pageNumber-1)*numberOfTasks).Take(numberOfTasks).ToList();
            }

            else
            {
                taskList = context.Tasks.Skip((pageNumber-1)*numberOfTasks).Take(numberOfTasks).ToList();;
            }
            //taskList.AddAll(table_join);
            return taskList;
            
            //return new List<Tasks>();
        }
    }

}