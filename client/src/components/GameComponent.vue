<template>
  <div class="gcomp">
    <div v-if="gameDescriptor">
      <router-link :to="'/game/' + gameDescriptor.id">&#127968;</router-link>
      <span>
        {{ gameDescriptor.name }} - {{ gameDescriptor.numberOfPlayers }} joueur(s)
      </span>
      <button v-on:click="expanded = true" v-if="!expanded">&#x2192;</button>
      <button v-on:click="expanded = false" v-if="expanded">&#x2190;</button>
      <div class="expander-box" v-show="expanded">
        <span v-for="player in gameDescriptor.players" :key="player">{{ player }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameDescriptor from '@/models/GameDescriptor';

@Component
export default class GameComponent extends Vue {
  @Prop() private gameDescriptor!: GameDescriptor;
  private expanded = false;
}
</script>

<style lang="less">
.gcomp {
  margin: 5px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .expander-box {
    display: inline;
    span {
      margin-left: 8px;
    }
  }
}
</style>
