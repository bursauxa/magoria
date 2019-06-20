import DragDropData from './DragDropData';

export enum DragStatus {
    Started = 'Started',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Aborted = 'Aborted'
}

export interface DragStartedEventData {
    type: DragStatus.Started;
    source: DragDropData;
}

export interface DragInProgressEventData {
    type: DragStatus.InProgress;
    source: DragDropData;
    target: DragDropData;
    handled: boolean;
}

export interface DragCompletedEventData {
    type: DragStatus.Completed;
    source: DragDropData;
    target: DragDropData;
}

export interface DragAbortedEventData {
    type: DragStatus.Aborted;
    source: DragDropData;
}

export type DragDropEventData =
    DragStartedEventData | DragInProgressEventData | DragCompletedEventData | DragAbortedEventData;
