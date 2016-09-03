var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Application = (function () {
    function Application(width, height) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        this.fps = 0;
        this.time = 0;
        this.view = document.createElement("div");
        this.renderer = new Renderer(width, height);
        this.view.appendChild(this.renderer.view);
    }
    Application.prototype.run = function () {
        var _this = this;
        window.requestAnimationFrame(function (time) { return _this.firstRender(time); });
    };
    Application.prototype.firstRender = function (time) {
        this.time = time;
        this.render(time);
    };
    Application.prototype.render = function (time) {
        var _this = this;
        var delta = time - this.time;
        this.fps = (1 / delta) * 1000;
        if (this.root)
            this.renderer.render(this.root);
        else
            this.renderer.flush();
        this.time = time;
        window.requestAnimationFrame(function (time) { return _this.render(time); });
    };
    return Application;
}());
var Color = (function () {
    function Color(rgb) {
        this.rgb = rgb;
    }
    Color.prototype.toHex = function () {
        var hex = this.rgb.toString(16);
        hex = "000000".substr(0, 6 - hex.length) + hex;
        return "#" + hex;
    };
    Color.fromComponents = function (r, g, b) {
        return new Color((r << 16) + (g << 8) + b);
    };
    Color.black = new Color(0x000000);
    Color.red = new Color(0xff0000);
    Color.green = new Color(0x008000);
    Color.blue = new Color(0x0000ff);
    return Color;
}());
var Mechanism = (function () {
    function Mechanism() {
    }
    Mechanism.helloWorld = function () {
        console.debug("Mechanism " + this.version);
    };
    Mechanism.version = "1.0.0";
    return Mechanism;
}());
var Renderer = (function () {
    function Renderer(width, height) {
        var canvas = document.createElement("canvas");
        this.view = canvas;
        this.context = canvas.getContext("2d");
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Renderer.prototype, "width", {
        get: function () {
            return this.view.width;
        },
        set: function (value) {
            this.view.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "height", {
        get: function () {
            return this.view.height;
        },
        set: function (value) {
            this.view.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.render = function (renderObject) {
        this.flush();
        renderObject.render(this);
    };
    Renderer.prototype.renderTexture = function (texture, x, y) {
        this.context.drawImage(texture.source, x, y);
    };
    Renderer.prototype.translate = function (x, y) {
        this.context.translate(x, y);
    };
    Renderer.prototype.rotate = function (angle) {
        var radians = (Math.PI / 180) * angle;
        this.context.rotate(radians);
    };
    Renderer.prototype.flush = function () {
        this.context.save();
        if (this.backgroundColor) {
            this.context.fillStyle = this.backgroundColor.toHex();
            this.context.fillRect(0, 0, this.width, this.height);
        }
        else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        this.context.restore();
    };
    return Renderer;
}());
var RenderObject = (function () {
    function RenderObject() {
        this.children = [];
    }
    RenderObject.prototype.addChild = function (container) {
        this.children.push(container);
        container.parent = this;
    };
    RenderObject.prototype.removeChild = function (container) {
        var index = this.children.indexOf(container);
        if (index === -1)
            return false;
        this.children.splice(index, 1);
        container.parent = null;
        return true;
    };
    RenderObject.prototype.render = function (renderer) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.render(renderer);
        }
    };
    return RenderObject;
}());
var Widget = (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        _super.apply(this, arguments);
        this.position = new Vector2();
        this.rotation = 0;
    }
    Widget.prototype.render = function (renderer) {
        renderer.translate(this.position.x, this.position.y);
        renderer.rotate(this.rotation);
        _super.prototype.render.call(this, renderer);
        renderer.rotate(-this.rotation);
        renderer.translate(-this.position.x, -this.position.y);
    };
    return Widget;
}(RenderObject));
var Texture = (function () {
    function Texture(source) {
        this.source = source;
    }
    Texture.fromImage = function (url) {
        var image = new Image();
        var texture = new Texture(image);
        image.src = url;
        return texture;
    };
    return Texture;
}());
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(texture) {
        _super.call(this);
        this.texture = texture;
    }
    Sprite.fromImage = function (url) {
        return new Sprite(Texture.fromImage(url));
    };
    Sprite.prototype.render = function (renderer) {
        renderer.renderTexture(this.texture, this.position.x, this.position.y);
        _super.prototype.render.call(this, renderer);
    };
    return Sprite;
}(Widget));
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (value) {
        return new Vector2(this.x + value.x, this.y + value.y);
    };
    Vector2.prototype.subtract = function (value) {
        return new Vector2(this.x - value.x, this.y - value.y);
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.mutate = function () {
        return new Vector2Mutator(this);
    };
    return Vector2;
}());
var Vector2Mutator = (function () {
    function Vector2Mutator(vector) {
        this.origin = vector;
    }
    Vector2Mutator.prototype.add = function (value) {
        this.origin.x += value.x;
        this.origin.y += value.y;
        return this;
    };
    Vector2Mutator.prototype.subtract = function (value) {
        this.origin.x -= value.x;
        this.origin.y -= value.y;
        return this;
    };
    return Vector2Mutator;
}());
//# sourceMappingURL=mechanism.js.map