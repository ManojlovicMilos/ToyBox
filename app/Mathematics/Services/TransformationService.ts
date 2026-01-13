import * as Core from '../../Core/Core';

import Axis from '../Structures/Axis';
import Vertex from '../Structures/Vertex';
import Matrix from '../Structures/Matrix';
import MatrixMode from '../Structures/MatrixMode';

@Core.Injectable('TBX.TransformationService')
class TransformationService extends Core.Service {
    private _MatrixMode: MatrixMode;
    private _PushedProjectionMatrix: Matrix;
    private _PushedModelViewMatrix: Matrix;
    private _ProjectionMatrix: Matrix;
    private _ModelViewMatrix: Matrix;

    public get ProjectionMatrix(): Matrix { return this._ProjectionMatrix; }
    public set ProjectionMatrix(value: Matrix) { this._ProjectionMatrix = value; }
    public get ModelViewMatrix(): Matrix { return this._ModelViewMatrix; }
    public set ModelViewMatrix(value: Matrix) { this._ModelViewMatrix = value; }

    public constructor() {
        super();
        this._MatrixMode = 0;
        this._ModelViewMatrix = new Matrix();
        this._ProjectionMatrix = new Matrix();
        this._PushedModelViewMatrix = new Matrix();
        this._PushedProjectionMatrix = new Matrix();
    }

    public MatrixMode(Mode: MatrixMode): void {
        this._MatrixMode = Mode;
    }

    public LoadMatrix(M: Matrix): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix = M;
        else this._ProjectionMatrix = M;
    }

    public LoadIdentity(): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.ToIdentity();
        else this._ProjectionMatrix.ToIdentity();
    }

    public PushMatrix(): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._PushedModelViewMatrix = this._ModelViewMatrix.Copy();
        else this._PushedProjectionMatrix = this._ProjectionMatrix.Copy();
    }

    public PopMatrix(): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix = this._PushedModelViewMatrix.Copy();
        else this._ProjectionMatrix = this._PushedProjectionMatrix.Copy();
    }

    public MultMatrix(M: Matrix): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix = Matrix.Multiply(this._ModelViewMatrix, M);
        else this._ProjectionMatrix = Matrix.Multiply(this._ProjectionMatrix, M);
    }

    public Frustum(Left: number, Right: number, Bottom: number, Top: number, Near: number, Far: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.Frustum(Left, Right, Bottom, Top, Near, Far);
        else this._ProjectionMatrix.Frustum(Left, Right, Bottom, Top, Near, Far);
    }

    public Ortho(Left: number, Right: number, Bottom: number, Top: number, Near: number, Far: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.Ortho(Left, Right, Bottom, Top, Near, Far);
        else this._ProjectionMatrix.Ortho(Left, Right, Bottom, Top, Near, Far);
    }

    public Ortho2D(Left: number, Right: number, Bottom: number, Top: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.Ortho(Left, Right, Bottom, Top, -1, 1);
        else this._ProjectionMatrix.Ortho(Left, Right, Bottom, Top, -1, 1);
    }

    public Translate(X: number, Y: number, Z: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.Translate(X, Y, Z);
        else this._ProjectionMatrix.Translate(X, Y, Z);
    }

    public Scale(X: number, Y: number, Z: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) this._ModelViewMatrix.Scale(X, Y, Z);
        else this._ProjectionMatrix.Scale(X, Y, Z);
    }

    public Rotate(Angle: number, X: number, Y: number, Z: number): void {
        if (this._MatrixMode == MatrixMode.ModelView) {
            this._ModelViewMatrix.Rotate(Axis.X, Angle * X);
            this._ModelViewMatrix.Rotate(Axis.Y, Angle * Y);
            this._ModelViewMatrix.Rotate(Axis.Z, Angle * Z);
        }
        else {
            this._ProjectionMatrix.Rotate(Axis.X, Angle * X);
            this._ProjectionMatrix.Rotate(Axis.Y, Angle * Y);
            this._ProjectionMatrix.Rotate(Axis.Z, Angle * Z);
        }
    }

    public Perspective(FieldOfView: number, Aspect: number, Near: number, Far: number): void {
        let Top: number = Math.tan(FieldOfView / 360 * Math.PI) * Near;
        let Bottom: number = -Top;
        let Right = Top * Aspect;
        let Left = -Right;
        this.Frustum(Left, Right, Bottom, Top, Near, Far);
    }

    public LookAt(Eye: Vertex, Target: Vertex, Up: Vertex): void {
        let M: Matrix = new Matrix();
        let Forward: Vertex = new Vertex(Target.X - Eye.X, Target.Y - Eye.Y, Target.Z - Eye.Z);
        let Side: Vertex = new Vertex(0, 0, 0);
        Forward = Forward.Normalize();
        Side = Vertex.Cross(Forward, Up);
        Side = Side.Normalize();
        Up = Vertex.Cross(Side, Forward);
        M[0 * 4 + 0] = Side.X;
        M[1 * 4 + 0] = Side.Y;
        M[2 * 4 + 0] = Side.Z;
        M[0 * 4 + 1] = Up.X;
        M[1 * 4 + 1] = Up.Y;
        M[2 * 4 + 1] = Up.Z;
        M[0 * 4 + 2] = -Forward.X;
        M[1 * 4 + 2] = -Forward.Y;
        M[2 * 4 + 2] = -Forward.Z;
        this.MultMatrix(M);
        this.Translate(-Eye.X, -Eye.Y, -Eye.Z);
    }

    public DefaultPerspective(Width: number, Height: number): void {
        this.Perspective(45, Width * 1.0 / Height, 0.001, 1000000);
    }

    public DefaultView(Eye: Vertex, Target: Vertex): void {
        this.LookAt(Eye, Target, new Vertex(0, 1, 0));
    }

    public static TransformVertex(M: Matrix, ToTransform: Vertex): Vertex {
        let NewVertex: number[] = [0, 0, 0, 0];
        NewVertex[0] = M.Fields[0 * 4 + 0] * ToTransform.X + M.Fields[0 * 4 + 1] * ToTransform.Y + M.Fields[0 * 4 + 2] * ToTransform.Z + M.Fields[0 * 4 + 3] * 1;
        NewVertex[1] = M.Fields[1 * 4 + 0] * ToTransform.X + M.Fields[1 * 4 + 1] * ToTransform.Y + M.Fields[1 * 4 + 2] * ToTransform.Z + M.Fields[1 * 4 + 3] * 1;
        NewVertex[2] = M.Fields[2 * 4 + 0] * ToTransform.X + M.Fields[2 * 4 + 1] * ToTransform.Y + M.Fields[2 * 4 + 2] * ToTransform.Z + M.Fields[2 * 4 + 3] * 1;
        NewVertex[3] = M.Fields[3 * 4 + 0] * ToTransform.X + M.Fields[3 * 4 + 1] * ToTransform.Y + M.Fields[3 * 4 + 2] * ToTransform.Z + M.Fields[3 * 4 + 3] * 1;
        return new Vertex(NewVertex[0], NewVertex[1], NewVertex[2]);
    }
}

export default TransformationService;
