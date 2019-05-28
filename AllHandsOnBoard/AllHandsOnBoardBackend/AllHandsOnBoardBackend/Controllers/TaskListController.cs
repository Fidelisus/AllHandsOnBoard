using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Microsoft.AspNetCore.Authorization;

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
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var task = tasksService.getTask(id);
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
        //api/TaskList/1&2
        [Authorize(Roles = "student")]
        [HttpGet("{taskId}&{userId}")]
        public JsonResult applyToTask(int taskId, int userId ){
            bool result = tasksService.applyToTask(taskId,userId);
            return new JsonResult(result);
        }

        [Authorize(Roles = "teacher")]
        [HttpGet("validation/{id}")]
        public JsonResult validateTask(int id){
            Tasks result = tasksService.validateTask(id);
            return new JsonResult(result);
        }

        [Authorize(Roles = "teacher")]
        [HttpGet("taskStart/{id}")]
        public JsonResult taskStart(int id){
            bool result = tasksService.taskStart(id);
            return new JsonResult(result);
        }


        /*Json should look like 
        {
            "numberOfTasks":1,
            "listTags":[],
            "pageNumber":1,
            "columnToSearch":"ShortDescription",
            "keyword":"cake"
        }
             */
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

/*
// GET: api/TaskList
[HttpGet]
public IEnumerable<string> Get()
{
    return new string[] { "value1", "value2" };
}

// GET: api/TaskList/5
[HttpGet("{id}", Name = "Get")]
public string Get(int id)
{
    return "value";
}

// POST: api/TaskList
[HttpPost]
public void Post([FromBody] string value)
{
}

// PUT: api/TaskList/5
[HttpPut("{id}")]
public void Put(int id, [FromBody] string value)
{
}

// DELETE: api/ApiWithActions/5
[HttpDelete("{id}")]
public void Delete(int id)
{
}
*/
