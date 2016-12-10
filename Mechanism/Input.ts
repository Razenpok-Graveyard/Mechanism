class Input {
    private previousKeyState: boolean[] = [];
    private currentKeyState: boolean[] = [];
    private keyEventQueue: { key: Key, down: boolean }[] = [];

    isKeyPressed(key: Key) {
        return this.currentKeyState[key];
    }

    wasKeyPressed(key: Key) {
        return this.currentKeyState[key] && !this.previousKeyState[key];
    }

    wasKeyReleased(key: Key) {
        return !this.currentKeyState[key] && this.previousKeyState[key];
    }

    addKeyEvent(key: Key, down: boolean) {
        this.keyEventQueue.push({ key: key, down: down });
    }

    processPendingKeyEvents() {
        let keyEventQueue = this.keyEventQueue;
        this.keyEventQueue = [];
        keyEventQueue = keyEventQueue.reverse();
        this.previousKeyState = this.currentKeyState.slice();
        while (keyEventQueue.length > 0) {
            const event = keyEventQueue.pop()!;
            this.currentKeyState[event.key] = event.down;
        }
    }
}