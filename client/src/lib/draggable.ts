import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { noop } from 'vue-class-component/lib/util';
import GlobalDragState from './DragState';
import VueHelper from './VueHelper';

function createMousedownHandler(draggableElement: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        const data = binding.value ? binding.value : vue;
        GlobalDragState.start(event.target!, draggableElement, vue, event.offsetX, event.offsetY, data);
    };
}

const draggable: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        GlobalDragState.addRootHandlerIfNeeded();
        el.addEventListener('mousedown', createMousedownHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousedown', (evt: MouseEvent) => { noop(); }, false);
    }
};

export default draggable;
