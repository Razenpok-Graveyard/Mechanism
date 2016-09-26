/// <reference path="EventObserver.ts"/>
class ObservableEvent<T extends Function> implements IObservableEvent<T> {
    private observers: EventObserver<T>[] = [];

    dispatch(dispatcher: (fn: T) => void) {
        for (let i = this.observers.length - 1; i >= 0; i--) {
            this.observers[i].execute(dispatcher);
        }
        this.observers = this.observers.filter(value => !value.needRemoval);
    }

    subscribe(fn: T, context?: any): void {
        this.addObserver(fn, context, false);
    }

    subscribeOnce(fn: T, context?: any): void {
        this.addObserver(fn, context, true);
    }

    private addObserver(fn: T, context: any, once: boolean) {
        if (!this.observers)
            this.observers = [];
        const observer = new EventObserver(fn, context, once);
        this.observers.push(observer);
    }

    remove(fn: T): void {
        if (!this.observers) return;
        this.observers = this.observers.filter(value => value.fn !== fn);
    }

    removeAll(): void {
        this.observers = [];
    }
}