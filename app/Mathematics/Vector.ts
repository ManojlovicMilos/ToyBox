export  { Axis, Vector };

enum Axis
{
    X, Y, Z
}
class Vector
{
    public X: number;
    public Y: number;
    public Z: number;
    public constructor(X?:number, Y?:number, Z?:number)
    {
        if(X) this.X = X;
        else this.X = 0;
        if(Y) this.Y = Y;
        else this.Y = 0;
        if(Z) this.Z = Z;
        else this.Z = 0;
    }
    public Copy() : Vector
    {
        let New:Vector = new Vector(this.X, this.Y, this.Z);
        return New;
    }
    public Translate(V:Vector) : Vector
    {
        this.X += V.X;
        this.Y += V.Y;
        this.Z += V.Z;
        return this;
    }
    public Add(V:Vector) : Vector
    {
        return this.Translate(V);
    }
    public Substract(V:Vector) : Vector
    {
        this.X -= V.X;
        this.Y -= V.Y;
        this.Z -= V.Z;
        return this;
    }
    public Scale(V: Vector) : Vector
    {
        this.X *= V.X;
        this.Y *= V.Y;
        this.Z *= V.Z;
        return this;
    }
    public Scalar(Value:number) : Vector
    {
        this.X *= Value;
        this.Y *= Value;
        this.Z *= Value;
        return this;
    }
    public RotateX(Angle:number) : Vector
    {
        let OY:number = this.Y;
        let OZ:number = this.Z;
        this.Y = Math.cos((Angle / 180) * Math.PI) * OY - Math.sin((Angle / 180) * Math.PI) * OZ;
        this.Z = Math.cos((Angle / 180) * Math.PI) * OZ + Math.sin((Angle / 180) * Math.PI) * OY;
        return this;
    }
    public RotateY(Angle:number) : Vector
    {
        let OX:number = this.X;
        let OZ:number = this.Z;
        this.X = Math.cos((Angle / 180) * Math.PI) * OX + Math.sin((Angle / 180) * Math.PI) * OZ;
        this.Z = Math.cos((Angle / 180) * Math.PI) * OZ - Math.sin((Angle / 180) * Math.PI) * OX;
            return this;
    }
    public RotateZ(Angle:number) : Vector
    {
        let OX:number = this.X;
        let OY:number = this.Y;
        this.X = Math.cos((Angle / 180) * Math.PI) * OX - Math.sin((Angle / 180) * Math.PI) * OY;
        this.Y = Math.cos((Angle / 180) * Math.PI) * OY + Math.sin((Angle / 180) * Math.PI) * OX;
        return this;
    }
    public Length() : number
    {
        return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
    }
    public Normalize() : Vector
    {
        let Divider:number = 1.0 / this.Length();
        this.Scalar(Divider);
        return this;
    }
    public Absolute() : Vector
    {
        this.X = Math.abs(this.X);
        this.Y = Math.abs(this.Y);
        this.Z = Math.abs(this.Z);
        return this;
    }
    public ToArray() : number[]
    {
        return [this.X, this.Y, this.Z];
    }
    public ToQuattroArray(W:number) : number[]
    {
        return [this.X, this.Y, this.Z, W];
    }
    public static FromRGB(R:number, G:number, B:number) : Vector
    {
        return new Vector((R * 1.0 + 1) / 256, (G * 1.0 + 1) / 256, (B * 1.0 + 1) / 256);
    }
    public static Cross(Left:Vector, Right:Vector) : Vector
    {
        return new Vector(Left.Y * Right.Z - Left.Z * Right.Y, Left.Z * Right.X - Left.X * Right.Z, Left.X * Right.Y - Left.Y * Right.X);
    }
    public static Distance(V1:Vector, V2:Vector) : number
    {
        let V:Vector = new Vector(V1.X - V2.X, V1.Y - V2.Y, V1.Z - V2.Z);
        return V.Length();
    }
    private static CalculateAngle(V1:Vector, V2:Vector) : number
    {
        let V1V:number = Math.sqrt(V1.X * V1.X + V1.Y * V1.Y + V1.Z * V1.Z);
        let V2V:number = Math.sqrt(V2.X * V2.X + V2.Y * V2.Y + V2.Z * V2.Z);
        let UP:number = (V1.X * V2.X + V1.Y * V2.Y + V1.Z * V2.Z);
        let Cos:number = UP / (V1V * V2V);
        let Angle = Math.asin(Cos);
        Angle = (Angle / Math.PI) * 180.0;
        if(V1.X > V2.X) Angle = 180 - Angle;
        if(Angle < 0) Angle += 360;
        return Angle;
    }
    public static Angle(V1:Vector, V2:Vector) : number
    {
        return Vector.CalculateAngle(new Vector(0,1,0), new Vector(V2.X - V1.X, V2.Y - V1.Y, V2.Z - V1.Z));
    }
    public Deserialize(Data:any) : void
    {
        this.X = Data.X;
        this.Y = Data.Y;
        this.Z = Data.Z;
    }
    public Serialize() : any
    {
        let V:any = 
        {
            X: this.X,
            Y: this.Y,
            Z: this.Z
        };
        return V;
    }
}
