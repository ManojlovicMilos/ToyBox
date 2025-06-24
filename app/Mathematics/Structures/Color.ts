const COLOR_VALUE_MIN = 0;
const COLOR_VALUE_MAX = 255;
const COLOR_VALUE_RANGE = 256;
const MODIFY_DEFAULT_AMOUNT = 20;

export default class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public constructor() {
        this.r = COLOR_VALUE_MAX;
        this.g = COLOR_VALUE_MAX;
        this.b = COLOR_VALUE_MAX;
        this.a = COLOR_VALUE_MAX;
    }

    public duplicate(): Color {
        return Color.FromRGBA(this.r, this.g, this.b, this.a);
    }

    public lighten(amount: number = MODIFY_DEFAULT_AMOUNT): Color {
        this.r += amount;
        if (this.r > COLOR_VALUE_MAX) this.r = COLOR_VALUE_MAX;
        this.g += amount;
        if (this.g > COLOR_VALUE_MAX) this.g = COLOR_VALUE_MAX;
        this.b += amount;
        if (this.b > COLOR_VALUE_MAX) this.b = COLOR_VALUE_MAX;
        return this;
    }

    public darken(amount: number = MODIFY_DEFAULT_AMOUNT): Color {
        this.r -= amount;
        if (this.r < COLOR_VALUE_MIN) this.r = COLOR_VALUE_MIN;
        this.g -= amount;
        if (this.g < COLOR_VALUE_MIN) this.g = COLOR_VALUE_MIN;
        this.b -= amount;
        if (this.b < COLOR_VALUE_MIN) this.b = COLOR_VALUE_MIN;
        return this;
    }

    public toArray(): number[] {
        return [
            (this.r * 1.0 + 1) / COLOR_VALUE_RANGE,
            (this.g * 1.0 + 1) / COLOR_VALUE_RANGE,
            (this.b * 1.0 + 1) / COLOR_VALUE_RANGE,
            (this.a * 1.0 + 1) / COLOR_VALUE_RANGE,
        ];
    }

    public toString(): string {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + ((this.a * 1.0 + 1) / COLOR_VALUE_RANGE) + ")";
    }

    // Static
    public static empty: Color = Color.FromRGBA(0, 0, 0, 0);
    public static black: Color = Color.FromRGBA(0, 0, 0, 255);
    public static white: Color = Color.FromRGBA(255, 255, 255, 255);
    public static aqua: Color = Color.FromRGBA(0, 255, 255, 255);
    public static teal: Color = Color.FromRGBA(0, 128, 255, 255);
    public static blue: Color = Color.FromRGBA(0, 0, 255, 255);
    public static navy: Color = Color.FromRGBA(0, 0, 128, 255);
    public static yellow: Color = Color.FromRGBA(255, 255, 0, 255);
    public static olive: Color = Color.FromRGBA(128, 128, 0, 255);
    public static lime: Color = Color.FromRGBA(0, 255, 0, 255);
    public static green: Color = Color.FromRGBA(0, 128, 0, 255);
    public static fuchsia: Color = Color.FromRGBA(255, 0, 255, 255);
    public static purple: Color = Color.FromRGBA(128, 0, 128, 255);
    public static red: Color = Color.FromRGBA(255, 0, 0, 255);
    public static maroon: Color = Color.FromRGBA(128, 0, 0, 255);

    public static FromRGBA(r: number, g: number, b: number, a: number): Color {
        let newColor: Color = new Color();
        newColor.r = r;
        newColor.g = g;
        newColor.b = b;
        newColor.a = a;
        return newColor;
    }

    public static FromString(colorString: string): Color {
        let r: number = 0;
        let g: number = 0;
        let b: number = 0;
        let a: number = COLOR_VALUE_MAX;
        if (colorString.indexOf('#') === 0) {
            colorString = colorString.substr(1);
            if (colorString.length == 3) {
                r = parseInt(colorString[0] + colorString[0], 16);
                g = parseInt(colorString[1] + colorString[1], 16);
                b = parseInt(colorString[2] + colorString[2], 16);
            }
            else {
                r = parseInt(colorString.substr(0, 2), 16);
                g = parseInt(colorString.substr(2, 2), 16);
                b = parseInt(colorString.substr(4, 2), 16);
            }
            return Color.FromRGBA(r, g, b, COLOR_VALUE_MAX);
        }
        else if (colorString.indexOf('rgb') === 0) {
            let rgba = colorString.match(/\d+(\.\d+)?/g);
            r = parseInt(rgba[0]);
            g = parseInt(rgba[1]);
            b = parseInt(rgba[2]);
            if (rgba.length > 3) a = parseFloat(rgba[3]) * COLOR_VALUE_RANGE - 1;
            else a = COLOR_VALUE_MAX;
            if (a < 0) a = 0;
            return Color.FromRGBA(r, g, b, a);
        }
        else if (colorString.toUpperCase() == "EMPTY") return Color.empty;
        else if (colorString.toUpperCase() == "BLACK") return Color.black;
        else if (colorString.toUpperCase() == "WHITE") return Color.white;
        else if (colorString.toUpperCase() == "AQUA") return Color.aqua;
        else if (colorString.toUpperCase() == "TEAL") return Color.teal;
        else if (colorString.toUpperCase() == "BLUE") return Color.blue;
        else if (colorString.toUpperCase() == "NAVY") return Color.navy;
        else if (colorString.toUpperCase() == "YELLOW") return Color.yellow;
        else if (colorString.toUpperCase() == "OLIVE") return Color.olive;
        else if (colorString.toUpperCase() == "LIME") return Color.lime;
        else if (colorString.toUpperCase() == "GREEN") return Color.green;
        else if (colorString.toUpperCase() == "FUCHSIA") return Color.fuchsia;
        else if (colorString.toUpperCase() == "PURPLE") return Color.purple;
        else if (colorString.toUpperCase() == "RED") return Color.red;
        else if (colorString.toUpperCase() == "MAROON") return Color.maroon;
        else return Color.empty;
    }

    public static Blend(color1: Color, color2: Color, ratio: number): Color {
        let newColor: Color = Color.black;
        newColor.r = Math.floor((1 - ratio) * color1.r + ratio * color2.r);
        newColor.g = Math.floor((1 - ratio) * color1.g + ratio * color2.g);
        newColor.b = Math.floor((1 - ratio) * color1.b + ratio * color2.b);
        return newColor;
    }
}
