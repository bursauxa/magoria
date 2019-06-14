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

function createMouseupHandler(droppableElement: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (evt: MouseEvent) => {
        const vue = findClosestMountedComponent(node);
        let data = vue;
        if (vue && droppableElement.hasAttribute(datapathAttribute)) {
            const datapath = droppableElement.getAttribute(datapathAttribute);
            if (datapath !== null) {
                data = (vue as any)[datapath];
            }
        }
        GlobalDragState.complete(evt.target!, droppableElement, vue, evt.offsetX, evt.offsetY, data);
        if (vue) {
            vue.$emit('drag-drop-completed', GlobalDragState.buildEventData());
        }
    };
}

const droppable: DirectiveOptions = {
    inserted(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mouseup', createMouseupHandler(el, binding, node), false);
    }
};

export default droppable;
