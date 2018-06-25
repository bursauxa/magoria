using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            IMongoCollection<GameDescriptor> collection = MongoConnector.GetCollection<GameDescriptor>("games");
            return collection.FindSync(_ => true).ToList();
        }
    }
}
