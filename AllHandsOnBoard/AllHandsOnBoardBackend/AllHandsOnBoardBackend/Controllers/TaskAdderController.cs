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
    public class TaskAdderController : ControllerBase
    {
        ITasksService tasksService;

        public TaskAdderController(ITasksService userServiceParam)
        {
            tasksService = userServiceParam;
        }

        // POST: api/TaskAdder
        [HttpPost]
        public JsonResult Post([FromBody] Tasks task)
        {
            if (tasksService.addTask(task))
                return new JsonResult(task);
            else
                return new JsonResult(false);
        }
    }
}
