import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import GameDescriptor from '@/models/GameDescriptor';
import Axios from 'axios';

export default class LobbyService {
  private readonly connection: HubConnection;

  public static readonly instance = new LobbyService();

  private constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/lobby')
      .build();
    this.connection.start().catch(err => { throw err.toString(); });
  }

  public get(): Promise<GameDescriptor[]> {
    return Axios({ method: 'GET', url: '/api/lobby' })
      .then(result => GameDescriptor.fromServerObjects(result.data), error => { throw error; });
  }

  public put(game: GameDescriptor): Promise<GameDescriptor> {
    return Axios({ method: 'PUT', url: '/api/lobby', data: game })
      .then(result => GameDescriptor.fromServerObject(result.data), error => { throw error; });
  }

//   public onGameCreated(handler: (game: GameDescriptor) => void, removeHandler = false): void {
//     if (removeHandler) {
//       this.connection.off('InformGameCreated', handler);
//     } else {
//       this.connection.on('InformGameCreated', handler);
//     }
//   }

//   public requestGameCreation(game: GameDescriptor): void {
//     this.connection.invoke('RequestGameCreation', game);
//   }
}
