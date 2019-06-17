import { Component, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import TokenComponent from '@/components/TokenComponent.vue';
import DragDropEventData from '@/lib/DragDropEventData';

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

  private onTokenDropCompleted(evt: DragDropEventData): void {
    const sourceIndex = this.data.findIndex(token => token === evt.source.data);
    const targetIndex = this.data.findIndex(token => token === evt.target.data);
    Vue.set(this.data, sourceIndex, evt.target.data);
    Vue.set(this.data, targetIndex, evt.source.data);
    this.data.forEach(datum => datum.thick = false);
  }

  private onTokenDragInProgress(evt: DragDropEventData): void {
    this.data.forEach(datum => datum.thick = (datum === evt.target.data));
  }

  private onDroppedInTrash(evt: DragDropEventData): void {
    const sourceIndex = this.data.findIndex(token => token === evt.source.data);
    this.data.splice(sourceIndex, 1);
  }

  private onParentDrag(evt: DragDropEventData): void {
    this.data.forEach(datum => datum.thick = false);
  }
}
