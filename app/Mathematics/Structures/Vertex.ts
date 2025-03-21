export default class Vertex {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x?: number, y?: number, z?: number) {
        if (x) this.x = x;
        else this.x = 0;
        if (y) this.y = y;
        else this.y = 0;
        if (z) this.z = z;
        else this.z = 0;
    }

    public Copy(): Vertex {
        return new Vertex(this.x, this.y, this.z);
    }

    public Translate(v: Vertex): Vertex {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    public Add(v: Vertex): Vertex {
        return this.Translate(v);
    }

    public Substract(v: Vertex): Vertex {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    public Scale(v: Vertex): Vertex {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    public Scalar(value: number): Vertex {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    }

    public Rotate(angle: number): Vertex {
        return this.RotateZ(angle);
    }

    public RotateX(angle: number): Vertex {
        let oy: number = this.y;
        let oz: number = this.z;
        this.y = Math.cos((angle / 180) * Math.PI) * oy - Math.sin((angle / 180) * Math.PI) * oz;
        this.z = Math.cos((angle / 180) * Math.PI) * oz + Math.sin((angle / 180) * Math.PI) * oy;
        return this;
    }

    public RotateY(angle: number): Vertex {
        let ox: number = this.x;
        let oz: number = this.z;
        this.x = Math.cos((angle / 180) * Math.PI) * ox + Math.sin((angle / 180) * Math.PI) * oz;
        this.z = Math.cos((angle / 180) * Math.PI) * oz - Math.sin((angle / 180) * Math.PI) * ox;
        return this;
    }

    public RotateZ(angle: number): Vertex {
        let ox: number = this.x;
        let oy: number = this.y;
        this.x = Math.cos((angle / 180) * Math.PI) * ox - Math.sin((angle / 180) * Math.PI) * oy;
        this.y = Math.cos((angle / 180) * Math.PI) * oy + Math.sin((angle / 180) * Math.PI) * ox;
        return this;
    }

    public Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public Normalize(): Vertex {
        let divider: number = 1.0 / this.Length();
        this.Scalar(divider);
        return this;
    }

    public Absolute(): Vertex {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    public ToArray(): number[] {
        return [this.x, this.y, this.z];
    }

    public ToQuattroArray(w: number): number[] {
        return [this.x, this.y, this.z, w];
    }

    public Deserialize(data: any): void {
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
    }

    public Serialize(): any {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }

    // Static
    public static FromRGB(r: number, g: number, b: number): Vertex {
        return new Vertex((r * 1.0 + 1) / 256, (g * 1.0 + 1) / 256, (b * 1.0 + 1) / 256);
    }

    public static Cross(left: Vertex, right: Vertex): Vertex {
        return new Vertex(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
    }

    public static Distance(v1: Vertex, v2: Vertex): number {
        let v: Vertex = new Vertex(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        return v.Length();
    }

    private static CalculateAngle(v1: Vertex, v2: Vertex): number {
        let v1V: number = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        let v2V: number = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
        let up: number = (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
        let cos: number = up / (v1V * v2V);
        let angle = Math.asin(cos);
        angle = (angle / Math.PI) * 180.0;
        if (v1.x > v2.x) angle = 180 - angle;
        if (angle < 0) angle += 360;
        return angle;
    }

    public static Angle(v1: Vertex, v2: Vertex): number {
        return Vertex.CalculateAngle(new Vertex(0, 1, 0), new Vertex(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z));
    }
}
