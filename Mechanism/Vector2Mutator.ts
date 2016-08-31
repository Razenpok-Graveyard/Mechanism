class Vector2Mutator {
    private origin: Vector2;

    constructor(vector: Vector2) {
        this.origin = vector;
    }

    add(value: Vector2): Vector2Mutator {
        this.origin.x += value.x;
        this.origin.y += value.y;
        return this;
    }

    subtract(value: Vector2): Vector2Mutator {
        this.origin.x -= value.x;
        this.origin.y -= value.y;
        return this;
    }
}