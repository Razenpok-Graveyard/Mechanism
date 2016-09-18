class Animation {
    private animators: { [animatedPropertyName: string]: Animator; } = {};
    private currentFrame = 0;

    run(): void {
        this.currentFrame = 0;
    }

    setAnimator(animator: Animator) {
        this.animators[animator.getName()] = animator;
    }

    advance(frameCount: number, object: RenderObject) {
        const nextFrame = this.currentFrame + frameCount;
        const animators = this.animators;
        for (const animatorName in animators) {
            if (animators.hasOwnProperty(animatorName)) {
                animators[animatorName].apply(object, nextFrame);
            }
        }
        this.currentFrame = nextFrame;
    }
}