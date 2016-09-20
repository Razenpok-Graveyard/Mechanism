class AudioPlayer {
    view: HTMLDivElement;
    private audioElements: HTMLAudioElement[] = [];
    private freeAudioElements: HTMLAudioElement[] = [];

    constructor() {
        this.view = document.createElement("div");
    }

    play(source: string, loop: boolean = false) {
        let audioElement: HTMLAudioElement;
        if (this.freeAudioElements.length === 0)
            this.freeAudioElements = this.getFreeAudioElements();
        if (this.freeAudioElements.length === 0) {
            audioElement = document.createElement("audio");
            this.view.appendChild(audioElement);
        } else {
            audioElement = this.freeAudioElements.pop();
        }
        audioElement.src = source;
        audioElement.loop = loop;
        audioElement.play();
    }

    private getFreeAudioElements() {
        return this.audioElements.filter((value) => value.paused);
    }
}