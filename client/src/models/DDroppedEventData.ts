import DDroppedLogicalEventData from './DDroppedLogicalEventData';
import DDroppedPhysicalEventData from './DDroppedPhysicalEventData';

export default class DDroppedEventData {
    public constructor(public logical: DDroppedLogicalEventData, public physical: DDroppedPhysicalEventData) { }
}
