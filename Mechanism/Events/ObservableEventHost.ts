class ObservableEventHost<T extends Function> implements ObservableEvent<T> {
    private observers: EventObserver<T>[] = [];

    dispatch(dispatcher: (fn: T) => void) {
        // Go from end to start to prevent execution and removal of new events
        for (let i = this.observers.length - 1; i >= 0; i--) {
            this.observers[i].execute(dispatcher);
        }
        this.observers = this.observers.filter(value => !value.needsRemoval);
    }

    subscribe(fn: T, context?: any): void {
         this.addObserver(fn, context, false);
    }

    subscribeOnce(fn: T, context?: any): void {
         this.addObserver(fn, context, true);
    }

    private addObserver(fn: T, context: any, once: boolean) {
        if (!this.observers) {
            this.observers = [];
        }
        const observer = new EventObserver(fn, context, once);
        this.observers.push(observer);
    }

    remove(fn: T): void {
        if (!this.observers) {
            return;
        }
        this.observers = this.observers.filter(value => value.fn !== fn);
    }

    removeAll(): void {
         this.observers = [];
    }

    static create<T extends Function>() {
        return new ObservableEventHost<T>();
    }
}