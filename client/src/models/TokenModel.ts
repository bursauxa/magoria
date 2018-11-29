import TokenOrientation from '@/models/TokenOrientation';

export default class ShapeModel {
  public id: string;
  public orientation: TokenOrientation = TokenOrientation.North;

  private tones = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  private toneIndex = 0;

  public constructor(id: string, orientation?: TokenOrientation) {
    this.id = id;
    this.orientation = orientation ? orientation : TokenOrientation.North;
  }

  public get tone(): string {
    return this.tones[this.toneIndex];
  }

  public changeTone() {
    this.toneIndex = (this.toneIndex + 1) % this.tones.length;
  }

  public get orientationAsDegrees(): number {
    switch (this.orientation) {
      case TokenOrientation.East:
        return 90;
      case TokenOrientation.South:
        return 180;
      case TokenOrientation.West:
        return 270;
      default:
        return 0;
    }
  }

  public rotate() {
    switch (this.orientation) {
      case TokenOrientation.North:
        this.orientation = TokenOrientation.East;
        break;
      case TokenOrientation.East:
        this.orientation = TokenOrientation.South;
        break;
      case TokenOrientation.South:
        this.orientation = TokenOrientation.West;
        break;
      case TokenOrientation.West:
        this.orientation = TokenOrientation.North;
        break;
    }
  }
}
