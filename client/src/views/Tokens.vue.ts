import { Component, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import GhostToken from '@/models/GhostToken';
import TokenComponent from '@/components/TokenComponent.vue';
import { DragCompletedEventData, DragInProgressEventData } from '@/lib/DragDropEventData';

@Component({
  components: {
    TokenComponent
  }
})
export default class TokensVue extends Vue {
  public data: TokenModel[] = [
    new TokenModel('castle'),
    new TokenModel('dwarf'),
    new TokenModel('sword'),
    new TokenModel('emerald')
  ];

  public ghostToken: GhostToken = new GhostToken();

  private onTokenDropCompleted(evt: DragCompletedEventData, token: TokenModel): void {
    const sourceIndex = this.data.findIndex(datum => datum === evt.source.data);
    const targetIndex = this.data.findIndex(datum => datum === token);
    Vue.set(this.data, sourceIndex, token);
    Vue.set(this.data, targetIndex, evt.source.data);
    this.data.forEach(datum => datum.highlighted = false);
    this.ghostToken.hide();
  }

  private onTokenDragInProgress(evt: DragInProgressEventData, token: TokenModel): void {
    this.data.forEach(datum => datum.highlighted = (datum === token));
    if (!this.ghostToken.isVisible) {
      this.ghostToken.replicate(evt.source.data);
    }
    this.ghostToken.move(evt.target.x - evt.source.x, evt.target.y - evt.source.y);
  }

  private onDroppedInTrash(evt: DragCompletedEventData): void {
    const sourceIndex = this.data.findIndex(token => token === evt.source.data);
    this.data.splice(sourceIndex, 1);
    this.ghostToken.hide();
  }

  private onDragAborted(): void {
    this.data.forEach(datum => datum.highlighted = false);
    this.ghostToken.hide();
  }
}
