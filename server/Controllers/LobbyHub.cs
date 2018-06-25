using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;

public class LobbyHub: Hub {
    public async Task SignalGameCreation(GameDescriptor descriptor)
    {
        await Clients.All.SendAsync("ReceiveGameCreation", descriptor);
    }

    public async Task RequestGameCreation(GameDescriptor descriptor)
    {
        GameDescriptor validatedDescriptor = new GameDescriptor(descriptor.Name, descriptor.NumberOfPlayers, Guid.NewGuid());
        IMongoCollection<GameDescriptor> collection = MongoConnector.GetCollection<GameDescriptor>("games");
        await Task.WhenAll(
            collection.InsertOneAsync(validatedDescriptor),
            SignalGameCreation(validatedDescriptor));
    }
}