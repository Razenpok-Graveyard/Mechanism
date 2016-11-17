class EventObserver<T extends Function> {
    needsRemoval: boolean;

    constructor(public fn: T, public context: any, public once: boolean) { }

    execute(dispatcher: (fn: T) => void) {
        const fn = this.fn.bind(this.context) as T;
        dispatcher(fn);
        this.needsRemoval = this.once;
    }
}