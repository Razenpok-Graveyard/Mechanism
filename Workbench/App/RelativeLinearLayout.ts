class RelativeLinearLayout extends RenderObject2D {
    private orientation: Orientation;
    private currentWidth: number;
    private currentHeight: number;

    constructor(orientation: Orientation) {
        super();
        this.orientation = orientation;
    }

    render(renderer: Renderer): void {
        const parent = this.parent;
        this.currentWidth = renderer.width;
        this.currentHeight = renderer.height;
        if (parent && parent instanceof RenderObject2D) {
            this.currentWidth = parent.width;
            this.currentHeight = parent.height;
        }
        renderer.save();
        // TODO: cache results
        for (const child of this.children) {
            const element = child as IRelativeLinearLayoutElement;
            let scale: number;
            let scaledSide: number;
            switch (this.orientation) {
            case Orientation.Horizontal:
                scale = (element.sizeFactor * this.currentWidth) / element.width;
                scaledSide = scale * element.width;
                break;
            case Orientation.Vertical:
                scale = (element.sizeFactor * this.currentHeight) / element.height;
                scaledSide = scale * element.height;
                break;
            default:
                throw "Unknown orientation";
            }
            renderer.save();
            renderer.scale(scale, scale);
            child.render(renderer);
            renderer.restore();
            switch (this.orientation) {
            case Orientation.Horizontal:
                renderer.translate(scaledSide, 0);
                break;
            case Orientation.Vertical:
                renderer.translate(0, scaledSide);
                break;
            default:
                throw "Unknown orientation";
            }
        }
        renderer.restore();
    }

    addChild(container: RenderObject2D): IRelativeLinearLayoutElement {
        super.addChild(container);
        return container as IRelativeLinearLayoutElement;
    }

    get width(): number {
        return this.currentWidth;
    }

    get height(): number {
        return this.currentHeight;
    }
}