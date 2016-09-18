/// <reference path="GenericAnimator.ts"/>
abstract class PropertyAnimatorFactory<TObject extends RenderObject, TValue> {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    create(): GenericAnimator<TObject, TValue> {
        return new GenericAnimator(this.name, this.applyValue, this.interpolate);
    }

    private applyValue(object: any, value: TValue): void {
        object[this.name] = value;
    }

    protected abstract interpolate(amount: number, from: TValue, to: TValue, interpolation: Interpolation): TValue;
}