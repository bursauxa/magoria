using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Magoria.Server.Controllers
{
    [Route("api/[controller]")]
    public class LobbyController : Controller
    {
        [HttpGet]
        public IEnumerable<GameDescriptor> Get()
        {
            return GameAccessor.GetAllGames();
        }
    }
}
