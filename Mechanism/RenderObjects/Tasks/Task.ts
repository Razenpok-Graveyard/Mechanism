class Task {
    static current?: Task;
    private iterator?: Iterator<WaitPredicate>;
    private waitPredicate?: WaitPredicate;
    totalTime = 0;
    delta = 0;

    constructor(iterator: Iterator<WaitPredicate>) {
        this.iterator = iterator;
    }

    get completed() {
        return this.iterator === undefined;
    }

    update(delta: number) {
        if (!this.iterator) return;
        this.delta = delta;
        this.totalTime += delta;
        const savedCurrent = Task.current;
        Task.current = this;
        const predicate = this.waitPredicate;
        if (predicate) {
            predicate.totalTime += delta;
            if (predicate instanceof TaskWaitPredicate) {
                predicate.task.update(delta);
            }
            if (predicate.evaluate()) {
                this.waitPredicate = undefined;
            } else {
                Task.current = savedCurrent;
                return;
            }
        }
        const next = this.iterator.next();
        if (next.done)
            this.iterator = undefined;
        else
            this.waitPredicate = next.value;
        Task.current = savedCurrent;
    }

    private processWaitPredicate(delta: number): boolean {
        const predicate = this.waitPredicate;
        if (!predicate) return false;
        predicate.totalTime += delta;
        if (predicate instanceof TaskWaitPredicate) {
            predicate.task.update(delta);
        }
        const predicateCompleted = predicate.evaluate();
        if (predicateCompleted)
            this.waitPredicate = undefined;
        return !predicateCompleted;
    }

    stop() {
        this.iterator = undefined;
    }

    static *sinMotion(timePeriod: number, from: number, to: number) {
        for (let t of this.motion(timePeriod, from, to, fraction => Math.sin(fraction * Math.HALFPI))) {
            yield t;
        }
    }

    static *sqrtMotion(timePeriod: number, from: number, to: number) {
        for (let t of this.motion(timePeriod, from, to, fraction => Math.sqrt(fraction))) {
            yield t;
        }
    }

    static *linearMotion(timePeriod: number, from: number, to: number) {
        for (let t of this.motion(timePeriod, from, to, fraction => fraction)) {
            yield t;
        }
    }

    static *motion(timePeriod: number, from: number, to: number, fn: (fraction: number) => number) {
        for (let t = 0; t < timePeriod; t += Task.current!.delta)
            yield Math.lerp(fn(t / timePeriod), from, to);
        yield to;
    }
}