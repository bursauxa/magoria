import { Component, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import GhostToken from '@/models/GhostToken';
import TokenComponent from '@/components/TokenComponent.vue';
import { DragCompletedEventData, DragInProgressEventData } from 'dragop';

const highlightPerformed = 'highlight performed';

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
    new TokenModel('emerald'),
    new TokenModel('tomato'),
    new TokenModel('apple'),
    new TokenModel('banana'),
    new TokenModel('peanut')
  ];

  public ghostToken: GhostToken = new GhostToken();

  private onTokenDropCompleted(evt: DragCompletedEventData, token: TokenModel): void {
    const sourceIndex = this.data.findIndex(datum => datum === evt.source.data);
    const targetIndex = this.data.findIndex(datum => datum === token);
    this.$set(this.data, sourceIndex, token);
    this.$set(this.data, targetIndex, evt.source.data);
    this.data.forEach(datum => datum.highlighted = false);
    this.ghostToken.hide();
  }

  private highlightToken(evt: DragInProgressEventData, token: TokenModel): void {
    this.data.forEach(datum => datum.highlighted = (datum === token));
    evt.metadata = highlightPerformed;
  }

  private drawGhost(evt: DragInProgressEventData): void {
    if (evt.metadata !== highlightPerformed) {
      this.data.forEach(datum => datum.highlighted = false);
    }
    if (!this.ghostToken.isVisible) {
      this.ghostToken.show(evt.source.data);
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
