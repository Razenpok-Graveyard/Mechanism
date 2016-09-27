class KeyFrame<T> {
    value: T;
    interpolation: Interpolation;

    constructor(value: T, interpolation: Interpolation = Interpolation.None) {
        this.value = value;
        this.interpolation = interpolation!;
    }
}