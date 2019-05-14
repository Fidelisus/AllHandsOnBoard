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
            public IEnumerable<string> Get()
            {

                Console.WriteLine("Get request Invoked");
                return new string[] { "value1", "value2" };
            }

            // GET: api/Login/5
            [AllowAnonymous]
            [HttpGet("{id}", Name = "Get")]
            public string Get(int id)
            {
                return "value";
            }

            // POST: api/Login
            [AllowAnonymous]
            [HttpPost("authenticate")]
            public IActionResult Authenticate([FromBody] Users userParam)
            {
                var user = userService.Authenticate(userParam.UserId, userParam.Password);

                if(user == null)
                    return BadRequest(new {message = "Username or password is incorrect"});

                return Ok(user);
            }

            // PUT: api/Login/5
            [HttpPut("{id}")]
            public void Put(int id, [FromBody] string value)
            {
            }

            // DELETE: api/ApiWithActions/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }
        }
}
