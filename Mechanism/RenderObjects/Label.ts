class Label extends RenderObject2D {
    text?: string;
    verticalTextAlignment = TextAlignment.Start;
    horizontalTextAlignment = TextAlignment.Start;

    constructor(text?: string) {
        super();
        this.text = text;
    }

    render(renderer: Renderer): void {
        if (!this.text) {
            super.render(renderer);
            return;
        }
        // TODO
        const measure = new Vector2(renderer.measureText(this.text), 30);
        const position = Vector2.zero;
        switch (this.horizontalTextAlignment) {
            case TextAlignment.Center:
                position.x = this.size.x / 2 - measure.x / 2;
                break;
            case TextAlignment.End:
                position.x = this.size.x - measure.x;
                break;
        }
        switch (this.verticalTextAlignment) {
            case TextAlignment.Start:
                position.y = measure.y;
                break;
            case TextAlignment.Center:
                position.y = this.size.y / 2 + measure.y / 2;
                break;
            case TextAlignment.End:
                position.y = this.size.y;
                break;
        }
        renderer.renderText(this.text, position.x, position.y);
        super.render(renderer);
    }
}