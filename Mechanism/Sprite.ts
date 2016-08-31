class Sprite {
    texture: Texture;
    position = new Vector2();

    constructor(texture: Texture) {
        this.texture = texture;
    }

    static fromImage(url: string): Sprite {
        return new Sprite(Texture.fromImage(url));
    }
}