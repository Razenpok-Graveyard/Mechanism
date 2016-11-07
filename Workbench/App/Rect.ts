class Rect extends Widget {
    color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
    }

    render(renderer: Renderer): void {
        renderer.vectorGraphics
            .fillStyle(this.color)
            .drawRect(0, 0, 100, 100);
        super.render(renderer);
    }
}