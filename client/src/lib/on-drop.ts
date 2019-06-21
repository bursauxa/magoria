import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { noop } from 'vue-class-component/lib/util';
import GlobalDragState from './DragState';
import VueHelper from './VueHelper';

function createMouseupHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drop handler is not a function');
        }
        const bounds = element.getBoundingClientRect();
        if (GlobalDragState.complete(event.target!, element, vue, event.x - bounds.left, event.y - bounds.top)) {
            const dragDropEventData = GlobalDragState.buildEventData();
            binding.value.apply(null, [dragDropEventData]);
            if ((dragDropEventData as any).handled) {
                event.stopPropagation();
            }
        }
    };
}

const onDrop: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mouseup', createMouseupHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mouseup', (evt: MouseEvent) => { noop(); }, false);
    }
};

export default onDrop;
