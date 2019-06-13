export default class DDroppedPhysicalEventData {
    public constructor(
        public dragSource: EventTarget, public dragOffsetX: number, public dragOffsetY: number,
        public dropTarget: EventTarget, public dropOffsetX: number, public dropOffsetY: number) { }
}
