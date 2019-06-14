import DragDropEventData from './DragDropEventData';
import DragDropData from './DragData';
import Vue from 'vue';

enum DragStatus {
    Initial = 'Initial',
    Started = 'Started',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Aborted = 'Aborted'
}

class DragState {
    private sourceData: DragDropData | null = null;
    private targetData: DragDropData | null = null;
    private status = DragStatus.Initial;
    private rootHandlerAlreadyAdded = false;

    public addRootHandlerIfNeeded() {
        if (!this.rootHandlerAlreadyAdded) {
            this.rootHandlerAlreadyAdded = true;
            document.addEventListener('mouseup', () => this.abort());
        }
    }

    public start(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        offsetX: number,
        offsetY: number,
        data?: any) {
        if (this.status === DragStatus.Initial
            || this.status === DragStatus.Completed
            || this.status === DragStatus.Aborted) {
                this.sourceData = new DragDropData(
                    eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY, data);
                this.targetData = null;
                this.status = DragStatus.Started;
        }
    }

    public progress(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        offsetX: number,
        offsetY: number,
        data?: any) {
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(
                eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY, data);
            this.status = DragStatus.InProgress;
        }
    }

    public complete(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        offsetX: number,
        offsetY: number,
        data?: any) {
        // TODO : disallow from started
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(
                eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY, data);
            this.status = DragStatus.Completed;
        }
    }

    public abort() {
        // TODO : disallow from started
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = null;
            this.status = DragStatus.Aborted;
        }
    }

    public buildEventData() {
        if (this.status !== DragStatus.InProgress && this.status !== DragStatus.Completed) {
            return null;
        } else {
            return new DragDropEventData(this.sourceData!, this.targetData!);
        }
    }
}

const GlobalDragState = new DragState();

export default GlobalDragState;
