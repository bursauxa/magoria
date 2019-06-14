import DragDropData from './DragData';

export default class DragDropEventData {
    public constructor(public source: DragDropData, public target: DragDropData) { }
}
