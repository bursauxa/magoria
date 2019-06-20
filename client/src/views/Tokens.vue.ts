import { Component, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import GhostToken from '@/models/GhostToken';
import TokenComponent from '@/components/TokenComponent.vue';
import { DragCompletedEventData, DragAbortedEventData, DragInProgressEventData } from '@/lib/DragDropEventData';

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

  private onTokenDropCompleted(evt: DragCompletedEventData): void {
    const sourceIndex = this.data.findIndex(token => token === evt.source.data);
    const targetIndex = this.data.findIndex(token => token === evt.target.data);
    Vue.set(this.data, sourceIndex, evt.target.data);
    Vue.set(this.data, targetIndex, evt.source.data);
    this.data.forEach(datum => datum.thick = false);
    this.ghostToken.hide();
  }

  private onTokenDragInProgress(evt: DragInProgressEventData): void {
    this.data.forEach(datum => datum.thick = (datum === evt.target.data));
    if (!this.ghostToken.isVisible) {
      this.ghostToken.replicate(evt.source.data);
    }
    let x = evt.target.offsetX - evt.source.offsetX;
    let y = evt.target.offsetY - evt.source.offsetY;
    if (evt.source.directiveHolder instanceof SVGSVGElement) {
      x += evt.source.directiveHolder.x.baseVal.value;
      y += evt.source.directiveHolder.y.baseVal.value;
    }
    this.ghostToken.move(x, y);
  }

  private onDroppedInTrash(evt: DragCompletedEventData): void {
    const sourceIndex = this.data.findIndex(token => token === evt.source.data);
    this.data.splice(sourceIndex, 1);
    this.ghostToken.hide();
  }

  private onDragAborted(evt: DragAbortedEventData): void {
    this.data.forEach(datum => datum.thick = false);
    this.ghostToken.hide();
  }
}
