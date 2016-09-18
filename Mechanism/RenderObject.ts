/// <reference path="Animations/AnimationCollection.ts"/>
/// <reference path="NotImplementedError.ts"/>
class RenderObject {
    children: RenderObject[] = [];
    parent: RenderObject;
    animations = new AnimationCollection();
    private currentAnimation: Animation;

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
            renderer.render(child);
        }
    }

    beforeRender(renderer: Renderer) { }

    afterRender(renderer: Renderer) { }

    update() {
        this.currentAnimation.advance(1, this);
    }

    runAnimation(name: string) {
        this.currentAnimation = this.animations.get(name);
        this.currentAnimation.run();
    }

    runChildAnimation(name: string) {
        throw new NotImplementedError();
    }
}