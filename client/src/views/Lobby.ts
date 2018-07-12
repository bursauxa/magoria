import { Component, Vue } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';
import LobbyService from '@/services/LobbyService';
import GameComponent from '@/components/GameComponent.vue';

@Component({
  components: {
    GameComponent
  }
})
export default class LobbyVue extends Vue {
  private readonly lobbyService: LobbyService;
  private onGameCreatedCallbackId?: string;

  public expanded = false;
  public descriptors: GameDescriptor[] = [];
  public newGameName = '';

  public player1: string | null = null;
  public player2: string | null = null;
  public player3: string | null = null;
  public player4: string | null = null;

  public constructor() {
    super();
    this.lobbyService = LobbyService.instance;
  }

  public mounted(): void {
    this.lobbyService.getAll().then(games => this.descriptors = games);
    this.onGameCreatedCallbackId = this.lobbyService.onGameCreated(game => this.onGameCreated(game));
    // this.lobbyService.offGameCreated(id); // uncomment this to test unsubscription
  }

  public destroyed(): void {
    this.lobbyService.offGameCreated(this.onGameCreatedCallbackId as string);
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
    this.lobbyService.requestGameCreation(new GameDescriptor(this.newGameName, players));
  }

  private onGameCreated(descriptor: GameDescriptor): void {
    this.descriptors.push(descriptor);
  }
}
