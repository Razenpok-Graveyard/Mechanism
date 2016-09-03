class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    fps = 0;
    private time = 0;

    constructor(width: number = 800, height: number = 600) {
        this.view = document.createElement("div");
        this.renderer = new Renderer(width, height);
        this.view.appendChild(this.renderer.view);
    }

    run(): void {
        window.requestAnimationFrame((time) => this.firstRender(time));
    }

    private firstRender(time: number) {
        this.time = time;
        this.render(time);
    }

    render(time: number) {
        const delta = time - this.time;
        this.fps = (1 / delta) * 1000;
        if (this.root)
            this.renderer.render(this.root);
        else
            this.renderer.flush();
        this.time = time;
        window.requestAnimationFrame((time) => this.render(time));
    }
}