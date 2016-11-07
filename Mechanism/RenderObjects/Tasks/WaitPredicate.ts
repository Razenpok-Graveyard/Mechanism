abstract class WaitPredicate {
    totalTime = 0;
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

class TimeWaitPredicate extends WaitPredicate {
    waitTime = 0;
    evaluate(): boolean { return this.totalTime >= this.waitTime; }
}

class TaskWaitPredicate extends WaitPredicate {
    task: Task;
    evaluate(): boolean { return this.task.completed; }
}

class FrameWaitPredicate extends WaitPredicate {
    evaluate(): boolean { return true; }
}