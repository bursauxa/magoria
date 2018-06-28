using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPut]
        public GameDescriptor Put([FromBody] GameDescriptor descriptor)
        {
            GameDescriptor validatedDescriptor = new GameDescriptor(descriptor);
            return GameAccessor.SaveGame(validatedDescriptor).Result;
        }
    }
}
