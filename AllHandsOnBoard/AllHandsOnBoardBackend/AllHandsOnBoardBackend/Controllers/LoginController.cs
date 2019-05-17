using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using AllHandsOnBoardBackend.Services;
using AllHandsOnBoardBackend.Helpers;

namespace AllHandsOnBoardBackend.Controllers
{
    [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class LoginController : ControllerBase
        {
            private IUserService userService;

            public LoginController(IUserService userServiceParam){

                userService = userServiceParam;
            }
        
            // GET: api/Login
            [EnableCors("AllowAll")]
            [HttpGet]
            public JsonResult Get()
            {
            return new JsonResult("Get request Invoked");
            }

            // POST: api/Login
            [AllowAnonymous]
            //[HttpPost("/authenticate")]
            [HttpPost]
            public IActionResult Authenticate([FromBody] Users userParam)
            {
                var user = userService.Authenticate(userParam.Email, userParam.Password);
                Console.WriteLine("Authenticate request Invoked");
                if(user == null)
                    return BadRequest(new {message = "Username or password is incorrect"});

                return Ok(user);
            }
           
        }
}