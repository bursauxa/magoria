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

function createMousedownHandler(draggableElement: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = findClosestMountedComponent(node);
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
