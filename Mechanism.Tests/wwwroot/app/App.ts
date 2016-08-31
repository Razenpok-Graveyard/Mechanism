var renderer: Renderer;

var keyDown = () => {
    renderer.render();
    document.body.removeEventListener("keydown", keyDown);
};

var startup = () => {
    renderer = new Renderer();
    document.body.appendChild(renderer.view);
    document.body.addEventListener("keydown", keyDown);
}

window.onload = startup;