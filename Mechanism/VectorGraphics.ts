class VectorGraphics {
    constructor(private readonly canvas: CanvasRenderingContext2D) { }

    fillStyle(color: Color): VectorGraphics {
        this.canvas.fillStyle = color.toCssHex();
        return this;
    }

    strokeStyle(lineWidth: number, color?: Color): VectorGraphics {
        this.canvas.lineWidth = lineWidth;
        if (color) {
            this.canvas.strokeStyle = color.toCssHex();
        }
        return this;
    }

    drawRect(x: number, y: number, width: number, height: number): VectorGraphics {
        this.canvas.fillRect(x, y, width, height);
        this.canvas.strokeRect(x, y, width, height);
        return this;
    }

    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): VectorGraphics {
        const canvas = this.canvas;
        canvas.save();
        canvas.beginPath();
        canvas.moveTo(x, y + radius);
        canvas.lineTo(x, y + height - radius);
        canvas.quadraticCurveTo(x, y + height, x + radius, y + height);
        canvas.lineTo(x + width - radius, y + height);
        canvas.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        canvas.lineTo(x + width, y + radius);
        canvas.quadraticCurveTo(x + width, y, x + width - radius, y);
        canvas.lineTo(x + radius, y);
        canvas.quadraticCurveTo(x, y, x, y + radius);
        canvas.closePath();
        canvas.fill();
        canvas.stroke();
        canvas.restore();
        return this;
    }
}