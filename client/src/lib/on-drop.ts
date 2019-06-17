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
        GlobalDragState.complete(event.target!, element, vue, event.offsetX, event.offsetY);
        binding.value.apply(null, [GlobalDragState.buildEventData()]);
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
