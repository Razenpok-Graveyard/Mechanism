abstract class LayoutElement extends RenderObject implements ILayoutable {
    protected allocatedWidth: number;
    protected allocatedHeight: number;

    layout(width: number, height: number): void {
        this.allocatedWidth = width;
        this.allocatedHeight = height;
    }

    get width(): number {
        return this.allocatedWidth;
    }

    get height(): number {
        return this.allocatedHeight;
    }
}