import DragDropData from './DragDropData';

export default class DragDropEventData {
    public constructor(public source: DragDropData, public target: DragDropData) { }
}
