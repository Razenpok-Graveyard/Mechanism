class NotImplementedError implements Error {
    name = "NotImplementedError";
    message: string;

    constructor(message = "Not implemented") {
        this.message = message!;
    }
}