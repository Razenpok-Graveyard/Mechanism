class VectorGraphics {
    private canvas: CanvasRenderingContext2D;

    constructor(canvas: CanvasRenderingContext2D) {
        this.canvas = canvas;
    }

    drawRect(color: Color, x: number, y: number, width: number, height: number): VectorGraphics {
        this.canvas.save();
        this.canvas.fillStyle = color.toHex();
        this.canvas.fillRect(x, y, width, height);
        this.canvas.restore();
        return this;
    }
}