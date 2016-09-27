class Texture {
    source?: HTMLImageElement;

    constructor(source?: HTMLImageElement) {
        this.source = source;
    }

    static fromImage(url: string): Texture {
        const image = new Image();
        const texture = new Texture(image);
        image.src = url;
        image.onerror = () => { texture.source = undefined };
        return texture;
    }

    get size(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    get width(): number {
        return this.source ? this.source.naturalWidth : 0;
    }

    get height(): number {
        return this.source ? this.source.naturalHeight : 0;
    }
}