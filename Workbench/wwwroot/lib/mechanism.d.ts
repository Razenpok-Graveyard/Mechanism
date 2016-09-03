declare class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    fps: number;
    private time;
    constructor(width?: number, height?: number);
    run(): void;
    private firstRender(time);
    render(time: number): void;
}
declare class Color {
    private rgb;
    constructor(rgb: number);
    toHex(): string;
    static fromComponents(r: number, g: number, b: number): Color;
    static black: Color;
    static red: Color;
    static green: Color;
    static blue: Color;
}
declare class Mechanism {
    static version: string;
    static helloWorld(): void;
}
declare class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    private context;
    constructor(width: number, height: number);
    width: number;
    height: number;
    render(renderObject: RenderObject): void;
    renderTexture(texture: Texture, x: number, y: number): void;
    translate(x: number, y: number): void;
    rotate(angle: number): void;
    flush(): void;
}
declare class RenderObject {
    children: RenderObject[];
    parent: RenderObject;
    addChild(container: RenderObject): void;
    removeChild(container: RenderObject): boolean;
    render(renderer: Renderer): void;
}
declare class Widget extends RenderObject {
    position: Vector2;
    rotation: number;
    render(renderer: Renderer): void;
}
declare class Texture {
    source: HTMLImageElement;
    constructor(source: HTMLImageElement);
    static fromImage(url: string): Texture;
}
declare class Sprite extends Widget {
    texture: Texture;
    constructor(texture: Texture);
    static fromImage(url: string): Sprite;
    render(renderer: Renderer): void;
}
declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(value: Vector2): Vector2;
    subtract(value: Vector2): Vector2;
    clone(): Vector2;
    mutate(): Vector2Mutator;
}
declare class Vector2Mutator {
    private origin;
    constructor(vector: Vector2);
    add(value: Vector2): Vector2Mutator;
    subtract(value: Vector2): Vector2Mutator;
}
