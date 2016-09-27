/// <reference path="WaitPredicate.ts"/>
class Task {
    static current?: Task;
    private iterators: Iterator<any>[] = [];
    private waitTime = 0;
    private waitPredicate?: WaitPredicate;
    totalTime = 0;
    delta = 0;

    constructor(iterator: Iterator<any>) {
        this.iterators.push(iterator);
    }

    get completed() {
        return this.iterators.length === 0;
    }

    update(delta: number) {
        if (this.completed) return;
        this.delta = delta;
        this.totalTime += delta;
        const savedCurrent = Task.current;
        Task.current = this;
        this.processUpdate(delta);
        Task.current = savedCurrent;
    }

    private processUpdate(delta: number) {
        if (this.waitTime > 0) {
            this.waitTime -= delta;
            return;
        }
        if (this.waitPredicate) {
            this.waitPredicate.totalTime += delta;
            if (this.waitPredicate.evaluate()) return;
            this.waitPredicate = undefined;
        }
        const next = this.currentIterator.next();
        if (!next.done) {
            this.handleYieldedResult(next.value);
        } else {
            this.iterators.pop();
            // TODO: Maybe not?
            if (!this.completed)
                this.update(0);
        }
    }

    private handleYieldedResult(result: any) {
        if (result == null) {
            this.waitTime = 0;
            return;
        }
        if (typeof result === "number") {
            this.waitTime = result;
            return;
        }
        if (result instanceof RenderObject) {
            this.waitPredicate = Task.waitForAnimation(result);
            return;
        }
        if (result instanceof WaitPredicate) {
            this.waitPredicate = result;
            return;
        }
        const iterator = result as Iterator<any>;
        if (iterator.next) {
            this.iterators.push(iterator);
            // TODO: Maybe not?
            this.update(0);
            return;
        }
        throw `Invalid result yielded ${result}`;
    }

    private get currentIterator() {
        return this.iterators[this.iterators.length - 1];
    }

    static waitWhile(predicate: (totalTime: number) => boolean) {
        const waitPredicate = new BooleanWaitPredicate();
        waitPredicate.predicate = predicate;
        return waitPredicate;
    }

    static waitForAnimation(renderObject: RenderObject) {
        const waitPredicate = new AnimationWaitPredicate();
        waitPredicate.renderObject = renderObject;
        return waitPredicate;
    }

    stop() {
        while (this.iterators.length > 0) {
            this.iterators.pop()!.return!(true);
        }
    }
}