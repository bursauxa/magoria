import DragDropData from './DragDropData';

export default class DragDropEventData {
    public handled = false;
    public constructor(public source: DragDropData, public target: DragDropData) { }
}
