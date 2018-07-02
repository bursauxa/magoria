using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Magoria.Server.Accessors
{
    public static class DataSource {
        private static readonly MongoClient client;

        static DataSource() {
            ConventionPack pack = new ConventionPack();
            pack.Add(new IgnoreExtraElementsConvention(true));
            ConventionRegistry.Register("IgnoreExtraElements", pack, _ => true);
            client = new MongoClient("mongodb://localhost:27017");
        }
        
        public static IMongoCollection<TDocument> GetCollection<TDocument>(string collection) {
            return client.GetDatabase("magoria").GetCollection<TDocument>(collection);
        }
    }
}