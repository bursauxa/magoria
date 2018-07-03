using System;
using System.Collections.Generic;

namespace Magoria.Server.Models
{
    public class GameDescriptor {
        public string Name {get; set;}
        public int NumberOfPlayers {get; set;}
        public Guid? Id {get; set;}
        // public List<string> Players {get; set;}

        public GameDescriptor() {}

        public GameDescriptor(GameDescriptor original) {
            Name = original.Name;
            NumberOfPlayers = original.NumberOfPlayers;
            // Players = original.Players;
            Id = Guid.NewGuid();
        }
    }
}