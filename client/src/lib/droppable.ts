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
        const data = binding.value ? binding.value : vue;
        GlobalDragState.complete(event.target!, droppableElement, vue, event.offsetX, event.offsetY, data);
        if (vue) {
            vue.$emit('drag-drop-completed', GlobalDragState.buildEventData());
        }
    };
}

const droppable: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mouseup', createMouseupHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousedown', (evt: MouseEvent) => { noop(); }, false);
    }
};

export default droppable;
