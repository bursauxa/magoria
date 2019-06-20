import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { noop } from 'vue-class-component/lib/util';
import GlobalDragState from './DragState';
import VueHelper from './VueHelper';

function createMousemoveHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drag handler is not a function');
        }
        if (GlobalDragState.progress(event.target!, element, vue, event.offsetX, event.offsetY)) {
            const dragDropEventData = GlobalDragState.buildEventData();
            binding.value.apply(null, [dragDropEventData]);
            if ((dragDropEventData as any).handled) {
                event.stopPropagation();
            }
        }
    };
}

const onDrag: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mousemove', createMousemoveHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousemove', (evt: MouseEvent) => { noop(); }, false);
    }
};

export default onDrag;
