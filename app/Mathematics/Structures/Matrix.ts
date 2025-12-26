import Axis from './Axis';

class Matrix {
    private _Fields: number[];

    public get Fields(): number[] { return this._Fields; }
    public set Fields(value: number[]) { this._Fields = value; }

    public constructor(Fields?: number[]) {
        if (Fields != null) {
            this._Fields = Fields;
        }
        else {
            this._Fields = Matrix.CreateIdentity();
        }
    }

    public Copy(): Matrix {
        return new Matrix(this._Fields);
    }

    public Frustum(Left: number, Right: number, Bottom: number, Top: number, Near: number, Far: number): Matrix {
        let A: number = (Right + Left) / (Right - Left);
        let B: number = (Top + Bottom) / (Top - Bottom);
        let C: number = -(Far + Near) / (Far - Near);
        let D: number = -(Far * Near * 2) / (Far - Near);
        this._Fields = Matrix.CreateIdentity();
        this._Fields[0 * 4 + 0] = (2 * Near) / (Right - Left);
        this._Fields[1 * 4 + 1] = (2 * Near) / (Top - Bottom);
        this._Fields[2 * 4 + 2] = C;
        this._Fields[3 * 4 + 3] = 0;
        this._Fields[2 * 4 + 0] = A;
        this._Fields[2 * 4 + 1] = B;
        this._Fields[3 * 4 + 2] = D;
        this._Fields[2 * 4 + 3] = -1;
        return this;
    }

    public Ortho(Left: number, Right: number, Bottom: number, Top: number, Near: number, Far: number): Matrix {
        let A: number = 2.0 / (Right - Left);
        let B: number = 2.0 / (Top - Bottom);
        let C: number = -2.0 / (Far - Near);
        let TX: number = -(Right + Left) / (Right - Left);
        let TY: number = -(Top + Bottom) / (Top - Bottom);
        let TZ: number = -(Far + Near) / (Far - Near);
        this._Fields = Matrix.CreateIdentity();
        this._Fields[0 * 4 + 0] = A;
        this._Fields[1 * 4 + 1] = B;
        this._Fields[2 * 4 + 2] = C;
        this._Fields[3 * 4 + 0] = TX;
        this._Fields[3 * 4 + 1] = TY;
        this._Fields[3 * 4 + 2] = TZ;
        return this;
    }

    public Translate(X: number, Y: number, Z: number): Matrix {
        this._Fields = Matrix.Multiply(new Matrix(Matrix.CreateTranslate(X, Y, Z)), this)._Fields;
        return this;
    }

    public Scale(X: number, Y: number, Z: number): Matrix {
        this._Fields = Matrix.Multiply(new Matrix(Matrix.CreateScale(X, Y, Z)), this)._Fields;
        return this;
    }

    public Rotate(RotationAxis: Axis, Angle: number): Matrix {
        this._Fields = Matrix.Multiply(new Matrix(Matrix.CreateRotation(RotationAxis, Angle)), this)._Fields;
        return this;
    }

    public ToIdentity(): void {
        this._Fields = Matrix.CreateIdentity();
    }

    public static Multiply(M1: Matrix, M2: Matrix): Matrix {
        let M: Matrix = new Matrix(Matrix.CreateEmpty());
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                for (let k = 0; k < 4; ++k) M._Fields[i * 4 + j] += M1._Fields[i * 4 + k] * M2._Fields[k * 4 + j];
            }
        }
        return M;
    }

    private static CreateTranslate(X: number, Y: number, Z: number): number[] {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, X, Y, Z, 1];
    }

    private static CreateScale(X: number, Y: number, Z: number): number[] {
        return [X, 0, 0, 0, 0, Y, 0, 0, 0, 0, Z, 0, 0, 0, 0, 1];
    }

    private static CreateRotation(RotationAxis: Axis, Angle: number): number[] {
        let SinTheta: number = Math.sin((Angle / 180) * Math.PI);
        let CosTheta: number = Math.cos((Angle / 180) * Math.PI);
        if (RotationAxis == Axis.X) {
            return [1, 0, 0, 0, 0, CosTheta, SinTheta, 0, 0, -SinTheta, CosTheta, 0, 0, 0, 0, 1];
        }
        else if (RotationAxis == Axis.Y) {
            return [CosTheta, 0, SinTheta, 0, 0, 1, 0, 0, -SinTheta, 0, CosTheta, 0, 0, 0, 0, 1];
        }
        else {
            return [CosTheta, -SinTheta, 0, 0, SinTheta, CosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }

    private static CreateEmpty(): number[] {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    private static CreateIdentity(): number[] {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
}

export default Matrix;
