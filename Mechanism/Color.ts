class Color {
    private rgb: number;

    constructor(rgb: number) {
        this.rgb = rgb;
    }

    toHex(): string {
        let hex = this.rgb.toString(16);
        hex = "000000".substr(0, 6 - hex.length) + hex;
        return `#${hex}`;
    }

    static fromComponents(r: number, g: number, b: number): Color {
        return new Color((r << 16) + (g << 8) + b);
    }

    // TODO
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
    static black = new Color(0x000000);
    static red = new Color(0xff0000);
    static green = new Color(0x008000);
    static blue = new Color(0x0000ff);
}