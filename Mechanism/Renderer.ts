class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        const canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;
        this.view = canvas;
        this.context = canvas.getContext("2d");
    }

    render(renderObject: RenderObject) {
        this.flush();
        renderObject.render(this);
    }

    renderTexture(texture: Texture, x: number, y: number): void {
        this.context.drawImage(texture.source, x, y);
    }

    translate(x: number, y: number) {
        this.context.translate(x, y);
    }

    rotate(angle: number) {
        const radians = (Math.PI / 180) * angle;
        this.context.rotate(radians);
    }

    private flush(): void {
        this.context.save();
        if (this.backgroundColor) {
            this.context.fillStyle = this.backgroundColor.toHex();
            this.context.fillRect(0, 0, this.width, this.height);
        } else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        this.context.restore();
    }
}