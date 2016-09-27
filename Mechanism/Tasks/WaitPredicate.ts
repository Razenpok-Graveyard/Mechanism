abstract class WaitPredicate {
    totalTime: number;
    abstract evaluate(): boolean;
}

class AnimationWaitPredicate extends WaitPredicate {
    renderObject: RenderObject;
    evaluate(): boolean { throw new Error("Not implemented"); }
}

class BooleanWaitPredicate extends WaitPredicate {
    predicate: (totalTime: number) => boolean;
    evaluate(): boolean { return this.predicate(this.totalTime); }
}