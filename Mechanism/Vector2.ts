class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(value: Vector2): Vector2 {
        return new Vector2(this.x + value.x, this.y + value.y);
    }

    subtract(value: Vector2): Vector2 {
        return new Vector2(this.x - value.x, this.y - value.y);
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    mutate(): Vector2Mutator {
        return new Vector2Mutator(this);
    }
}