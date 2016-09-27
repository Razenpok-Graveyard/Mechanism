class FinalAnimationAction {
    animation?: string;
    frame: number;

    constructor(frame: number, animation?: string) {
        this.animation = animation;
        this.frame = frame;
    }
}