import Axis from "./Axis";

export default class Matrix {
    public fields: number[];

    public constructor(fields?: number[]) {
        if (fields != null) {
            this.fields = fields;
        }
        else {
            this.fields = Matrix.CreateIdentity();
        }
    }

    public Copy(): Matrix {
        return new Matrix(this.fields);
    }

    public Frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix {
        let a: number = (right + left) / (right - left);
        let b: number = (top + bottom) / (top - bottom);
        let c: number = -(far + near) / (far - near);
        let d: number = -(far * near * 2) / (far - near);
        this.fields = Matrix.CreateIdentity();
        this.fields[0 * 4 + 0] = (2 * near) / (right - left);
        this.fields[1 * 4 + 1] = (2 * near) / (top - bottom);
        this.fields[2 * 4 + 2] = c;
        this.fields[3 * 4 + 3] = 0;
        this.fields[2 * 4 + 0] = a;
        this.fields[2 * 4 + 1] = b;
        this.fields[3 * 4 + 2] = d;
        this.fields[2 * 4 + 3] = -1;
        return this;
    }

    public Ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix {
        let a: number = 2.0 / (right - left);
        let b: number = 2.0 / (top - bottom);
        let c: number = -2.0 / (far - near);
        let tx: number = -(right + left) / (right - left);
        let ty: number = -(top + bottom) / (top - bottom);
        let tz: number = -(far + near) / (far - near);
        this.fields = Matrix.CreateIdentity();
        this.fields[0 * 4 + 0] = a;
        this.fields[1 * 4 + 1] = b;
        this.fields[2 * 4 + 2] = c;
        this.fields[3 * 4 + 0] = tx;
        this.fields[3 * 4 + 1] = ty;
        this.fields[3 * 4 + 2] = tz;
        return this;
    }

    public Translate(x: number, y: number, z?: number): Matrix {
        this.fields = Matrix.Multiply(new Matrix(Matrix.CreateTranslate(x, y, z)), this).fields;
        return this;
    }

    public Scale(x: number, y: number, z?: number): Matrix {
        this.fields = Matrix.Multiply(new Matrix(Matrix.CreateScale(x, y, z)), this).fields;
        return this;
    }

    public Rotate(rotationAxis: Axis, angle: number): Matrix {
        this.fields = Matrix.Multiply(new Matrix(Matrix.CreateRotation(rotationAxis, angle)), this).fields;
        return this;
    }

    public ToIdentity(): void {
        this.fields = Matrix.CreateIdentity();
    }

    public static Multiply(m1: Matrix, m2: Matrix): Matrix {
        let M: Matrix = new Matrix(Matrix.CreateEmpty());
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                for (let k = 0; k < 4; ++k) M.fields[i * 4 + j] += m1.fields[i * 4 + k] * m2.fields[k * 4 + j];
            }
        }
        return M;
    }

    private static CreateTranslate(x: number, y: number, z: number): number[] {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
    }

    private static CreateScale(x: number, y: number, z: number): number[] {
        return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
    }

    private static CreateRotation(rotationAxis: Axis, angle: number): number[] {
        let sinTheta: number = Math.sin((angle / 180) * Math.PI);
        let cosTheta: number = Math.cos((angle / 180) * Math.PI);
        if (rotationAxis == Axis.X) {
            return [1, 0, 0, 0, 0, cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1];
        }
        else if (rotationAxis == Axis.Y) {
            return [cosTheta, 0, sinTheta, 0, 0, 1, 0, 0, -sinTheta, 0, cosTheta, 0, 0, 0, 0, 1];
        }
        else {
            return [cosTheta, -sinTheta, 0, 0, sinTheta, cosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }

    private static CreateEmpty(): number[] {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    }

    private static CreateIdentity(): number[] {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
}
