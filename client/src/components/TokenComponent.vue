<template>
    <svg class="token" width=128 height=128 v-draggable="token" v-droppable="token">
        <rect width=100 height=100 x=14 v-on:click="token.changeTone()" :class="token.tone"></rect>
        <g v-on:click="token.rotate()" :transform="'rotate(' + token.orientationAsDegrees + ', 64, 50)'">
            <circle r=20 cx=64 cy=50></circle>
            <polygon points="64,33 74,64 54,64" ></polygon>
        </g>
        <text x=64 y=114>{{ token.id }}</text>
        <span>toto</span>
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';

@Component
export default class TokenComponent extends Vue {
    @Prop() private token!: TokenModel;
}
</script>

<style lang="less" src="./TokenComponent.vue.less">
</style>
