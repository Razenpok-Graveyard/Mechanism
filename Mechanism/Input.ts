class Input {
    private previousKeyState: boolean[] = [];
    private currentKeyState: boolean[] = [];
    private keyEventQueue: { key: Key, down: boolean }[] = [];

    isKeyPressed(key: Key) { return this.currentKeyState[key]; }

    wasKeyPressed(key: Key) { return this.currentKeyState[key] && !this.previousKeyState[key]; }

    wasKeyReleased(key: Key) { return !this.currentKeyState[key] && this.previousKeyState[key]; }

    addKeyEvent(key: Key, down: boolean) {
        this.keyEventQueue.push({ key: key, down: down });
    }

    processPendingKeyEvents() {
        this.previousKeyState = this.currentKeyState.slice();
        while (this.keyEventQueue.length > 0) {
            const event = this.keyEventQueue.pop()!;
            this.currentKeyState[event.key] = event.down;
        }
    }
}