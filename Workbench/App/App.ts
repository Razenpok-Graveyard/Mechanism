/// <reference path="Editor.ts"/>
var editor: Editor;
window.onload = () => {
    editor = new Editor();
    document.body.appendChild(editor.view);
    editor.run();
}