///<reference path="RenderObject.ts"/>
class Widget extends RenderObject {
    children: Widget[] = [];
    position = new Vector2();
    scale = new Vector2();
    rotation = 0;

    render(renderer: Renderer): void {
        renderer.save();
        renderer.translate(this.position.x, this.position.y);
        renderer.rotate(this.rotation);
        super.render(renderer);
        renderer.restore();
    }

    get width(): number {
        return 100;
    }

    get height(): number {
        return 100;
    }

    addChild(widget: Widget): void {
        super.addChild(widget);
    }
}