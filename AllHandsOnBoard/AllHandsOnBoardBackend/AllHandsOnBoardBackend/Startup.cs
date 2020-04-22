using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Cors;

using AllHandsOnBoardBackend.Models;
using AllHandsOnBoardBackend.Helpers;
using AllHandsOnBoardBackend.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Logging;

namespace AllHandsOnBoardBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            
            services.AddCors(options =>
            {
               options.AddPolicy("AllowAll",
                    builder =>
                    {

                         builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                        //builder.WithOrigins("http://localhost:4200");
                    });
            });
            // connection to database
            services.AddEntityFrameworkNpgsql().AddDbContext<all_hands_on_boardContext>().BuildServiceProvider();

            // configure strongly typed settings objects
            var appSettingsConfig = new AppSettings();
            Configuration.Bind("AppSettings",appSettingsConfig);
            

            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appSettingsConfig.Secret);
            
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddSingleton(appSettingsConfig);
            services.AddScoped<IUserService, UserServices>();
            services.AddScoped<ITasksService, TasksService>();
            services.AddScoped<ITagsService, TagsService>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            
            //app.UseCors("AllowAll");
            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            //Adding auth
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            /*
            var user = new Users()
            {
                Name = "Lukasz",
                Surname = "Sobocinski",
                Occupation = "admin",
                Email = "whatever@p.lodz.pl",
                Password = "admin"
            };

            using (var context = new all_hands_on_boardContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }
            */
        }
    }
}
