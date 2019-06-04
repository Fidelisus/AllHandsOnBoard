using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection;
using Serilog;
using System.Json;
using Newtonsoft.Json;
using AllHandsOnBoardBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

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
            var rating = userService.getAvgRating(id);
            if (user != null)
            {
                Dictionary<string, object> response = new Dictionary<string, object>();
                var type = typeof(Users);
                foreach(PropertyInfo prop in type.GetProperties()){
                    response.Add(prop.Name, prop.GetValue(user));
                }
                response.Add(nameof(rating),rating);
                response["Password"] = null;
                return new JsonResult(response);
            }
            else{
                return new JsonResult(false);
            }
        }

        [Authorize(Roles ="teacher,admin")]
        [HttpGet("history")]
        public JsonResult getHistory(){
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.FindFirst(ClaimTypes.Email).Value;

            List<Tasks> history = userService.getHistory(userEmail);
            return new JsonResult(history);
        }

        [Authorize(Roles ="student")]
        [HttpGet("scoreBoard/points")]
        public JsonResult getPointScoreBoard(scoreboardRequest request){
            var result = userService.getPointsc(request.pageNumber, request.numberOfUser);
            return new JsonResult(result);

        }
    }
}
