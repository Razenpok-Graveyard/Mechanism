var renderer: Renderer;
var sprite = Sprite.fromImage("assets/CaveManMenu0.png");
const speed = 5;
var velocity = new Vector2();
var directions: { [key: string]: Vector2 } = {
    ["ArrowLeft"]: new Vector2(-speed, 0),
    ["ArrowRight"]: new Vector2(speed, 0),
    ["ArrowUp"]: new Vector2(0, -speed),
    ["ArrowDown"]: new Vector2(0, speed)
};
var pressed: { [key: string]: boolean } = {};

var keyDown = (e: KeyboardEvent) => {
    if (pressed[e.key] || !directions[e.key]) return;
    pressed[e.key] = true;
    velocity = velocity.add(directions[e.key]);
};

var keyUp = (e: KeyboardEvent) => {
    if (!pressed[e.key] || !directions[e.key]) return;
    pressed[e.key] = false;
    velocity = velocity.subtract(directions[e.key]);
};

var startup = () => {
    renderer = new Renderer(800, 600);
    document.body.appendChild(renderer.view);
    document.body.addEventListener("keydown", keyDown);
    document.body.addEventListener("keyup", keyUp);
    window.requestAnimationFrame(render);
}

var render = () => {
    sprite.position.mutate().add(velocity);
    renderer.render(sprite);
    window.requestAnimationFrame(render);
}

window.onload = startup;