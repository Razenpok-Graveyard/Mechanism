class Texture {
    source: HTMLImageElement;

    constructor(source: HTMLImageElement = undefined) {
        this.source = source;
    }

    static fromImage(url: string): Texture {
        const image = new Image();
        const texture = new Texture(image);
        image.src = url;
        image.onerror = () => { texture.source = undefined };
        return texture;
    }

    get width(): number {
        return this.source.naturalWidth;
    }

    get height(): number {
        return this.source.naturalHeight;
    }
}