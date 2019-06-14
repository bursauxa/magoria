import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import GlobalDragState from './drag-state';

const datapathAttribute = 'd-atapath';

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
    return (evt: MouseEvent) => {
        const vue = findClosestMountedComponent(node);
        let data = vue;
        if (vue && draggableElement.hasAttribute(datapathAttribute)) {
            const datapath = draggableElement.getAttribute(datapathAttribute);
            if (datapath !== null) {
                data = (vue as any)[datapath];
            }
        }
        GlobalDragState.start(evt.target!, draggableElement, vue, evt.offsetX, evt.offsetY, data);
    };
}

const draggable: DirectiveOptions = {
    bind() {
        GlobalDragState.addRootHandlerIfNeeded();
    },
    inserted(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mousedown', createMousedownHandler(el, binding, node), false);
    }
};

export default draggable;