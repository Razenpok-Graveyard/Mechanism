///<reference path="Widget.ts"/>
///<reference path="Texture.ts"/>
class Sprite extends Widget {
    texture: Texture;

    constructor(texture: Texture) {
        super();
        this.texture = texture;
    }

    static fromImage(url: string): Sprite {
        return new Sprite(Texture.fromImage(url));
    }

    render(renderer: Renderer): void {
        renderer.renderTexture(this.texture, this.position.x, this.position.y);
        super.render(renderer);
    }
}