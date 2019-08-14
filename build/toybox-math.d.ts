export enum Axis
{
    X,
    Y,
    Z
}

export class Vector
{
    X: number;
    Y: number;
    Z: number;
    constructor(X?:number, Y?:number, Z?:number)
    Copy() : Vector
    Translate(V:Vector) : Vector
    Add(V:Vector) : Vector
    Substract(V:Vector) : Vector
    Scale(V: Vector) : Vector
    Scalar(Value:number) : Vector
    RotateX(Angle:number) : Vector
    RotateY(Angle:number) : Vector
    RotateZ(Angle:number) : Vector
    Length() : number
    Normalize() : Vector
    Absolute() : Vector
    ToArray() : number[]
    ToQuattroArray(W:number) : number[]
    Serialize() : any
    Deserialize(Data:any) : void
    static FromRGB(R:number, G:number, B:number) : Vector
    static Cross(Left:Vector, Right:Vector) : Vector
    static Distance(V1:Vector, V2:Vector) : number
    static CalculateAngle(V1:Vector, V2:Vector) : number
    static Angle(V1:Vector, V2:Vector) : number
}

export class Transformation
{
    Translation:Vector;
    Rotation:Vector;
    Scale:Vector;
    Skew:Vector;
    constructor(Old?:Transformation)
    Copy():Transformation
    Composite(Trans:Transformation) : void
    Serialize() : any
    Deserialize(Data) : void
}

export enum MatrixMode
{
    Projection,
    ModelView
}

export class Matrix
{
    Fields:number[];
    constructor(Fields?:number[])
    Copy() : Matrix
    Frustum(Left:number, Right:number, Bottom:number, Top:number, Near:number, Far:number) : Matrix
    Ortho(Left:number, Right:number, Bottom:number, Top:number, Near:number, Far:number) : Matrix
    Translate(X:number, Y:number, Z:number) : Matrix
    Scale(X:number, Y:number, Z:number) : Matrix
    Rotate(RotationAxis:Axis, Angle:number) : Matrix
    ToIdentity() : void
    static Multiply(M1:Matrix, M2:Matrix) : Matrix
    static CreateTranslate(X:number, Y:number, Z:number) : number[]
    static CreateScale(X:number, Y:number, Z:number) : number[]
    static CreateRotation(RotationAxis:Axis, Angle:number) : number[]
    static CreateEmpty() : number[]
    static CreateIdentity() : number[]
}

export class MatrixTransformer
{
    ProjectionMatrix:Matrix;
    ModelViewMatrix:Matrix;
    constructor()
    MatrixMode(Mode:MatrixMode) : void
    LoadMatrix(M:Matrix) : void
    LoadIdentity() : void
    PushMatrix() : void
    PopMatrix() : void
    MultMatrix(M:Matrix) : void
    Frustum(Left:number, Right:number, Bottom:number, Top:number, Near:number, Far:number) : void
    Ortho(Left:number, Right:number, Bottom:number, Top:number, Near:number, Far:number) : void
    Ortho2D(Left:number, Right:number, Bottom:number, Top:number) : void
    Translate(X:number, Y:number, Z:number) : void
    Scale(X:number, Y:number, Z:number) : void
    Rotate(Angle:number, X:number, Y:number, Z:number) : void
    Perspective(FieldOfView:number, Aspect:number, Near:number, Far:number) : void
    LookAt(Eye:Vector, Target:Vector, Up:Vector) : void
    DefaultPerspective(Width:number, Height:number) : void
    DefaultView(Eye:Vector, Target:Vector) : void
    static TransformVector(M:Matrix, ToTransform:Vector) : Vector
}

export class Color
{
    R:number;
    G:number;
    B:number;
    A:number;
    constructor()
    Copy():Color
    Lighten():Color
    Darken():Color
    ToArray() : number[]
    ToString() : string
    Serialize() : any
    Deserialize(Data:any) : void
    static Empty:Color;
    static Black:Color;
    static White:Color;
    static Aqua:Color;
    static Teal:Color;
    static Blue:Color;
    static Navy:Color;
    static Yellow:Color;
    static Olive:Color;
    static Lime:Color;
    static Green:Color;
    static Fuchsia:Color;
    static Purple:Color;
    static Red:Color;
    static Maroon:Color;
    static FromString( ColorString:string ) : Color
    static FromRGBA(R:number, G:number, B:number, A:number):Color
    static Blend(Color1:Color, Color2:Color, Ratio:number) : Color
}

export class CollisionResult
{
    Collision:boolean;
    Top:boolean;
    Bottom:boolean;
    Left:boolean;
    Right:boolean;
    Front:boolean;
    Back:boolean;
    Colliders:any[];
    TopColliders:any[];
    BottomColliders:any[];
    LeftColliders:any[];
    RightColliders:any[];
    FrontColliders:any[];
    BackColliders:any[];
    Copy():CollisionResult;
    Revert():void
    Combine(Other:CollisionResult) : void
}

export enum CollisionType
{
    Radius,
    Rectangular,
    Horizontal,
    Vertical
}

export class CollisionData
{
    Active:boolean;
    Tags:string[];
    Scale:Vector;
    Type:CollisionType;
    Result:CollisionResult;
    Specific:any;
    public constructor(Old?:CollisionData)
    public Copy() : CollisionData
    public Serialize() : any
    public Deserialize(Data) : void
}

export class Collider
{
    Position:Vector;
    Scale:Vector;
    Type:CollisionType;
    Reference:any;
}

export class Collision
{
    static FocusOffset:number;
    static Check(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRadius2DToRadius2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRadius2DToRectangular2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRadius2DToHorizontal2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRadius2DToVertical2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRectangular2DToRadius2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRectangular2DToRectangular2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRectangular2DToHorizontal2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRectangular2DToVertical2D(Collider1:Collider, Collider2:Collider) : CollisionResult
    static CheckRadius(Collider1:Collider, Collider2:Collider) : boolean
    static CheckRadiusToPoint(Collider:Collider, Position:Vector) : boolean
    static CheckRectangleToPoint(Collider:Collider, Position:Vector) : boolean
    static CheckRadiusToLineX(Collider:Collider, X:number) : boolean
    static CheckRadiusToLineY(Collider:Collider, Y:number) : boolean
    static CheckRectangleToLineX(Collider:Collider, Position:Vector) : boolean
    static GetCollisionCubic(Collider:Collider, Position:Vector) : CollisionResult
    static GetCollision4Way(Position1:Vector, Position2:Vector) : CollisionResult
    static GetCollision8Way(Position1:Vector, Position2:Vector) : CollisionResult
    static GetCollisionRectangularWay(Collider:Collider, Position:Vector) : CollisionResult
    static GetDefaultRectangularWay(Collider:Collider, Position:Vector) : CollisionResult
}

export class Random
{
    static Next(Min, Max) : number
}

export as namespace Math;