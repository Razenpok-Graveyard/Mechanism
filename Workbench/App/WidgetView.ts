class WidgetView extends LayoutElement {
    private offset = new Vector2();
    backgroundColor = new Color(0xD3D3D3);
    startingPoint = Vector2.half;

    constructor(private readonly widget: Widget) {
        super();
    }

    render(renderer: Renderer): void {
        renderer.save();
        renderer.vectorGraphics
            .fillStyle(this.backgroundColor)
            .drawRect(0, 0, this.width, this.height);
        renderer.restore();
        renderer.save();
        renderer.clip(0, 0, this.width, this.height);
        const center = new Vector2(this.width * this.startingPoint.x, this.height * this.startingPoint.y);
        renderer.translate(center.x + this.offset.x, center.y + this.offset.y);
        renderer.render(this.widget);
        renderer.restore();
    }
}