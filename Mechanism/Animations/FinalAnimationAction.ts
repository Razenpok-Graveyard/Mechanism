class FinalAnimationAction {
    animation: string;
    frame: number;

    constructor(frame: number = 0, animation: string = undefined) {
        this.animation = animation;
        this.frame = frame;
    }
}