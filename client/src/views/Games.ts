import { Component, Vue, Prop } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';
import LobbyService from '@/services/LobbyService';
import GameComponent from '@/components/GameComponent.vue';

// @Component
@Component({
  components: {
    GameComponent
  }
})
export default class Games extends Vue {
  private readonly lobbyService: LobbyService;

  private expanded = false;
  public descriptors: GameDescriptor[] = [];
  public newGameName = '';
  public newGameCount = 0;

  public player1: string | null = null;
  public player2: string | null = null;
  public player3: string | null = null;
  public player4: string | null = null;

  public constructor() {
    super();
    this.lobbyService = LobbyService.instance;
    // this.lobbyService.onGameCreated(game => this.onGameCreated(game));
  }

  public mounted(): void {
    this.lobbyService.get().then(games => this.descriptors = games);
  }

  public addGame(): void {
    const players: string[] = [];
    if (this.player1 !== null) {
      players.push(this.player1);
    }
    if (this.player2 !== null) {
      players.push(this.player2);
    }
    if (this.player3 !== null) {
      players.push(this.player3);
    }
    if (this.player4 !== null) {
      players.push(this.player4);
    }
    this.lobbyService
      // .put(new GameDescriptor(this.newGameName, this.newGameCount))
      .put(new GameDescriptor(this.newGameName, players))
      .then(game => this.descriptors.push(game));
    // this.lobbyService.requestGameCreation(new GameDescriptor(this.newGameName, this.newGameCount));
  }

  // private onGameCreated(descriptor: GameDescriptor): void {
  //   this.descriptors.push(descriptor);
  // }
}
