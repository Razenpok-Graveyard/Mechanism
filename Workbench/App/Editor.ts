/// <reference path="StackLayout.ts"/>
/// <reference path="Rect.ts"/>
/// <reference path="WidgetView.ts"/>
class Editor extends Application {
    sizeChanged: boolean;

    constructor() {
        super();
        this.renderer.backgroundColor = Color.black;
        const layout = new StackLayout(Orientation.Horizontal);
        const blue = new Rect(Color.blue);
        const blueWidgetView = new WidgetView(blue);
        blueWidgetView.backgroundColor = new Color(0xFFB6C1);
        layout.addChild(blueWidgetView).sizeRequest = 300;
        const green = new Rect(Color.green);
        green.position = new Vector2(100, 100);
        green.pivot = new Vector2(0, 0);
        blue.addChild(green);
        const red = new Rect(Color.red);
        red.position = new Vector2(100, 100);
        green.addChild(red);
        //const redWidgetView = new WidgetView(red);
        //layout.addChild(redWidgetView).sizeRequest = 600;
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
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        this.renderer.width = width;
        this.renderer.height = height;
        const layoutable = this.root as ILayoutable;
        if (layoutable.layout != undefined)
            layoutable.layout(width, height);
    }
}