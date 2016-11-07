class Wait {
    static seconds(seconds: number) {
        const waitPredicate = new TimeWaitPredicate();
        waitPredicate.waitTime = seconds;
        return waitPredicate;
    }

    static frame() {
        return new FrameWaitPredicate();
    }

    static task(task: Iterator<WaitPredicate>) {
        const waitPredicate = new TaskWaitPredicate();
        waitPredicate.task = new Task(task);
        return waitPredicate;
    }

    static while(predicate: (totalTime: number) => boolean) {
        const waitPredicate = new BooleanWaitPredicate();
        waitPredicate.predicate = predicate;
        return waitPredicate;
    }

    static animation(renderObject: RenderObject) {
        const waitPredicate = new AnimationWaitPredicate();
        waitPredicate.renderObject = renderObject;
        return waitPredicate;
    }
}