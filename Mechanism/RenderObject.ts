class RenderObject {
    children: RenderObject[] = [];
    parent: RenderObject;

    addChild(container: RenderObject): void {
        this.children.push(container);
        container.parent = this;
    }

    removeChild(container: RenderObject): boolean {
        const index = this.children.indexOf(container);
        if (index === -1) return false;
        this.children.splice(index, 1);
        container.parent = null;
        return true;
    }

    render(renderer: Renderer) {
        for (let child of this.children) {
            child.render(renderer);
        }
    }
}