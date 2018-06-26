using System;
using System.Threading.Tasks;
using Magoria.Server.Accessors;
using Magoria.Server.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;

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
            GameDescriptor validatedDescriptor = new GameDescriptor(descriptor.Name, descriptor.NumberOfPlayers, Guid.NewGuid());
            await Task.WhenAll(
                GameAccessor.SaveGame(validatedDescriptor),
                SignalGameCreation(validatedDescriptor));
        }
    }
}