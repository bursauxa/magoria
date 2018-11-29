<template>
  <div class="tokens">
    <h1>Tokens</h1>

		<svg width=512 height=128>    
      <svg class="token" v-for="(datum, index) in data" :key="datum.id" :x="index * 128">
        <rect width=100 height=100 x=14 v-on:click="datum.changeTone()" :class="datum.tone"></rect>
        <g v-on:click="datum.rotate()" :transform="'rotate(' + datum.orientationAsDegrees + ', 64, 50)'">
          <circle r=20 cx=64 cy=50></circle>
          <polygon points="64,33 74,64 54,64" ></polygon>
        </g>
        <text x=64 y=114>{{ datum.id }}</text>
      </svg>
  	</svg>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';

@Component
export default class TokensVue extends Vue {
  public data: TokenModel[] = [
    new TokenModel('castle'),
    new TokenModel('dwarf'),
    new TokenModel('sword'),
    new TokenModel('emerald')
  ];
}
</script>

<style lang="less" src="./Tokens.vue.less">
</style>