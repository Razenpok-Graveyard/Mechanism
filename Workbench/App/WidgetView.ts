class WidgetView extends LayoutElement {
    private widget: Widget;
    private offset = new Vector2();
    backgroundColor = new Color(0xD3D3D3);

    constructor(widget: Widget) {
        super();
        this.widget = widget;
    }

    render(renderer: Renderer): void {
        renderer.save();
        renderer.vectorGraphics.drawRect(this.backgroundColor, 0, 0, this.width, this.height);
        renderer.clip(0, 0, this.width, this.height);
        const center = new Vector2(this.width / 2, this.height / 2);
        renderer.translate(center.x + this.offset.x, center.y + this.offset.y);
        renderer.render(this.widget);
        renderer.restore();
    }
}