class Editor extends Application {
    private resized = false;

    constructor() {
        super();
        this.renderer.backgroundColor = Color.black;
        this.fitRendererInWindow();
        window.onresize = () => this.resized = true;
    }

    render(time: number): void {
        if (this.resized) {
            this.fitRendererInWindow();
            this.resized = false;
        }
        super.render(time);
    }

    private fitRendererInWindow() {
        this.renderer.width = document.documentElement.clientWidth;
        this.renderer.height = document.documentElement.clientHeight;
    }
}