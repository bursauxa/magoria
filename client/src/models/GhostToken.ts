import TokenModel from '@/models/TokenModel';

export default class GhostToken extends TokenModel {
    public ghost = true;

    private coords = [Number.NaN, Number.NaN];
    public get x() {
        return this.coords[0];
    }
    public get y() {
        return this.coords[1];
    }

    private visible = false;
    public get isVisible() {
        return this.visible;
    }

    constructor() {
        super('');
    }

    public replicate(token: TokenModel) {
        this.toneIndex = token.toneIndex;
        this.id = token.id;
        this.orientation = token.orientation;
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }

    public move(x: number, y: number) {
        this.coords = [x, y];
    }
}
