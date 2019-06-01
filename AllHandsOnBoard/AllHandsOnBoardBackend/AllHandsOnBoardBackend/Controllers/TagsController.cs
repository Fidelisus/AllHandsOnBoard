using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using AllHandsOnBoardBackend.Services;
using AllHandsOnBoardBackend.Helpers;

namespace AllHandsOnBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        ITagsService tagsService;

        public TagsController(ITagsService tagsServiceParam)
        {
            tagsService = tagsServiceParam;
        }

        // POST: api/Tags
        [HttpGet]
        public JsonResult getAll()
        {   
            List<Tags> tags = tagsService.getAll();
            return new JsonResult(tags);
        }
    }
}
