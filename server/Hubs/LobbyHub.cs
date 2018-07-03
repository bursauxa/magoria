using System;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace Magoria.Server.Hubs
{
    [HubRoute("/hubs/lobby")]
    public class LobbyHub: Hub {
        public async Task InformGameCreated(GameDescriptor descriptor)
        {
            await Clients.All.SendAsync("InformGameCreated", descriptor);
        }

        public async Task RequestGameCreation(GameDescriptor descriptor)
        {
            GameDescriptor validatedDescriptor = new GameDescriptor(descriptor);
            await Task.WhenAll(
                GameAccessor.SaveGame(validatedDescriptor),
                InformGameCreated(validatedDescriptor));
        }
    }
}