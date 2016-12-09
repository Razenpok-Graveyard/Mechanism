// TODO: This is pretty much Sprite with offsets (but different render) - we need to generalize them.
class NineGrid extends Widget {
    left = 0;
    right = 0;
    top = 0;
    bottom = 0;

    constructor(public texture?: Texture) {
        super();
    }

    render(renderer: Renderer): void {
        renderer.save();
        for (let part of this.getParts()) {
            renderer.renderTexture(this.texture,
                part.target.left, part.target.top, part.target.width, part.target.height,
                part.crop.left, part.crop.top, part.crop.width, part.crop.height);
        }
        renderer.restore();
        super.render(renderer);
    }

    private getParts() {
        let parts: { target: Rectangle; crop: Rectangle }[] = [];
        let textureSize: Vector2;
        if (this.texture) {
            textureSize = this.texture.size;
        }
        else {
            textureSize = this.size;
        }
        const innerCrop = new Rectangle(
            this.left,
            this.top,
            textureSize.x - this.right,
            textureSize.y - this.bottom);
        const cropMax = new Vector2(textureSize.x, textureSize.y);
        const innerTarget = new Rectangle(
            this.left,
            this.top,
            this.width - this.right,
            this.height - this.bottom);
        const targetMax = new Vector2(this.width, this.height);
        const getPart = (getCoordinates: (innerRect: Rectangle, max: Vector2) => Rectangle) => {
            return {
                target: getCoordinates(innerTarget, targetMax),
                crop: getCoordinates(innerCrop, cropMax)
            };
        };

        parts[0] = getPart((source, max) => new Rectangle(0, 0, source.left, source.top));
        parts[1] = getPart((source, max) => new Rectangle(source.left, 0, source.right, source.top));
        parts[2] = getPart((source, max) => new Rectangle(source.right, 0, max.x, source.left));
        parts[3] = getPart((source, max) => new Rectangle(0, source.top, source.left, source.bottom));
        parts[4] = getPart((source, max) => new Rectangle(source.left, source.top, source.right, source.bottom));
        parts[5] = getPart((source, max) => new Rectangle(source.right, source.top, max.x, source.bottom));
        parts[6] = getPart((source, max) => new Rectangle(0, source.bottom, source.left, max.y));
        parts[7] = getPart((source, max) => new Rectangle(source.left, source.bottom, source.right, max.y));
        parts[8] = getPart((source, max) => new Rectangle(source.right, source.bottom, max.x, max.y));

        parts = parts.filter(value => value.target.width > 0 && value.target.height > 0);

        return parts;
    }
}