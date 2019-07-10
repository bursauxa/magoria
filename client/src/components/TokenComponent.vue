<template>
    <svg class="token" width=128 height=128>
        <rect width=128 height=128 class="boundary"/>
        <rect width=100 height=100 x=14 y=4 v-on:click="token.changeTone()" :class="[token.tone, token.highlighted ? 'highlighted' : '']"></rect>
        <g v-on:click="token.rotate()" :transform="'rotate(' + token.orientationAsDegrees + ', 64, 54)'">
            <circle r=20 cx=64 cy=54></circle>
            <polygon points="64,37 74,68 54,68" ></polygon>
        </g>
        <text x=64 y=114>{{ token.id }}</text>
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import GhostToken from '@/models/GhostToken';

@Component
export default class TokenComponent extends Vue {
    @Prop() private token!: TokenModel;
}
</script>

<style lang="less" src="./TokenComponent.vue.less">
</style>
