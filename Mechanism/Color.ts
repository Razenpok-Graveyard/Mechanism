class Color {
    private readonly hex: string;

    constructor(color: number | string) {
        if (typeof color === "number") {
            this.hex = color.toString(16);
        } else {
            this.hex = color;
        }
    }

    get r(): number {
        return parseInt(this.hex.substring(0, 2), 16);
    }

    get g(): number {
        return parseInt(this.hex.substring(2, 4), 16);
    }

    get b(): number {
        return parseInt(this.hex.substring(4, 6), 16);
    }

    toHex(): string {
        return this.hex;
    }

    toCssHex(): string {
        const hex = "000000".substr(0, 6 - this.hex.length) + this.hex;
        return `#${hex}`;
    }

    toInt(): number {
        return parseInt(this.hex, 16);
    }

    static fromComponents(r: number, g: number, b: number): Color {
        return new Color((r << 16) + (g << 8) + b);
    }

    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

    // CSS Level 1
    static black = new Color(0x000000);
    static silver = new Color(0xc0c0c0);
    static gray = new Color(0x808080);
    static white = new Color(0xffffff);
    static maroon = new Color(0x800000);
    static red = new Color(0xff0000);
    static purple = new Color(0x800080);
    static fuchsia = new Color(0xff00ff);
    static green = new Color(0x008000);
    static lime = new Color(0x00ff00);
    static olive = new Color(0x808000);
    static yellow = new Color(0xffff00);
    static navy = new Color(0x000080);
    static blue = new Color(0x0000ff);
    static teal = new Color(0x008080);
    static aqua = new Color(0x00ffff);

    // CSS Level 2
    static orange = new Color(0xffa500);

    // CSS Level 3
    static aliceblue = new Color(0xf0f8ff);
    static antiquewhite = new Color(0xfaebd7);
    static aquamarine = new Color(0x7fffd4);
    static azure = new Color(0xf0ffff);
    static beige = new Color(0xf5f5dc);
    static bisque = new Color(0xffe4c4);
    static blanchedalmond = new Color(0xffebcd);
    static blueviolet = new Color(0x8a2be2);
    static brown = new Color(0xa52a2a);
    static burlywood = new Color(0xdeb887);
    static cadetblue = new Color(0x5f9ea0);
    static chartreuse = new Color(0x7fff00);
    static chocolate = new Color(0xd2691e);
    static coral = new Color(0xff7f50);
    static cornflowerblue = new Color(0x6495ed);
    static cornsilk = new Color(0xfff8dc);
    static crimson = new Color(0xdc143c);
    static darkblue = new Color(0x00008b);
    static darkcyan = new Color(0x008b8b);
    static darkgoldenrod = new Color(0xb8860b);
    static darkgray = new Color(0xa9a9a9);
    static darkgreen = new Color(0x006400);
    static darkgrey = new Color(0xa9a9a9);
    static darkkhaki = new Color(0xbdb76b);
    static darkmagenta = new Color(0x8b008b);
    static darkolivegreen = new Color(0x556b2f);
    static darkorange = new Color(0xff8c00);
    static darkorchid = new Color(0x9932cc);
    static darkred = new Color(0x8b0000);
    static darksalmon = new Color(0xe9967a);
    static darkseagreen = new Color(0x8fbc8f);
    static darkslateblue = new Color(0x483d8b);
    static darkslategray = new Color(0x2f4f4f);
    static darkslategrey = new Color(0x2f4f4f);
    static darkturquoise = new Color(0x00ced1);
    static darkviolet = new Color(0x9400d3);
    static deeppink = new Color(0xff1493);
    static deepskyblue = new Color(0x00bfff);
    static dimgray = new Color(0x696969);
    static dimgrey = new Color(0x696969);
    static dodgerblue = new Color(0x1e90ff);
    static firebrick = new Color(0xb22222);
    static floralwhite = new Color(0xfffaf0);
    static forestgreen = new Color(0x228b22);
    static gainsboro = new Color(0xdcdcdc);
    static ghostwhite = new Color(0xf8f8ff);
    static gold = new Color(0xffd700);
    static goldenrod = new Color(0xdaa520);
    static greenyellow = new Color(0xadff2f);
    static grey = new Color(0x808080);
    static honeydew = new Color(0xf0fff0);
    static hotpink = new Color(0xff69b4);
    static indianred = new Color(0xcd5c5c);
    static indigo = new Color(0x4b0082);
    static ivory = new Color(0xfffff0);
    static khaki = new Color(0xf0e68c);
    static lavender = new Color(0xe6e6fa);
    static lavenderblush = new Color(0xfff0f5);
    static lawngreen = new Color(0x7cfc00);
    static lemonchiffon = new Color(0xfffacd);
    static lightblue = new Color(0xadd8e6);
    static lightcoral = new Color(0xf08080);
    static lightcyan = new Color(0xe0ffff);
    static lightgoldenrodyellow = new Color(0xfafad2);
    static lightgray = new Color(0xd3d3d3);
    static lightgreen = new Color(0x90ee90);
    static lightgrey = new Color(0xd3d3d3);
    static lightpink = new Color(0xffb6c1);
    static lightsalmon = new Color(0xffa07a);
    static lightseagreen = new Color(0x20b2aa);
    static lightskyblue = new Color(0x87cefa);
    static lightslategray = new Color(0x778899);
    static lightslategrey = new Color(0x778899);
    static lightsteelblue = new Color(0xb0c4de);
    static lightyellow = new Color(0xffffe0);
    static limegreen = new Color(0x32cd32);
    static linen = new Color(0xfaf0e6);
    static mediumaquamarine = new Color(0x66cdaa);
    static mediumblue = new Color(0x0000cd);
    static mediumorchid = new Color(0xba55d3);
    static mediumpurple = new Color(0x9370db);
    static mediumseagreen = new Color(0x3cb371);
    static mediumslateblue = new Color(0x7b68ee);
    static mediumspringgreen = new Color(0x00fa9a);
    static mediumturquoise = new Color(0x48d1cc);
    static mediumvioletred = new Color(0xc71585);
    static midnightblue = new Color(0x191970);
    static mintcream = new Color(0xf5fffa);
    static mistyrose = new Color(0xffe4e1);
    static moccasin = new Color(0xffe4b5);
    static navajowhite = new Color(0xffdead);
    static oldlace = new Color(0xfdf5e6);
    static olivedrab = new Color(0x6b8e23);
    static orangered = new Color(0xff4500);
    static orchid = new Color(0xda70d6);
    static palegoldenrod = new Color(0xeee8aa);
    static palegreen = new Color(0x98fb98);
    static paleturquoise = new Color(0xafeeee);
    static palevioletred = new Color(0xdb7093);
    static papayawhip = new Color(0xffefd5);
    static peachpuff = new Color(0xffdab9);
    static peru = new Color(0xcd853f);
    static pink = new Color(0xffc0cb);
    static plum = new Color(0xdda0dd);
    static powderblue = new Color(0xb0e0e6);
    static rosybrown = new Color(0xbc8f8f);
    static royalblue = new Color(0x4169e1);
    static saddlebrown = new Color(0x8b4513);
    static salmon = new Color(0xfa8072);
    static sandybrown = new Color(0xf4a460);
    static seagreen = new Color(0x2e8b57);
    static seashell = new Color(0xfff5ee);
    static sienna = new Color(0xa0522d);
    static skyblue = new Color(0x87ceeb);
    static slateblue = new Color(0x6a5acd);
    static slategray = new Color(0x708090);
    static slategrey = new Color(0x708090);
    static snow = new Color(0xfffafa);
    static springgreen = new Color(0x00ff7f);
    static steelblue = new Color(0x4682b4);
    static tan = new Color(0xd2b48c);
    static thistle = new Color(0xd8bfd8);
    static tomato = new Color(0xff6347);
    static turquoise = new Color(0x40e0d0);
    static violet = new Color(0xee82ee);
    static wheat = new Color(0xf5deb3);
    static whitesmoke = new Color(0xf5f5f5);
    static yellowgreen = new Color(0x9acd32);

    // CSS Level 4
    static rebeccapurple = new Color(0xffa500);
}