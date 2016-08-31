class Renderer {
    view: HTMLCanvasElement;

    constructor() {
        this.view = document.createElement("canvas");
    }

    private getContext(): CanvasRenderingContext2D {
        return this.view.getContext("2d");
    }

    render(): void {
        const ctx = this.getContext();
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 50, 50);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 50, 50);
    }
}