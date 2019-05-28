using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using AllHandsOnBoardBackend.Helpers;
using Serilog;

namespace AllHandsOnBoardBackend.Services
{

    public interface IUserService
    {
        Users Authenticate(string email, string password);
        Users getUser(int id);
        List<Users> getUsers();
        List<Tasks> getHistory(string email);
        List<Users> getPointsc(int pageNumber, int numberOfUser);
    }

    public class scoreboardRequest{
        public int pageNumber {get;set;}
        public int numberOfUser {get;set;}
    }

    public class UserServices : IUserService
    {

        private readonly AppSettings appSettings;
        private all_hands_on_boardContext context;

        public UserServices(AppSettings appSettingsParam)
        {
            appSettings = appSettingsParam;
            context = new all_hands_on_boardContext();
        }



        public Users getUser(int id)

        {
            var user = new Users();
                user = context.Users.Find(id);
            return user;
        }

        public List<Users> getUsers()
        {
            var user = new List<Users>();

            try
            {
                user = context.Users.ToList<Users>();
            }
            catch (ArgumentNullException e)
            {
                Log.Error(String.Concat("Error, while getting Users: ", e.Message));
                return null;
            }
            return user;
        }

        public  List<Tasks> getHistory(string email){
            
            var user = context.Users.SingleOrDefault(myEmail => myEmail.Email == email);
            var id = user.UserId;
            List<Tasks> history = new List<Tasks>();
             if(user != null){
               var tableJoin = ( from task in context.Tasks
                            where task.UploaderId.Equals(id)
                            orderby task.TaskId ascending
                            select task
                        ).Distinct();
                history = tableJoin.ToList();
            }
            return history;
        }

        public List<Users> getPointsc(int pageNumber, int numberOfUser){
            var request = ( from user in context.Users
                            orderby user.Points descending
                            select user
                           ).Distinct();
            List<Users> list = request.Skip((pageNumber-1)*numberOfUser).Take(numberOfUser).ToList();
            return list;
        }


        public Users Authenticate(string userIDParam, string password)
        {
            DbSet<Users> usersDB = context.Users;
            var user = context.Users.SingleOrDefault(x => x.Email == userIDParam);
            if (user != null)
            {
                if (user.Password == password)
                {
                    //The user exists and the password is correct
                    //Starting the auth
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("");
                    if (appSettings.Secret != null)
                        key = Encoding.ASCII.GetBytes(appSettings.Secret);
                    else
                        key = Encoding.ASCII.GetBytes(new string("dzjdfeiofjsofijsefsefjilsefjisefslif"));

                    var role = user.Occupation;
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, user.UserId.ToString()),
                            new Claim(ClaimTypes.Email, user.Email),
                            new Claim(ClaimTypes.Role, role)
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    user.Token = tokenHandler.WriteToken(token);

                    user.Password = null;

                    return user;
                }

            }
            return null;
        }

    }
}