import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import GameDescriptor from '@/models/GameDescriptor';
import Axios from 'axios';

export default class LobbyService {
  private readonly connection: HubConnection;
  private handlers: {[id: string]: (game: GameDescriptor) => void} = {};

  public static readonly instance = new LobbyService();

  private constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/lobby')
      .build();
    this.connection.start().catch(err => { throw err.toString(); });
  }

  public async getAll(): Promise<GameDescriptor[]> {
    return Axios({ method: 'GET', url: '/api/lobby' })
      .then(result => GameDescriptor.fromServerObjects(result.data), error => { throw error; });
  }

  public async getOne(id: string): Promise<GameDescriptor> {
    return Axios({ method: 'GET', url: '/api/lobby/' + id })
      .then(result => GameDescriptor.fromServerObject(result.data), error => { throw error; });
  }

  public async put(game: GameDescriptor): Promise<GameDescriptor> {
    return Axios({ method: 'PUT', url: '/api/lobby', data: game })
      .then(result => GameDescriptor.fromServerObject(result.data), error => { throw error; });
  }

  public onGameCreated(handler: (game: GameDescriptor) => void): string {
    const fixedHandler = (data: any) => handler(GameDescriptor.fromServerObject(data));
    const id = Math.random().toString(36).substr(2, 8);
    this.handlers[id] = fixedHandler;
    this.connection.on('InformGameCreated', fixedHandler);
    return id;
  }

  public offGameCreated(id: string): void {
    this.connection.off('InformGameCreated', this.handlers[id]);
    delete this.handlers[id];
  }

  public requestGameCreation(game: GameDescriptor): void {
    this.connection.invoke('RequestGameCreation', game);
  }
}
