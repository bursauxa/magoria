import Vue from 'vue';

export default class DragDropData {
    constructor(
        public eventTarget: EventTarget,
        public directiveHolder: HTMLElement,
        public associatedVueComponent: Vue | null,
        public offsetX: number,
        public offsetY: number,
        public data?: any) {}
}
