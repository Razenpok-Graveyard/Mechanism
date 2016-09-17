///<reference path="RenderObject.ts"/>
class Widget extends RenderObject {
    children: Widget[] = [];
    position = new Vector2();
    scale = new Vector2(1, 1);
    rotation = 0;
    pivot = new Vector2(0.5, 0.5);

    beforeRender(renderer: Renderer): void {
        renderer.save();
        const offset = this.position.subtract(this.pivot.multiply(new Vector2(this.width, this.height)));
        renderer.translate(offset.x, offset.y);
        renderer.rotate(this.rotation);
        renderer.scale(this.scale.x, this.scale.y);
    }

    afterRender(renderer: Renderer): void {
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