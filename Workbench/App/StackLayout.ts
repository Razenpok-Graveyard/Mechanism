class StackLayout extends LayoutElement {
    private orientation: Orientation;
    children: IStackElement[];

    constructor(orientation: Orientation) {
        super();
        this.orientation = orientation;
    }

    render(renderer: Renderer): void {
        renderer.save();
        let offset = 0;
        for (const child of this.children) {
            if (offset > this.maximumExtent)
                break;
            child.render(renderer);
            switch (this.orientation) {
                case Orientation.Horizontal:
                    renderer.translate(child.sizeRequest, 0);
                    break;
                case Orientation.Vertical:
                    renderer.translate(0, child.sizeRequest);
                    break;
                default:
                    throw "Unknown orientation";
            }
            offset += child.sizeRequest;
        }
        renderer.restore();
    }

    layout(width: number, height: number): void {
        super.layout(width, height);
        let offset = 0;
        for (const child of this.children) {
            if (offset > this.maximumExtent)
                break;
            let sizeRequest = child.sizeRequest;
            const totalExtent = offset + sizeRequest;
            if (totalExtent > this.maximumExtent)
                sizeRequest -= (totalExtent - this.maximumExtent);
            switch (this.orientation) {
                case Orientation.Horizontal:
                    child.layout(sizeRequest, height);
                    break;
                case Orientation.Vertical:
                    child.layout(width, sizeRequest);
                    break;
                default:
                    throw "Unknown orientation";
            }
            offset += child.sizeRequest;
        }
    }

    addChild(widget: ILayoutable): IStackElement {
        super.addChild(widget);
        return widget as IStackElement;
    }

    private get maximumExtent(): number {
        switch (this.orientation) {
            case Orientation.Horizontal:
                return this.allocatedWidth;
            case Orientation.Vertical:
                return this.allocatedHeight;
            default:
                throw "Unknown orientation";
        }
    }
}