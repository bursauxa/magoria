using MongoDB.Driver;

public static class MongoConnector {
    private static readonly MongoClient client = new MongoClient("mongodb://localhost:27017");
    
    public static IMongoCollection<TDocument> GetCollection<TDocument>(string collection) {
        return client.GetDatabase("magoria").GetCollection<TDocument>(collection);
    }
}