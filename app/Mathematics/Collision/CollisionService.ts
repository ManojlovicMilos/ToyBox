import * as Core from '../../Core/Core';

import Vertex from '../Structures/Vertex';
import CollisionType from './CollisionType';
import ColliderObject from './ColliderObject';
import CollisionResult from './CollisionResult';

@Core.TBXService('TBX.CollisionService')
class CollisionService extends Core.Service {
    public AdditionalSideCheck: boolean = true;
    public FocusOffset: number = 10;

    public Check(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        if (Collider1.Type == CollisionType.Radius) {
            if (Collider2.Type == CollisionType.Radius) return this.CheckRadiusToRadius(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Rectangular) return this.CheckRadiusToRectangular(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Horizontal) return this.CheckRadiusToHorizontal(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Vertical) return this.CheckRadiusToVertical(Collider1, Collider2);
        }
        if (Collider1.Type == CollisionType.Rectangular || Collider1.Type == CollisionType.Horizontal || Collider1.Type == CollisionType.Vertical) {
            if (Collider2.Type == CollisionType.Rectangular) return this.CheckRectangularToRectangular(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Radius) return this.CheckRectangularToRadius(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Horizontal) return this.CheckRectangularToHorizontal(Collider1, Collider2);
            if (Collider2.Type == CollisionType.Vertical) return this.CheckRectangularToVertical(Collider1, Collider2);
        }
        return new CollisionResult();
    }

