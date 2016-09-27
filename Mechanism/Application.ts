class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    audio: AudioPlayer;
    input: Input;
    fps = 0;
    private time: number;

    constructor(width: number = 800, height: number = 600) {
        this.view = document.createElement("div");
        this.renderer = new Renderer(width!, height!);
        this.view.appendChild(this.renderer.view);
        this.audio = new AudioPlayer();
        this.view.appendChild(this.audio.view);
        this.input = new Input();
    }

    run(): void {
        window.requestAnimationFrame((time) => this.handleAnimationFrame(time));
        window.onkeydown = event => this.onKeyDown(event);
        window.onkeyup = event => this.onKeyUp(event);
    }

    private onKeyDown(event: KeyboardEvent) {
        this.input.addKeyEvent(this.translateKey(event.code), true);
    }

    private onKeyUp(event: KeyboardEvent) {
        this.input.addKeyEvent(this.translateKey(event.code), false);
    }

    private handleAnimationFrame(time: number) {
        if (!this.time)
            this.time = time;
        const delta = (time - this.time) / 1000;
        this.fps = 1 / delta;
        this.input.processPendingKeyEvents();
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

    translateKey(code: string) {
        // TODO
        switch (code) {
            case "ArrowUp": return Key.Up;
            case "ArrowDown": return Key.Down;
            case "ArrowRight": return Key.Right;
            case "ArrowLeft": return Key.Left;
            case "Space": return Key.Space;
            default: return Key.Unknown;
        }
    }
}