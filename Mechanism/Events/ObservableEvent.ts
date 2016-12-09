interface ObservableEvent<T extends Function> {
    subscribe(fn: T, context?: any): void;
    subscribeOnce(fn: T, context?: any): void;
    remove(fn: T): void;
    removeAll(): void;
}