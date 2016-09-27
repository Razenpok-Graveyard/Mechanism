/// <reference path="Renderer.ts"/>
/// <reference path="AudioPlayer.ts"/>
class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    audio: AudioPlayer;
    fps = 0;
    private time: number;

    constructor(width: number = 800, height: number = 600) {
        this.view = document.createElement("div");
        this.renderer = new Renderer(width!, height!);
        this.view.appendChild(this.renderer.view);
        this.audio = new AudioPlayer();
        this.view.appendChild(this.audio.view);
    }

    run(): void {
        window.requestAnimationFrame((time) => this.handleAnimationFrame(time));
    }

    private handleAnimationFrame(time: number) {
        if (!this.time)
            this.time = time;
        const delta = (time - this.time) / 1000;
        this.fps = 1 / delta;
        this.update(delta);
        this.render();
        this.time = time;
        window.requestAnimationFrame((time) => this.handleAnimationFrame(time));
    }

    render() {
        this.renderer.flush();
        if (this.root)
            this.renderer.render(this.root);
    }

    update(delta: number) {
        if (this.root)
            this.root.update(delta);
    }
}