using System.Collections.Generic;
using System.Threading.Tasks;
using Magoria.Server.Models;
using MongoDB.Driver;

namespace Magoria.Server.Accessors
{
    public static class GameAccessor
    {
        private static IMongoCollection<GameDescriptor> collection = DataSource.GetCollection<GameDescriptor>("games");

        public static IEnumerable<GameDescriptor> GetAllGames() {
            return collection.FindSync(_ => true).ToEnumerable();
        }

        public static Task<GameDescriptor> SaveGame(GameDescriptor gameToSave) {
            return collection
                .ReplaceOneAsync(game => game.Id == gameToSave.Id, gameToSave, new UpdateOptions() {IsUpsert = true})
                .ContinueWith(result => result.Result.IsAcknowledged ? gameToSave : null);
        }
    }
}