<template>
    <svg class="token" :class="token.ghost ? 'ghost' : ''" width=128 height=128 v-draggable="token" v-on-drop="onDropped" v-on-drag="onDragged">
        <rect width=100 height=100 x=14 y=4 v-on:click="token.changeTone()" :class="[token.tone, token.thick ? 'thick' : '']"></rect>
        <g v-on:click="token.rotate()" :transform="'rotate(' + token.orientationAsDegrees + ', 64, 54)'">
            <circle r=20 cx=64 cy=54></circle>
            <polygon points="64,37 74,68 54,68" ></polygon>
        </g>
        <text x=64 y=114>{{ token.id }}</text>
        <span>toto</span>
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenModel from '@/models/TokenModel';
import GhostToken from '@/models/GhostToken';
import { DragCompletedEventData, DragInProgressEventData } from '@/lib/DragDropEventData';

@Component
export default class TokenComponent extends Vue {
    @Prop() private token!: TokenModel;

    private onDropped(evt: DragCompletedEventData): void {
        if (!(this.token instanceof GhostToken)) {
            evt.target.data = this.token;
            this.$emit('token-drop-completed', evt);
        }
    }

    private onDragged(evt: DragInProgressEventData): void {
        if (!(this.token instanceof GhostToken)) {
            evt.target.data = this.token;
            this.$emit('token-drag-in-progress', evt);
            evt.handled = true;
        }
    }
}
</script>

<style lang="less" src="./TokenComponent.vue.less">
</style>
