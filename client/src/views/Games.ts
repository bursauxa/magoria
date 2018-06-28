import { Component, Vue, Prop } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import Axios from 'axios';

@Component
export default class Games extends Vue {
  private readonly connection: HubConnection;

  public descriptors: GameDescriptor[] = [];
  public newGameName: string = '';

  public constructor() {
    super();
    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/lobby')
      .build();
    this.connection.on('ReceiveGameCreation', descriptor => this.receiveGameCreation(descriptor));
    this.connection.start().catch(err => { throw err.toString(); });
  }

  public mounted(): void {
    Axios({ method: 'GET', url: '/api/lobby' })
      .then(result => this.descriptors = result.data, error => { throw error; });
  }

  private receiveGameCreation(descriptor: GameDescriptor): void {
    this.descriptors.push(descriptor);
  }

  public addGame(): void {
    // this.connection.invoke('RequestGameCreation', new GameDescriptor(this.newGameName, Math.ceil(4 * Math.random())));
    Axios({
        method: 'PUT',
        url: '/api/lobby',
        data: new GameDescriptor(this.newGameName, Math.ceil(4 * Math.random())) })
      .then(result => this.descriptors.push(result.data), error => { throw error; });
  }
}
