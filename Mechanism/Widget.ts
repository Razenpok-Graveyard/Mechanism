///<reference path="RenderObject.ts"/>
class Widget extends RenderObject {
    position = new Vector2();
    rotation = 0;

    render(renderer: Renderer): void {
        renderer.translate(this.position.x, this.position.y);
        renderer.rotate(this.rotation);
        super.render(renderer);
        renderer.rotate(-this.rotation);
        renderer.translate(-this.position.x, -this.position.y);
    }
}