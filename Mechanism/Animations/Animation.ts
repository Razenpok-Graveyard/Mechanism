class Animation {
    private animators: { [animatedPropertyName: string]: Animator } = {} as any;
    private currentFrame = 0;
    finalAction: FinalAnimationAction;
    frameCount: number;

    constructor(frameCount: number) {
        this.frameCount = frameCount;
    }

    run(frame: number = 0): void {
        this.currentFrame = frame!;
    }

    setAnimator(animator: Animator) {
        this.animators[animator.name] = animator;
    }

    advance(frameCount: number, object: RenderObject): FinalAnimationAction | undefined {
        const nextFrame = this.currentFrame + frameCount;
        const animators = this.animators;
        for (const animatorName in animators) {
            if (animators.hasOwnProperty(animatorName)) {
                animators[animatorName].apply(object, nextFrame);
            }
        }
        this.currentFrame = nextFrame;
        if (this.frameCount === nextFrame)
            return this.finalAction;
        return undefined;
    }

    static loop(frame: number = 0): FinalAnimationAction {
        return new FinalAnimationAction(frame!);
    }

    static goto(frame: number = 0, animation: string): FinalAnimationAction {
        return new FinalAnimationAction(frame!, animation);
    }
}