///<reference path="Widget.ts"/>
///<reference path="Texture.ts"/>
class Sprite extends Widget {
    texture: Texture;

    constructor(texture: Texture = undefined) {
        super();
        this.texture = texture;
    }

    static fromImage(url: string): Sprite {
        return new Sprite(Texture.fromImage(url));
    }

    render(renderer: Renderer): void {
        renderer.renderTexture(this.texture, 0, 0, this.size.x, this.size.y);
        super.render(renderer);
    }

    static textureAnimator = () => new GenericAnimator<Sprite, Texture>("texture");
}