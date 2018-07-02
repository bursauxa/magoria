import { Component, Vue, Prop } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';
import LobbyService from '@/services/LobbyService';

@Component
export default class Games extends Vue {
  private readonly lobbyService: LobbyService;

  public descriptors: GameDescriptor[] = [];
  public newGameName: string = '';
  public newGameCount: number = 0;

  public constructor() {
    super();
    this.lobbyService = LobbyService.instance;
    this.lobbyService.onGameCreated(game => this.onGameCreated(game));
  }

  public mounted(): void {
    this.lobbyService.get().then(games => this.descriptors = games);
  }

  private onGameCreated(descriptor: GameDescriptor): void {
    this.descriptors.push(descriptor);
  }

  public addGame(): void {
    this.lobbyService
      .put(new GameDescriptor(this.newGameName, this.newGameCount))
      .then(game => this.descriptors.push(game));
    // this.lobbyService.requestGameCreation(new GameDescriptor(this.newGameName, this.newGameCount));
  }
}
