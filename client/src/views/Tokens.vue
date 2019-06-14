<template>
  <div class="tokens">
    <h1>Tokens</h1>

		<svg width=512 height=128>    
      <TokenComponent v-for="(datum, index) in data" :key="datum.id" :x="index * 128" :token="datum" v-on:drag-drop-completed="onDragDropCompleted"/>
  	</svg>
	</div>
</template>

<script lang="ts">
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

  private onDragDropCompleted(evt: DragDropEventData): void {
      console.log('dropped ' + evt.source.data.id + ' in ' + evt.target.data.id);
  }
}
</script>

<style lang="css" scoped>
.tokens {
  user-select: none;
}
</style>