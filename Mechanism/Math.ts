interface Math {
    lerp(amount: number, from: number, to: number): number;
    clamp(value: number, min: number, max: number): number;
}

Math.lerp = (amount, from, to) => from + (to - from) * amount;
Math.clamp = (value, min, max) => (value < min) ? min : (value > max ? max : value);