using AllHandsOnBoardBackend.Helpers;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllHandsOnBoardBackend.Services
{
    public interface ITasksService
    {
        bool addTask(Tasks task);
        Tasks getTask(int id);
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

        public bool addTask(Tasks task)
        {
            try
            {
                context.Tasks.Add(task);
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
    }

}
