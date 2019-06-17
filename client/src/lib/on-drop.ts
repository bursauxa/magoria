import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import GlobalDragState from './drag-state';
import { noop } from 'vue-class-component/lib/util';

function findClosestMountedComponent(node: VNode) {
    let current: VNode | undefined = node;
    while (current) {
        if (current.componentInstance) {
            return current.componentInstance;
        } else {
            current = node.parent;
        }
    }
    return null;
}

function createMouseupHandler(droppableElement: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = findClosestMountedComponent(node);
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drop handler is not a function');
        }
        GlobalDragState.complete(event.target!, droppableElement, vue, event.offsetX, event.offsetY);
        binding.value.apply(null, [GlobalDragState.buildEventData()]);
    };
}

const onDrop: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mouseup', createMouseupHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousedown', (evt: MouseEvent) => { noop(); }, false);
    }
};

export default onDrop;
