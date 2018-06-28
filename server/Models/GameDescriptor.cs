using System;

namespace Magoria.Server.Models
{
    public class GameDescriptor {
        public string Name {get; set;}
        public int NumberOfPlayers {get; set;}
        public Guid? Id {get; set;}

        public GameDescriptor() {}

        public GameDescriptor(GameDescriptor original) {
            Name = original.Name;
            NumberOfPlayers = original.NumberOfPlayers;
            Id = Guid.NewGuid();
        }
    }
}