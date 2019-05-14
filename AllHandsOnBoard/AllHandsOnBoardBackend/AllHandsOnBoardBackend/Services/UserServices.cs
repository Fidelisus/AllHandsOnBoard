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


namespace AllHandsOnBoardBackend.Services
{

    public interface IUserService
    {
        Users Authenticate(int userID, string password);
        
        
    }

    public class UserServices : IUserService
    {

        private readonly AppSettings appSettings;
        private all_hands_on_boardContext context;

        public UserServices(AppSettings appSettingsParam ){
            appSettings = appSettingsParam;
            context = new all_hands_on_boardContext();
        }

       

        public Users Authenticate(int userIDParam, string password){
            DbSet<Users> usersDB = context.Users;
            var user = context.Users.SingleOrDefault(x => x.UserId == userIDParam);
            if(user != null){
                if(user.Password == password){
                    //The user exists and the password is correct
                    //Starting the auth
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("");
                    if(appSettings.Secret != null)
                        key = Encoding.ASCII.GetBytes(appSettings.Secret);
                    else
                        key = Encoding.ASCII.GetBytes(new string("dzjdfeiofjsofijsefsefjilsefjisefslif"));
                    
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[] 
                        {
                            new Claim(ClaimTypes.Name, Convert.ToString(user.UserId))
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