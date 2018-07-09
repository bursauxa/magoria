<template>
  <div class="game">
    <GameComponent :game-descriptor="descriptor"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';
import LobbyService from '@/services/LobbyService';
import GameComponent from '@/components/GameComponent.vue';

@Component({
  components: {
    GameComponent
  }
})
export default class Game extends Vue {
  public descriptor: GameDescriptor | null = null;

  public mounted(): void {
    LobbyService.instance.getOne(this.$route.params.gameId).then(game => this.descriptor = game);
  }
}
</script>

<style lang="less"/>
