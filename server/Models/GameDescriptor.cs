using System;
using Newtonsoft.Json;

namespace Magoria.Server.Models
    {
    public class GameDescriptor {
        public string Name {get; private set;}
        public int NumberOfPlayers {get; private set;}
        public Guid? Id {get; private set;} 

        public GameDescriptor(string name, int numberOfPlayers, Guid? id) {
            Name = name;
            NumberOfPlayers = numberOfPlayers;
            Id = id;
        }
    }
}