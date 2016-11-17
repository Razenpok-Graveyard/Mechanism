class AnimationCollection {
    private animations: { [name: string]: Animation; } = { };

    set(name: string, animation: Animation): void {
        if (this.animations.hasOwnProperty(name)) {
            throw "Animation with this name has been added already";
        }
        this.animations[name] = animation;
    }

    get(name: string): Animation {
        if (!this.animations.hasOwnProperty(name)) {
            throw "Animation with this name hasn't been added";
        }
        return this.animations[name];
    }

    tryGet(name: string): Animation {
         return this.animations[name];
    }
}