    private CheckRadiusToRadius(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        if (this.CheckRadius(Collider1, Collider2)) {
            Result = this.GetCollision8Way(Collider1.Position, Collider2.Position);
            Result.Collision = true;
        }
        if (this.AdditionalSideCheck) Result.SideCheck(this.GetCollision4Way(Collider1.Position, Collider2.Position));
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRadiusToRectangular(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.Y > Collider2.Position.Y - Collider2.Scale.Y / 2.0 && Collider1.Position.Y < Collider2.Position.Y + Collider2.Scale.Y / 2.0) {
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X - Collider2.Scale.X / 2.0);
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X + Collider2.Scale.X / 2.0);
        }
        if (Collider1.Position.X > Collider2.Position.X - Collider2.Scale.X / 2.0 && Collider1.Position.X < Collider2.Position.X + Collider2.Scale.X / 2.0) {
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y - Collider2.Scale.Y / 2.0);
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y + Collider2.Scale.Y / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider2, Collider1.Position);
            Result.Revert();
            Result.Collision = true;
        }
        if (this.AdditionalSideCheck) Result.SideCheck(this.GetCollision4Way(Collider1.Position, Collider2.Position));
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRadiusToHorizontal(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.Y > Collider2.Position.Y - Collider2.Scale.Y / 2.0 && Collider1.Position.Y < Collider2.Position.Y + Collider2.Scale.Y / 2.0) {
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X - Collider2.Scale.X / 2.0);
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X + Collider2.Scale.X / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider1, Collider2.Position);
            Result.Collision = true;
        }
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRadiusToVertical(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRadiusToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.X > Collider2.Position.X - Collider2.Scale.X / 2.0 && Collider1.Position.X < Collider2.Position.X + Collider2.Scale.X / 2.0) {
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y - Collider2.Scale.Y / 2.0);
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y + Collider2.Scale.Y / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider1, Collider2.Position);
            Result.Collision = true;
        }
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRectangularToRadius(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = this.CheckRadiusToRectangular(Collider2, Collider1);
        Result.Revert();
        Result.SideCheck(this.GetCollision4Way(Collider1.Position, Collider2.Position));
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRectangularToRectangular(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.Y > Collider2.Position.Y - Collider2.Scale.Y / 2.0 && Collider1.Position.Y < Collider2.Position.Y + Collider2.Scale.Y / 2.0) {
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X - Collider2.Scale.X / 2.0);
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X + Collider2.Scale.X / 2.0);
        }
        if (Collider1.Position.X > Collider2.Position.X - Collider2.Scale.X / 2.0 && Collider1.Position.X < Collider2.Position.X + Collider2.Scale.X / 2.0) {
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y - Collider2.Scale.Y / 2.0);
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y + Collider2.Scale.Y / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider1, Collider2.Position);
            Result.Collision = true;
        }
        Result.SideCheck(this.GetCollision4Way(Collider1.Position, Collider2.Position));
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRectangularToHorizontal(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.Y > Collider2.Position.Y - Collider2.Scale.Y / 2.0 && Collider1.Position.Y < Collider2.Position.Y + Collider2.Scale.Y / 2.0) {
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X - Collider2.Scale.X / 2.0);
            Collided = Collided || this.CheckRadiusToLineX(Collider1, Collider2.Position.X + Collider2.Scale.X / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider1, Collider2.Position);
            Result.Collision = true;
        }
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRectangularToVertical(Collider1: ColliderObject, Collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y - Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X - Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        Collided = Collided || this.CheckRectangleToPoint(Collider1, new Vertex(Collider2.Position.X + Collider2.Scale.X / 2.0, Collider2.Position.Y + Collider2.Scale.Y / 2.0, 0));
        if (Collider1.Position.X > Collider2.Position.X - Collider2.Scale.X / 2.0 && Collider1.Position.X < Collider2.Position.X + Collider2.Scale.X / 2.0) {
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y - Collider2.Scale.Y / 2.0);
            Collided = Collided || this.CheckRadiusToLineY(Collider1, Collider2.Position.Y + Collider2.Scale.Y / 2.0);
        }
        if (Collided) {
            Result = this.GetDefaultRectangularWay(Collider1, Collider2.Position);
            Result.Collision = true;
        }
        this.UpdateCollidersList(Collider2, Result);
        return Result;
    }

    private CheckRadius(Collider1: ColliderObject, Collider2: ColliderObject): boolean {
        let Collider1Radius: number = (Collider1.Scale.X > Collider1.Scale.Y) ? Collider1.Scale.Y / 2.0 : Collider1.Scale.X / 2.0;
        let Collider2Radius: number = (Collider2.Scale.X > Collider2.Scale.Y) ? Collider2.Scale.Y / 2.0 : Collider2.Scale.X / 2.0;
        let Distance: number = Vertex.Distance(Collider1.Position, Collider2.Position);
        return Distance < Collider1Radius + Collider2Radius;
    }

    private CheckRadiusToPoint(Collider: ColliderObject, Position: Vertex): boolean {
        let ColliderRadius: number = (Collider.Scale.X > Collider.Scale.Y) ? Collider.Scale.Y / 2.0 : Collider.Scale.X / 2.0;
        let Distance: number = Vertex.Distance(Collider.Position, Position);
        return Distance < ColliderRadius;
    }

    private CheckRectangleToPoint(Collider: ColliderObject, Position: Vertex): boolean {
        let XCollision: boolean = Collider.Position.X - Collider.Scale.X / 2.0 < Position.X && Collider.Position.X + Collider.Scale.X / 2.0 > Position.X;
        let YCollision: boolean = Collider.Position.Y - Collider.Scale.Y / 2.0 < Position.Y && Collider.Position.Y + Collider.Scale.Y / 2.0 > Position.Y;
        return XCollision && YCollision;
    }

    private CheckRadiusToLineX(Collider: ColliderObject, X: number): boolean {
        return Math.abs(Collider.Position.X - X) < Collider.Scale.X / 2.0;
    }

    private CheckRadiusToLineY(Collider: ColliderObject, Y: number): boolean {
        return Math.abs(Collider.Position.Y - Y) < Collider.Scale.Y / 2.0;
    }

    private CheckRectangleToLineX(Collider: ColliderObject, Position: Vertex): boolean {
        let XCollision: boolean = Collider.Position.X - Collider.Scale.X / 2.0 < Position.X && Collider.Position.X + Collider.Scale.X / 2.0 > Position.X;
        let YCollision: boolean = Collider.Position.Y - Collider.Scale.Y / 2.0 < Position.Y && Collider.Position.Y + Collider.Scale.Y / 2.0 > Position.Y;
        return XCollision && YCollision;
    }

    private GetCollisionCubic(Collider: ColliderObject, Position: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        return Result;
    }

    public GetCollision4Way(Position1: Vertex, Position2: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Angle: number = Vertex.Angle(Position2, Position1);
        if (Angle < 45) {
            Result.Left = true;
        }
        else if (Angle < 135) {
            Result.Top = true;
        }
        else if (Angle < 225) {
            Result.Right = true;
        }
        else if (Angle < 315) {
            Result.Bottom = true;
        }
        else {
            Result.Left = true;
        }
        return Result;
    }

    public GetCollision8Way(Position1: Vertex, Position2: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Angle: number = Vertex.Angle(Position2, Position1);
        if (Angle < 22.5) {
            Result.Left = true;
        }
        else if (Angle < 67.5) {
            Result.Top = true;
            Result.Left = true;
        }
        else if (Angle < 112.5) {
            Result.Top = true;
        }
        else if (Angle < 157.5) {
            Result.Right = true;
            Result.Top = true;
        }
        else if (Angle < 202.5) {
            Result.Right = true;
        }
        else if (Angle < 247.5) {
            Result.Right = true;
            Result.Bottom = true;
        }
        else if (Angle < 292.5) {
            Result.Bottom = true;
        }
        else if (Angle < 337.5) {
            Result.Bottom = true;
            Result.Left = true;
        }
        else {
            Result.Left = true;
        }
        return Result;
    }

    private GetCollisionRectangularWay(Collider: ColliderObject, Position: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        if (Collider.Position.X - Collider.Scale.X / 2.0 > Position.X) Result.Left = true;
        if (Collider.Position.X + Collider.Scale.X / 2.0 < Position.X) Result.Right = true;
        if (Collider.Position.Y - Collider.Scale.Y / 2.0 > Position.Y) Result.Top = true;
        if (Collider.Position.Y + Collider.Scale.Y / 2.0 < Position.Y) Result.Bottom = true;
        return Result;
    }

    private GetDefaultRectangularWay(Collider: ColliderObject, Position: Vertex): CollisionResult {
        return this.GetCollisionRectangularWay(Collider, Position);
    }
    
    private UpdateCollidersList(Collider: ColliderObject, Result: CollisionResult): void {
        if (!Result.Collision) return;
        Result.Colliders.push(Collider);
        if (Result.Top) Result.TopColliders.push(Collider);
        if (Result.Bottom) Result.BottomColliders.push(Collider);
        if (Result.Left) Result.LeftColliders.push(Collider);
        if (Result.Right) Result.RightColliders.push(Collider);
    }
}

export default CollisionService;
