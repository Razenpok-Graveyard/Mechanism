class Editor extends Application {
    sizeChanged: boolean;

    constructor() {
        super();
        this.renderer.backgroundColor = Color.black;
        const layout = new StackLayout(Orientation.Horizontal);
        const propertyView = this.createPropertyView();
        layout.addChild(propertyView).sizeRequest = 300;
        const label = new Label("Hello");
        const widgetView = new WidgetView(label);
        widgetView.backgroundColor = new Color(0xFFB6C1);
        layout.addChild(widgetView).sizeRequest = 700;
        const blue = new Rect(Color.blue);
        blue.position = new Vector2(100, 100);
        blue.pivot = new Vector2(0, 0);
        label.addChild(blue);
        const green = new Rect(Color.green);
        green.position = new Vector2(100, 100);
        green.pivot = new Vector2(0, 0);
        blue.addChild(green);
        const red = new Rect(Color.red);
        red.position = new Vector2(100, 100);
        green.addChild(red);
        this.root = layout;
        this.fitRendererInClient();
    }

    createPropertyView() {
        const propertyView = new StackLayout(Orientation.Vertical);
        for (let i = 0; i < 5; i++) {
            const label = new Label(`Label ${i}`);
            const widgetView = new WidgetView(label);
            widgetView.startingPoint = Vector2.zero;
            widgetView.backgroundColor = Color.blue;
            propertyView.addChild(widgetView).sizeRequest = 50;
        }
        return propertyView;
    }

    run(): void {
        window.onresize = () => this.sizeChanged = true;
        super.run();
    }

    render(): void {
        if (this.sizeChanged) {
            this.fitRendererInClient();
            this.sizeChanged = false;
        }
        super.render();
    }

    private fitRendererInClient() {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        this.renderer.width = width;
        this.renderer.height = height;
        // BUG: After resize context gets overriden
        this.renderer.view.getContext("2d").font = "30px sans-serif";
        const layoutable = this.root as ILayoutable;
        if (layoutable.layout != undefined)
            layoutable.layout(width, height);
    }
}