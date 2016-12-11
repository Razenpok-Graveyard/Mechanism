class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    vectorGraphics: VectorGraphics;
    readonly context: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        const canvas = document.createElement("canvas");
        this.view = canvas;
        const context = canvas.getContext("2d");
        if (!context) {
            throw "Cannot obtain context";
        }
        this.context = context;
        this.width = width;
        this.height = height;
        // TODO
        context.font = "30px sans-serif";
        this.vectorGraphics = new VectorGraphics(this.context);
    }

    get width() {
         return this.view.clientWidth;
    }

    set width(value: number) {
         this.view.width = value;
    }

    get height() {
         return this.view.clientHeight;
    }

    set height(value: number) {
         this.view.height = value;
    }

    get size() {
        return new Vector2(this.width, this.height);
    }

    set size(value: Vector2) {
        this.width = value.x;
        this.height = value.y;
    }

    set imageSmoothing(value: boolean) {
        const ctx = this.context as any;
        ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled =
            ctx.msImageSmoothingEnabled = ctx.imageSmoothingEnabled = false;
    }

    get globalAlpha() {
        return this.context.globalAlpha;
    }

    set globalAlpha(value: number) {
        this.context.globalAlpha = value;
    }

    render(renderObject: RenderObject) {
        renderObject.beforeRender(this);
        renderObject.render(this);
        renderObject.afterRender(this);
    }

    renderTexture(texture?: Texture, x = 0, y = 0, width?: number, height?: number,
        sx?: number, sy?: number, sWidth?: number, sHeight?: number) {
        if (!texture || !texture.source) {
            this.renderUndefinedTexture(x, y, width, height);
        }
        else {
            if (arguments.length <= 5) {
                this.context.drawImage(texture.source, x, y, width, height);
            }
            else {
                this.context.drawImage(texture.source, sx!, sy!, sWidth, sHeight, x, y, width, height);
            }
        }
    }

    renderText(text: string, x = 0, y = 0, color?: Color) {
        this.save();
        if (color) {
            this.vectorGraphics.fillStyle(color);
        }
        this.context.fillText(text, x, y);
        this.restore();
    }

    measureText(text: string) {
        return this.context.measureText(text).width;
    }

    private renderUndefinedTexture(x = 0, y = 0, width?: number, height?: number) {
        const image = new Image();
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAG0lEQVQI12O4yTDl////WEkGXBL///9nGAb6AKuosf7WkzVAAAAAAElFTkSuQmCC";
        const ctx = this.context as any;
        const smoothings = [
            ctx.mozImageSmoothingEnabled, ctx.webkitImageSmoothingEnabled,
            ctx.msImageSmoothingEnabled, ctx.imageSmoothingEnabled
        ];
        this.imageSmoothing = false;
        ctx.drawImage(image, x, y, width, height);
        [ctx.mozImageSmoothingEnabled, ctx.webkitImageSmoothingEnabled,
            ctx.msImageSmoothingEnabled, ctx.imageSmoothingEnabled] = smoothings;
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
            this.context.fillStyle = this.backgroundColor.toCssHex();
            this.context.fillRect(0, 0, this.width, this.height);
        }
        else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        this.context.restore();
    }
}