/// <reference path="RenderObject.ts"/>
class Widget extends RenderObject {
    children: Widget[] = [];
    position = Vector2.zero;
    scale = Vector2.one;
    rotation = 0;
    pivot = Vector2.zero;
    size = new Vector2(100, 100);
    opacity = 1;

    beforeRender(renderer: Renderer): void {
        renderer.save();
        renderer.globalAlpha *= this.opacity;
        renderer.translate(this.position.x, this.position.y);
        renderer.rotate(this.rotation);
        const offset = this.pivot
            .multiply(new Vector2(this.width, this.height));
        renderer.translate(-offset.x, -offset.y);
        renderer.scale(this.scale.x, this.scale.y);
    }

    afterRender(renderer: Renderer): void {
        renderer.restore();
    }

    get x(): number {
       return this.position.x;
    }

    set x(value: number) {
         this.position.x = value;
    }

    get y(): number {
        return this.position.y;
    }

    set y(value: number) {
        this.position.y = value;
    }

    get width(): number {
        return this.size.x;
    }

    set width(value: number) {
        this.size.x = value;
    }

    get height(): number {
        return this.size.y;
    }

    set height(value: number) {
        this.size.y = value;
    }

    addChild(widget: Widget): void {
        super.addChild(widget);
    }

    static positionAnimator = () => new Vector2Animator("position");
    static scaleAnimator = () => new Vector2Animator("scale");
    static pivotAnimator = () => new Vector2Animator("pivot");
    static sizeAnimator = () => new Vector2Animator("size");
    static rotationAnimator = () => new NumberAnimator("rotation");
}