using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Json;
using Newtonsoft.Json;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Authorization;

namespace AllHandsOnBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUserService userService;

        public UsersController(IUserService userServiceParam)
        {
            userService = userServiceParam;
        }
        
        // GET: api/Users
        [HttpGet]
        public JsonResult Get()
        {
            var users = userService.getUsers();

            if (users != null)
            {
                return new JsonResult(users);
            }
            else
            {
                return new JsonResult(false);
            }
        }
        
        // GET: api/Users/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var user = userService.getUser(id);
            if (user != null)
            {
                return new JsonResult(user);
            }
            else{
                return new JsonResult(false);
            }
        }
    }
}
