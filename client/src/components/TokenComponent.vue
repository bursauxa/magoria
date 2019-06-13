<template>
    <svg class="token" width=128 height=128 v-on:mousedown="mdown" d-raggable d-ropzone d-atapath="token">
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
import DDroppedEventData from '@/models/DDroppedEventData';
import DDroppedLogicalEventData from '../models/DDroppedLogicalEventData';
import DDroppedPhysicalEventData from '../models/DDroppedPhysicalEventData';

@Component
export default class TokenComponent extends Vue {
    @Prop() private token!: TokenModel;

    private readonly draggableAttribute = 'd-raggable';
    private readonly dropzoneAttribute = 'd-ropzone';
    private readonly datapathAttribute = 'd-atapath';

    private data: any;
    private physicalDragSource: EventTarget | undefined;
    private logicalDragSource: Element | undefined;
    private dragOffsetX = Number.NaN;
    private dragOffsetY = Number.NaN;

    private mdown(evt: MouseEvent): void {
        let draggable: Element | undefined;
        evt.composedPath().forEach((elementOnPath: EventTarget) => {
            if (!draggable && elementOnPath instanceof Element
                && elementOnPath.parentElement != null
                && elementOnPath.hasAttribute(this.draggableAttribute)) {
                draggable = elementOnPath;
            }
        });
        if (draggable) {
            if (draggable.hasAttribute(this.datapathAttribute)) {
                const datapath = draggable.getAttribute(this.datapathAttribute);
                if (datapath !== null) {
                    this.data = (this as any)[datapath];
                }
            }
            this.physicalDragSource = evt.target as EventTarget;
            this.logicalDragSource = draggable;
            this.dragOffsetX = evt.offsetX;
            this.dragOffsetY = evt.offsetY;
            document.addEventListener('mouseup', this.mup, false);
        }
    }

    private mup(evt: MouseEvent): void {
        let dropzone: Element | undefined;
        evt.composedPath().forEach((elementOnPath: EventTarget) => {
            if (!dropzone && elementOnPath instanceof Element
                && elementOnPath.parentElement != null
                && elementOnPath.hasAttribute(this.dropzoneAttribute)) {
                dropzone = elementOnPath;
            }
        });
        if (dropzone) {
            this.$emit('d-ropped', new DDroppedEventData(
                new DDroppedLogicalEventData(this.logicalDragSource as Element, dropzone, this.data),
                new DDroppedPhysicalEventData(
                    this.physicalDragSource as EventTarget, this.dragOffsetX, this.dragOffsetY,
                    evt.target as EventTarget, evt.offsetX, evt.offsetY)
            ));
        }
        document.removeEventListener('mouseup', this.mup, false);
        this.data = undefined;
        this.physicalDragSource = undefined;
        this.logicalDragSource = undefined;
        this.dragOffsetX = Number.NaN;
        this.dragOffsetY = Number.NaN;
    }
}
</script>

<style lang="less" src="./TokenComponent.vue.less">
</style>
