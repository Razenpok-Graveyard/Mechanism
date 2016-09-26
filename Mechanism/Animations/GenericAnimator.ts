/// <reference path="Animator.ts"/>
/// <reference path="KeyFrame.ts"/>
class GenericAnimator<TObject extends RenderObject, TValue> extends Animator {
    frames: KeyFrame<TValue>[] = [];

    constructor(name: string) {
        super(name);
    }

    setFrame(frame: number, value: TValue, interpolation: Interpolation = Interpolation.None) {
        this.frames[frame] = new KeyFrame(value, interpolation);
    }

    applyValue(object: TObject, value: any): void {
        (object as any)[this.name] = value;
    }

    interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any {
        return from;
    }
}