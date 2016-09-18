/// <reference path="Vector2Mutator.ts"/>
class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs + rhs);
    }

    subtract(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs - rhs);
    }

    multiply(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs * rhs);
    }

    divide(value: Vector2 | number): Vector2 {
        return this.combine(value, (lhs, rhs) => lhs / rhs);
    }

    private combine(value: Vector2 | number, func: (lhs: number, rhs: number) => number): Vector2 {
        if (value instanceof Vector2)
            return new Vector2(func(this.x, value.x), func(this.y, value.y));
        else
            return new Vector2(func(this.x, value), func(this.y, value));
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    mutate(): Vector2Mutator {
        return new Vector2Mutator(this);
    }

    static get zero(): Vector2 {
         return new Vector2(0, 0);
    }

    static get half(): Vector2 {
         return new Vector2(0.5, 0.5);
    }

    static get one(): Vector2 {
         return new Vector2(1, 1);
    }
}