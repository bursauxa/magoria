import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { noop } from 'vue-class-component/lib/util';
import { DragAbortedEventData } from './DragDropEventData';

function createMousemoveHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: Event) => {
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drag-aborted handler is not a function');
        }
        const customEvent = event as CustomEvent;
        if (customEvent) {
            const data = customEvent.detail as DragAbortedEventData;
            if (data) {
                binding.value.apply(null, [data]);
            }
        }
    };
}

const onDragAborted: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        document.addEventListener('drag-aborted', createMousemoveHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        document.removeEventListener('drag-aborted', (evt: Event) => { noop(); }, false);
    }
};

export default onDragAborted;
