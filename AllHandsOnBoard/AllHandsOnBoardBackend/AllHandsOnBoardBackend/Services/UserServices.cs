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

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, user.Email)
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