using System;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace Magoria.Server.Hubs
{
    [HubRoute("/hubs/lobby")]
    public class LobbyHub: Hub {
        public async Task SignalGameCreation(GameDescriptor descriptor)
        {
            await Clients.All.SendAsync("ReceiveGameCreation", descriptor);
        }

        public async Task RequestGameCreation(GameDescriptor descriptor)
        {
            GameDescriptor validatedDescriptor = new GameDescriptor(descriptor);
            await Task.WhenAll(
                GameAccessor.SaveGame(validatedDescriptor),
                SignalGameCreation(validatedDescriptor));
        }
    }
}