﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Hubs;
using Magoria.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Magoria.Server.Controllers
{
    [Route("api/[controller]")]
    public class LobbyController : Controller
    {
        private readonly IHubContext<LobbyHub> lobbyHub;

        public LobbyController(IHubContext<LobbyHub> lobbyHub) {
            this.lobbyHub = lobbyHub;
        }

        [HttpGet]
        public IEnumerable<GameDescriptor> GetAllGames()
        {
            return GameAccessor.GetAllGames();
        }

        [HttpGet("{id}")]
        public GameDescriptor GetOneGame(Guid id)
        {
            return GameAccessor.GetOneGame(id);
        }

        [HttpPut]
        public GameDescriptor PutOneGame([FromBody] GameDescriptor descriptor)
        {
            GameDescriptor validatedDescriptor = new GameDescriptor(descriptor);
            lobbyHub.Clients.All.SendAsync("InformGameCreated", validatedDescriptor);
            return GameAccessor.SaveGame(validatedDescriptor).Result;
        }
    }
}
