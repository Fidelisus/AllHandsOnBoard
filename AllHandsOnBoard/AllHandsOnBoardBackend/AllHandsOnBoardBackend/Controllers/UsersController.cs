using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            double rating;
            if (users != null)
            {
                Dictionary<string, object> listUsersWithRating = new Dictionary<string, object>();
                var type = typeof(Users);
                List<Object> response = new List<Object>();
                foreach(Users u in users){
                    foreach(PropertyInfo prop in type.GetProperties()){
                        listUsersWithRating.Add(prop.Name, prop.GetValue(u));
                    }
                    rating = userService.getAvgRating(u.UserId);
                    listUsersWithRating.Add(nameof(rating),rating);
                    response.Add(listUsersWithRating);
                    listUsersWithRating = new Dictionary<string, object>();
                }
                return new JsonResult(response);
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
                return new JsonResult(response);
            }
            else{
                return new JsonResult(false);
            }
        }

        [Authorize(Roles="student,admin")]
        [HttpGet("applied")]
        public JsonResult getTaskApplied(){
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity.FindFirst(ClaimTypes.Name).Value;


            var list = userService.getTaskApplied(Convert.ToInt32(userId));
            return new JsonResult(list);

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
