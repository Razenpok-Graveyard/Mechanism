class RelativeLinearLayout extends Widget {
    private orientation: Orientation;

    constructor(orientation: Orientation) {
        super();
        this.orientation = orientation;
    }

    render(renderer: Renderer): void {
        const parent = this.parent;
        let totalWidth = renderer.width;
        let totalHeight = renderer.height;
        if (parent && parent instanceof Widget) {
            totalWidth = parent.width;
            totalHeight = parent.height;
        }
        renderer.save();
        // TODO: cache results
        for (const child of this.children) {
            const element = child as IRelativeLinearLayoutElement;
            let scale: number;
            let scaledSide: number;
            switch (this.orientation) {
            case Orientation.Horizontal:
                scale = (element.sizeFactor * totalWidth) / element.width;
                scaledSide = scale * element.width;
                break;
            case Orientation.Vertical:
                scale = (element.sizeFactor * totalHeight) / element.height;
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

    addChild(container: Widget): IRelativeLinearLayoutElement {
        super.addChild(container);
        return container as IRelativeLinearLayoutElement;
    }
}

interface IRelativeLinearLayoutElement extends Widget {
    sizeFactor: number;
}