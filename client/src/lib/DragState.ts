import DragDropEventData from './DragDropEventData';
import DragDropData from './DragDropData';
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

    public addRootHandlerIfNeeded(): void {
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
        data?: any): boolean {
        if (this.status === DragStatus.Initial || this.status === DragStatus.Completed || this.status === DragStatus.Aborted) {
            this.sourceData = new DragDropData(
                eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY, data);
            this.targetData = null;
            this.status = DragStatus.Started;
            return true;
        } else {
            return false;
        }
    }

    public progress(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        offsetX: number,
        offsetY: number,
        data?: any): boolean {
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(
                eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY, data);
            this.status = DragStatus.InProgress;
            return true;
        } else {
            return false;
        }
    }

    public complete(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        offsetX: number,
        offsetY: number): boolean {
        if (this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(
                eventTarget, directiveHolder, associatedVueComponent, offsetX, offsetY);
            this.status = DragStatus.Completed;
            return true;
        } else {
            return false;
        }
    }

    public abort(): boolean {
        if (this.status === DragStatus.InProgress) {
            this.targetData = null;
            this.status = DragStatus.Aborted;
            return true;
        } else {
            return false;
        }
    }

    public buildEventData(): DragDropEventData | null {
        if (this.status !== DragStatus.InProgress && this.status !== DragStatus.Completed) {
            return null;
        } else {
            return new DragDropEventData(this.sourceData!, this.targetData!);
        }
    }
}

const GlobalDragState = new DragState();

export default GlobalDragState;
