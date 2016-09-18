/// <reference path="Animator.ts"/>
/// <reference path="KeyFrame.ts"/>
class GenericAnimator<TObject extends RenderObject, TValue> extends Animator {
    frames: KeyFrame<TValue>[] = [];
    private name: string;
    private applyFunc: (target: TObject, value: TValue) => void;
    private interpolateFunc: (amount: number, from: TValue, to: TValue, interpolation: Interpolation) => TValue;

    constructor(name: string,
        applyFunc: (target: TObject, value: TValue) => void,
        interpolateFunc: (amount: number, from: TValue, to: TValue, interpolation: Interpolation) => TValue) {
        super();
        this.name = name;
        this.applyFunc = applyFunc;
        this.interpolateFunc = interpolateFunc;
    }

    setFrame(frame: number, value: TValue, interpolation: Interpolation = Interpolation.None) {
        this.frames[frame] = new KeyFrame(value, interpolation);
    }

    applyValue(object: TObject, value: any): void {
        this.applyFunc(object, value);
    }

    getName(): string {
        return this.name;
    }

    interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any {
        return this.interpolateFunc(amount, from, to, interpolation);
    }
}