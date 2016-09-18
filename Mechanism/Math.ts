interface Math {
    lerp(amount: number, from: number, to: number): number;
}

Math.lerp = (amount, from, to) => from + (to - from) * amount;