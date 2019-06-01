using AllHandsOnBoardBackend.Helpers;
using AllHandsOnBoardBackend.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic;


namespace AllHandsOnBoardBackend.Services
{
    public interface ITagsService
    {
        List<Tags> getAll();
    }

    public class TagsService : ITagsService
    {
        private readonly AppSettings appSettings;
        private all_hands_on_boardContext context;


        public TagsService(AppSettings appSettingsParam)
        {
            appSettings = appSettingsParam;
            context = new all_hands_on_boardContext();
        }

        public List<Tags> getAll(){
            return context.Tags.ToList();
        }
    }
}
