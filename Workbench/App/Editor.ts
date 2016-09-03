/// <reference path="RelativeLinearLayout.ts"/>
/// <reference path="Orientation.ts"/>
class Editor extends Application {
    sizeChanged: boolean;

    constructor() {
        super();
        this.renderer.backgroundColor = Color.black;
        const layout = new RelativeLinearLayout(Orientation.Horizontal);
        const first = new Rect(Color.blue);
        layout.addChild(first).sizeFactor = 0.75;
        const second = new Rect(Color.red);
        layout.addChild(second).sizeFactor = 0.25;
        this.root = layout;
        this.fitRendererInClient();
    }

    run(): void {
        window.onresize = () => this.sizeChanged = true;
        super.run();
    }

    render(time: number): void {
        if (this.sizeChanged) {
            this.fitRendererInClient();
            this.sizeChanged = false;
        }
        super.render(time);
    }

    private fitRendererInClient() {
        this.renderer.width = document.body.clientWidth;
        this.renderer.height = document.body.clientHeight;
    }
}