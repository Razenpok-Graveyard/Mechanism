class Renderer {
    view: HTMLCanvasElement;
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

    render(sprite: Sprite): void {
        this.flush();
        this.context.drawImage(sprite.texture.source, sprite.position.x, sprite.position.y);
    }

    private flush(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}