var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
window.onload = function () {
    editor = new Editor();
    document.body.appendChild(editor.view);
    editor.run();
};
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        var _this = this;
        _super.call(this);
        this.resized = false;
        this.renderer.backgroundColor = Color.black;
        this.fitRendererInWindow();
        window.onresize = function () { return _this.resized = true; };
    }
    Editor.prototype.render = function (time) {
        if (this.resized) {
            this.fitRendererInWindow();
            this.resized = false;
        }
        _super.prototype.render.call(this, time);
    };
    Editor.prototype.fitRendererInWindow = function () {
        this.renderer.width = document.documentElement.clientWidth;
        this.renderer.height = document.documentElement.clientHeight;
    };
    return Editor;
}(Application));
//# sourceMappingURL=app.js.map