interface Array<T> {
    last(filter?: (element: T, index: number) => boolean): T;
    lastOrDefault(filter?: (element: T, index: number) => boolean): T;
    first(filter?: (element: T, index: number) => boolean): T;
    firstOrDefault(filter?: (element: T, index: number) => boolean): T;
    any(): boolean;
}

if (!Array.prototype.last) {
    Array.prototype.last = function (filter?: (element: any, index: number) => boolean) {
        if (this.length === 0)
            throw "Array contains no elements";
        let last: any;
        if (filter) {
            const filtered = this.filter(filter);
            if (filtered.length === 0 )
                throw "Array contains no matching element";
            last = filtered[filtered.length - 1];
        }
        else
            last = this[this.length - 1];
        return last;
    };
};

if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function (filter?: (element: any, index: number) => boolean) {
        try {
            return this.last(filter);
        } catch (e) {
            return undefined;
        }
    };
};

if (!Array.prototype.first) {
    Array.prototype.first = function (filter?: (element: any, index: number) => boolean) {
        if (this.length === 0)
            throw "Array contains no elements";
        if (filter) {
            const filtered = this.filter(filter);
            if (filtered.length === 0 )
                throw "Array contains no matching element";
            return filtered[0];
        }
        return this[0];
    };
};

if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (filter?: (element: any, index: number) => boolean) {
        try {
            return this.first(filter);
        } catch (e) {
            return undefined;
        }
    };
};

if (!Array.prototype.any) {
    Array.prototype.any = function () {
        return this.length > 0;
    };
};