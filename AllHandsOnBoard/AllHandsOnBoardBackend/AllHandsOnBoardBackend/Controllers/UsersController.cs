using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Json;
using Newtonsoft.Json;

namespace AllHandsOnBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/Users
        [HttpGet]
        public JsonResult Get()
        {
            var user = new List<Users>();

            using (var context = new all_hands_on_boardContext())
            {
                Log.Information("User GET Invoked");
                try
                {
                    user = context.Users.ToList<Users>();
                }
                catch (InvalidOperationException e)
                {
                    Log.Error(String.Concat("While getting all users", e.Message));
                    return new JsonResult(false);
                }
            }

            return new JsonResult(user);
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public JsonResult Get(int id)
        {
            var user = new Users();

            using (var context = new all_hands_on_boardContext())
            {
                try
                {
                    user  = context.Users.First(a => a.UserId == id);
                }
                catch(InvalidOperationException e)
                {
                    Log.Error(String.Concat("While getting single user", e.Message));
                    return new JsonResult(false);
                }
            }

            return new JsonResult(user);
        }
    }
}
