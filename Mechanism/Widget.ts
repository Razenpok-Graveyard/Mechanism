///<reference path="RenderObject.ts"/>
///<reference path="Animations/PropertyAnimatorFactories.ts"/>
class Widget extends RenderObject {
    children: Widget[] = [];
    position = Vector2.zero;
    scale = Vector2.one;
    rotation = 0;
    pivot = Vector2.zero;

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

    static positionAnimator = new Vector2Animator("position", (t: Widget, v: Vector2) => t.position = v);
    static scaleAnimator = new Vector2Animator("scale", (t: Widget, v: Vector2) => t.scale = v);
    static pivotAnimator = new Vector2Animator("pivot", (t: Widget, v: Vector2) => t.pivot = v);
    static rotationAnimator = new NumberAnimator("rotation", (t: Widget, v: number) => t.rotation = v);
}