/// <reference path="GenericAnimator.ts"/>
abstract class PropertyAnimatorFactory<TObject extends RenderObject, TValue> {
    private name: string;
    private applyFunc: (target: TObject, value: TValue) => void;

    constructor(name: string, applyFunc: (target: TObject, value: TValue) => void) {
        this.name = name;
        this.applyFunc = applyFunc;
    }

    create(): GenericAnimator<TObject, TValue> {
        return new GenericAnimator(this.name, this.applyFunc, this.interpolate);
    }

    protected abstract interpolate(amount: number, from: TValue, to: TValue, interpolation: Interpolation): TValue;
}