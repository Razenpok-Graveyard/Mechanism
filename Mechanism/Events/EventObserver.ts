class EventObserver<T extends Function> {
    fn: T;
    context: any;
    once: boolean;
    needRemoval: boolean;

    constructor(fn: T, context: any, once: boolean) {
        this.fn = fn;
        this.context = context;
        this.once = once;
    }

    execute(dispatcher: (fn: T) => void) {
        const fn = this.fn.bind(this.context) as T;
        dispatcher(fn);
        if (this.once)
            this.needRemoval = true;
    }
}