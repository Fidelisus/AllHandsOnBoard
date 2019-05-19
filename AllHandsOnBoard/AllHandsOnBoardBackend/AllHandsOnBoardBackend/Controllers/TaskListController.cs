using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AllHandsOnBoardBackend.Controllers
{
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
