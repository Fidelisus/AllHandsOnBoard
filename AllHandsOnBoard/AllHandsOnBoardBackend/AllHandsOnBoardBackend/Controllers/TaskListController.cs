﻿using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Threading.Tasks;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;


namespace AllHandsOnBoardBackend.Controllers
{

  
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskListController : ControllerBase
    {
        ITasksService tasksService;

        public TaskListController(ITasksService tasksServiceParam)
        {
            tasksService = tasksServiceParam;
        }

        // GET: api/TaskList/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var task = tasksService.getTaskWithApplied(id);
            
            //List<Users> applied = tasksService.getApplied(id);
            if (task != null)
            {
                return new JsonResult(task);
            }
            else
            {
                return new JsonResult(false);
            }
        }

        //Would have to change the userId here so that people cant apply with other account 
        //api/TaskList/
        [Authorize(Roles = "student")]
        [HttpPost("apply/")]
        public JsonResult applyToTask(applyTaskRequest request ){

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = Convert.ToInt32(identity.FindFirst(ClaimTypes.Name).Value);

            bool result = tasksService.applyToTask(request.taskId,userId);
            return new JsonResult(result);
        }

        [Authorize(Roles = "teacher,admin")]
        [HttpPost("validation/")]
        public JsonResult validateTask(validationRequest request){
            Tasks result = tasksService.validateTask(request.taskId, request.studentId,request.rating);
            if(result != null){
                return new JsonResult(result);
            }
            return new JsonResult(false);
        }

        [Authorize(Roles = "teacher,admin")]
        [HttpPost("selection/")]
        public JsonResult studentSelection(studentSelectRequest request){
            Tasks result = tasksService.studentSelection(request.taskId, request.studentId);
            if(result != null){
                return new JsonResult(result);
            }
            return new JsonResult(false);
        }

        [Authorize(Roles = "teacher,admin")]
        [HttpGet("taskStart/{id}")]
        public JsonResult taskStart(int id){
            bool result = tasksService.taskStart(id);
            return new JsonResult(result);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult GetXTasks([FromBody] GetTasksRequest request){
            try
            {
                var listOfTasks = tasksService.getTasks(request.numberOfTasks, request.listTags, request.pageNumber, request.columnToSearch, request.keyword);
                if (listOfTasks != null)
                {
                    return new JsonResult(listOfTasks);
                }
                else
                {
                    return new JsonResult(false);
                }
            }
            catch (Exception e)
            {
                Log.Error(String.Concat("Failed to get tasks : ", e.Message));
                return new JsonResult(false);
            }

        }


    }
}

