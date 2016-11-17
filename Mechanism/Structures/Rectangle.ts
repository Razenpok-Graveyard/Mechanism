class Rectangle {
    min: Vector2;
    max: Vector2;

    constructor(min: Vector2, max: Vector2);
    constructor(left: number, top: number, right: number, bottom: number);
    constructor(minOrLeft: Vector2 | number, maxOrTop: Vector2 | number, right?: number, bottom?: number) {
        if (typeof minOrLeft === "number" && typeof maxOrTop === "number") {
            this.min = new Vector2(minOrLeft, maxOrTop);
            this.max = new Vector2(right!, bottom!);
        }
        if (minOrLeft instanceof Vector2 && maxOrTop instanceof Vector2) {
            this.min = minOrLeft;
            this.max = maxOrTop;
        }
    }

    get left(): number { return this.min.x; }

    get top(): number { return this.min.y; }

    get right(): number { return this.max.x; }

    get bottom(): number { return this.max.y; }

    get width(): number { return this.max.x - this.min.x; }

    get height(): number { return this.max.y - this.min.y; }
}