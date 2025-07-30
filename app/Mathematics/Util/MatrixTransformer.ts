import { Axis } from "../Mathematics";
import Matrix from "../Structures/Matrix";
import Vertex from "../Structures/Vertex";
import MatrixMode from "../Structures/MatrixMode";

export default class MatrixTransformer {
    private _matrixMode: MatrixMode;
    private _modelViewMatrix: Matrix;
    private _projectionMatrix: Matrix;
    private _pushedModelViewMatrix: Matrix;    
    private _pushedProjectionMatrix: Matrix;
    public get projectionMatrix(): Matrix { return this._projectionMatrix; }
    public set projectionMatrix(value: Matrix) { this._projectionMatrix = value; }
    public get modelViewMatrix(): Matrix { return this._modelViewMatrix; }
    public set modelViewMatrix(value: Matrix) { this._modelViewMatrix = value; }

    public constructor() {
        this._matrixMode = MatrixMode.Projection;
        this._modelViewMatrix = new Matrix();
        this._projectionMatrix = new Matrix();
        this._pushedModelViewMatrix = new Matrix();
        this._pushedProjectionMatrix = new Matrix();
    }

    public MatrixMode(mode: MatrixMode): void {
        this._matrixMode = mode;
    }

    public LoadMatrix(matrix: Matrix): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix = matrix;
        else this._projectionMatrix = matrix;
    }

    public LoadIdentity(): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.ToIdentity();
        else this._projectionMatrix.ToIdentity();
    }

    public PushMatrix(): void {
        if (this._matrixMode == MatrixMode.ModelView) this._pushedModelViewMatrix = this._modelViewMatrix.Copy();
        else this._pushedProjectionMatrix = this._projectionMatrix.Copy();
    }

    public PopMatrix(): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix = this._pushedModelViewMatrix.Copy();
        else this._projectionMatrix = this._pushedProjectionMatrix.Copy();
    }

    public MultMatrix(matrix: Matrix): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix = Matrix.Multiply(this._modelViewMatrix, matrix);
        else this._projectionMatrix = Matrix.Multiply(this._projectionMatrix, matrix);
    }

    public Frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.Frustum(left, right, bottom, top, near, far);
        else this._projectionMatrix.Frustum(left, right, bottom, top, near, far);
    }

    public Ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.Ortho(left, right, bottom, top, near, far);
        else this._projectionMatrix.Ortho(left, right, bottom, top, near, far);
    }

    public Ortho2D(left: number, right: number, bottom: number, top: number): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.Ortho(left, right, bottom, top, -1, 1);
        else this._projectionMatrix.Ortho(left, right, bottom, top, -1, 1);
    }

    public Translate(x: number, y: number, z: number): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.Translate(x, y, z);
        else this._projectionMatrix.Translate(x, y, z);
    }

    public Scale(x: number, y: number, z: number): void {
        if (this._matrixMode == MatrixMode.ModelView) this._modelViewMatrix.Scale(x, y, z);
        else this._projectionMatrix.Scale(x, y, z);
    }

    public Rotate(angle: number, x: number, y: number, z: number): void {
        if (this._matrixMode == MatrixMode.ModelView) {
            this._modelViewMatrix.Rotate(Axis.X, angle * x);
            this._modelViewMatrix.Rotate(Axis.Y, angle * y);
            this._modelViewMatrix.Rotate(Axis.Z, angle * z);
        }
        else {
            this._projectionMatrix.Rotate(Axis.X, angle * x);
            this._projectionMatrix.Rotate(Axis.Y, angle * y);
            this._projectionMatrix.Rotate(Axis.Z, angle * z);
        }
    }

    public Perspective(fieldOfView: number, aspect: number, near: number, far: number): void {
        let top: number = Math.tan(fieldOfView / 360 * Math.PI) * near;
        let bottom: number = -top;
        let right = top * aspect;
        let left = -right;
        this.Frustum(left, right, bottom, top, near, far);
    }

    public LookAt(eye: Vertex, target: Vertex, up: Vertex): void {
        let matrix: Matrix = new Matrix();
        let forward: Vertex = new Vertex(target.x - eye.x, target.y - eye.y, target.z - eye.z);
        let side: Vertex = new Vertex(0, 0, 0);
        forward = forward.Normalize();
        side = Vertex.Cross(forward, up);
        side = side.Normalize();
        up = Vertex.Cross(side, forward);
        matrix[0 * 4 + 0] = side.x;
        matrix[1 * 4 + 0] = side.y;
        matrix[2 * 4 + 0] = side.z;
        matrix[0 * 4 + 1] = up.x;
        matrix[1 * 4 + 1] = up.y;
        matrix[2 * 4 + 1] = up.z;
        matrix[0 * 4 + 2] = -forward.x;
        matrix[1 * 4 + 2] = -forward.y;
        matrix[2 * 4 + 2] = -forward.z;
        this.MultMatrix(matrix);
        this.Translate(-eye.x, -eye.y, -eye.z);
    }

    public DefaultPerspective(width: number, height: number): void {
        this.Perspective(45, width * 1.0 / height, 0.001, 1000000);
    }

    public DefaultView(eye: Vertex, target: Vertex): void {
        this.LookAt(eye, target, new Vertex(0, 1, 0));
    }

    public static TransformVertex(matrix: Matrix, ToTransform: Vertex): Vertex {
        let newVertex: number[] = [0, 0, 0, 0];
        newVertex[0] = matrix.fields[0 * 4 + 0] * ToTransform.x + matrix.fields[0 * 4 + 1] * ToTransform.y + matrix.fields[0 * 4 + 2] * ToTransform.z + matrix.fields[0 * 4 + 3] * 1;
        newVertex[1] = matrix.fields[1 * 4 + 0] * ToTransform.x + matrix.fields[1 * 4 + 1] * ToTransform.y + matrix.fields[1 * 4 + 2] * ToTransform.z + matrix.fields[1 * 4 + 3] * 1;
        newVertex[2] = matrix.fields[2 * 4 + 0] * ToTransform.x + matrix.fields[2 * 4 + 1] * ToTransform.y + matrix.fields[2 * 4 + 2] * ToTransform.z + matrix.fields[2 * 4 + 3] * 1;
        newVertex[3] = matrix.fields[3 * 4 + 0] * ToTransform.x + matrix.fields[3 * 4 + 1] * ToTransform.y + matrix.fields[3 * 4 + 2] * ToTransform.z + matrix.fields[3 * 4 + 3] * 1;
        return new Vertex(newVertex[0], newVertex[1], newVertex[2]);
    }
}
