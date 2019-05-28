using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

namespace AllHandsOnBoardBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskAdderController : ControllerBase
    {
        ITasksService tasksService;

        public TaskAdderController(ITasksService userServiceParam)
        {
            tasksService = userServiceParam;
        }

        // POST: api/TaskAdder

        /*
        JSON : 
        {
            "task": {
                        blblblb
                        for timestamp on postman use : "blbal":"{{$timestamp}}"
                    },
            "tags":[1,2,3...]
        } */
        [Authorize(Roles = "teacher")]
        [HttpPost]
        public JsonResult Post([FromBody] addTaskRequest request)
        {
            //We need to get two things from this, a task and an array of tags to associate the task 
            if (tasksService.addTask(request.task,request.tags))
                return new JsonResult(request.task);
            else
                return new JsonResult(false);
        }
    }
}
