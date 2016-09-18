/// <reference path="Renderer.ts"/>
class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    fps = 0;
    private time: number;

    constructor(width: number = 800, height: number = 600) {
        this.view = document.createElement("div");
        this.renderer = new Renderer(width, height);
        this.view.appendChild(this.renderer.view);
    }

    run(): void {
        window.requestAnimationFrame((time) => this.render(time));
    }

    render(time: number) {
        if (!this.time)
            this.time = time;
        const delta = time - this.time;
        this.fps = (1 / delta) * 1000;
        this.renderer.flush();
        if (this.root) {
            this.root.update();
            this.renderer.render(this.root);
        }
        this.time = time;
        window.requestAnimationFrame((time) => this.render(time));
    }
}