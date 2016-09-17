/// <reference path="VectorGraphics.ts"/>
class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    vectorGraphics: VectorGraphics;
    private context: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        const canvas = document.createElement("canvas");
        this.view = canvas;
        this.context = canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.vectorGraphics = new VectorGraphics(this.context);
    }

    get width(): number {
        return this.view.clientWidth;
    }

    set width(value: number) {
        this.view.width = value;
    }

    get height(): number {
        return this.view.clientHeight;
    }

    set height(value: number) {
        this.view.height = value;
    }

    render(renderObject: RenderObject) {
        renderObject.beforeRender(this);
        renderObject.render(this);
        renderObject.afterRender(this);
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

    scale(x: number, y: number) {
        this.context.scale(x, y);
    }

    save() {
        this.context.save();
    }

    restore() {
        this.context.restore();
    }

    clip(x: number, y: number, width: number, height: number) {
        const path = new Path2D();
        path.rect(x, y, width, height);
        this.context.clip(path);
    }

    flush(): void {
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