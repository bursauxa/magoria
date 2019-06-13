import Vue, { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import DDroppedEventData from '@/models/DDroppedEventData';
import DDroppedLogicalEventData from '@/models/DDroppedLogicalEventData';
import DDroppedPhysicalEventData from '@/models/DDroppedPhysicalEventData';

const dropzoneAttribute = 'd-ropzone';
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
    return undefined;
}

function createMousedownHandler(draggableElement: HTMLElement, node: VNode) {
    return (evt: MouseEvent) => {
        const vue = findClosestMountedComponent(node);
        let data = vue;
        if (vue && draggableElement.hasAttribute(datapathAttribute)) {
            const datapath = draggableElement.getAttribute(datapathAttribute);
            if (datapath !== null) {
                data = (vue as any)[datapath];
            }
        }
        document.addEventListener(
            'mouseup',
            createMouseupHandler(draggableElement, vue, data, evt.target!, evt.offsetX, evt.offsetY),
            { capture: false, once: true });
    };
}

function createMouseupHandler(
    draggableElement: HTMLElement, vue: Vue | undefined, data: any,
    physicalDragSource: EventTarget, dragOffsetX: number, dragOffsetY: number) {
    return (evt: MouseEvent) => {
        let dropzoneElement: Element | undefined;
        evt.composedPath().forEach((elementOnPath: EventTarget) => {
            if (!dropzoneElement && elementOnPath instanceof Element
                && elementOnPath.parentElement != null
                && elementOnPath.hasAttribute(dropzoneAttribute)) {
                dropzoneElement = elementOnPath;
            }
        });
        if (vue && dropzoneElement) {
            vue.$emit('d-ropped', new DDroppedEventData(
                new DDroppedLogicalEventData(draggableElement, dropzoneElement, data),
                new DDroppedPhysicalEventData(
                    physicalDragSource, dragOffsetX, dragOffsetY,
                    evt.target!, evt.offsetX, evt.offsetY)
            ));
        }
    };
}

const draggable: DirectiveOptions = {
    inserted(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mousedown', createMousedownHandler(el, node), false);
    }
};

export default draggable;
