import * as Core from "./../../Core/Core";
import Vertex from "../Structures/Vertex";
import CollisionType from "./CollisionType";
import ColliderObject from "./ColliderObject";
import CollisionResult from "./CollisionResult";

export default class Collision {
    public static Check(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        if (collider1.type == CollisionType.Radius) {
            if (collider2.type == CollisionType.Radius) return Collision.CheckRadiusToRadius(collider1, collider2);
            if (collider2.type == CollisionType.Rectangular) return Collision.CheckRadiusToRectangular(collider1, collider2);
            if (collider2.type == CollisionType.Horizontal) return Collision.CheckRadiusToHorizontal(collider1, collider2);
            if (collider2.type == CollisionType.Vertical) return Collision.CheckRadiusToVertical(collider1, collider2);
        }
        if (collider1.type == CollisionType.Rectangular || collider1.type == CollisionType.Horizontal || collider1.type == CollisionType.Vertical) {
            if (collider2.type == CollisionType.Rectangular) return Collision.CheckRectangularToRectangular(collider1, collider2);
            if (collider2.type == CollisionType.Radius) return Collision.CheckRectangularToRadius(collider1, collider2);
            if (collider2.type == CollisionType.Horizontal) return Collision.CheckRectangularToHorizontal(collider1, collider2);
            if (collider2.type == CollisionType.Vertical) return Collision.CheckRectangularToVertical(collider1, collider2);
        }
        return new CollisionResult();
    }

    private static CheckRadiusToRadius(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        if (Collision.CheckRadius(collider1, collider2)) {
            Result = Collision.GetCollision8Way(collider1.position, collider2.position);
            Result.collision = true;
        }
        if (Core.Settings.active.math.collision.additionalSideCheck) Result.SideCheck(Collision.GetCollision4Way(collider1.position, collider2.position));
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRadiusToRectangular(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.y > collider2.position.y - collider2.scale.y / 2.0 && collider1.position.y < collider2.position.y + collider2.scale.y / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x - collider2.scale.x / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x + collider2.scale.x / 2.0);
        }
        if (collider1.position.x > collider2.position.x - collider2.scale.x / 2.0 && collider1.position.x < collider2.position.x + collider2.scale.x / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y - collider2.scale.y / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y + collider2.scale.y / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider2, collider1.position);
            Result.Invert();
            Result.collision = true;
        }
        if (Core.Settings.active.math.collision.additionalSideCheck) Result.SideCheck(Collision.GetCollision4Way(collider1.position, collider2.position));
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRadiusToHorizontal(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.y > collider2.position.y - collider2.scale.y / 2.0 && collider1.position.y < collider2.position.y + collider2.scale.y / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x - collider2.scale.x / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x + collider2.scale.x / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider1, collider2.position);
            Result.collision = true;
        }
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRadiusToVertical(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRadiusToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.x > collider2.position.x - collider2.scale.x / 2.0 && collider1.position.x < collider2.position.x + collider2.scale.x / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y - collider2.scale.y / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y + collider2.scale.y / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider1, collider2.position);
            Result.collision = true;
        }
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRectangularToRadius(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = Collision.CheckRadiusToRectangular(collider2, collider1);
        Result.Invert();
        Result.SideCheck(Collision.GetCollision4Way(collider1.position, collider2.position));
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRectangularToRectangular(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.y > collider2.position.y - collider2.scale.y / 2.0 && collider1.position.y < collider2.position.y + collider2.scale.y / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x - collider2.scale.x / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x + collider2.scale.x / 2.0);
        }
        if (collider1.position.x > collider2.position.x - collider2.scale.x / 2.0 && collider1.position.x < collider2.position.x + collider2.scale.x / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y - collider2.scale.y / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y + collider2.scale.y / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider1, collider2.position);
            Result.collision = true;
        }
        Result.SideCheck(Collision.GetCollision4Way(collider1.position, collider2.position));
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRectangularToHorizontal(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.y > collider2.position.y - collider2.scale.y / 2.0 && collider1.position.y < collider2.position.y + collider2.scale.y / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x - collider2.scale.x / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineX(collider1, collider2.position.x + collider2.scale.x / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider1, collider2.position);
            Result.collision = true;
        }
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRectangularToVertical(collider1: ColliderObject, collider2: ColliderObject): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Collided: boolean = false;
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y - collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x - collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        Collided = Collided || Collision.CheckRectangleToPoint(collider1, new Vertex(collider2.position.x + collider2.scale.x / 2.0, collider2.position.y + collider2.scale.y / 2.0, 0));
        if (collider1.position.x > collider2.position.x - collider2.scale.x / 2.0 && collider1.position.x < collider2.position.x + collider2.scale.x / 2.0) {
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y - collider2.scale.y / 2.0);
            Collided = Collided || Collision.CheckRadiusToLineY(collider1, collider2.position.y + collider2.scale.y / 2.0);
        }
        if (Collided) {
            Result = Collision.GetDefaultRectangularWay(collider1, collider2.position);
            Result.collision = true;
        }
        this.UpdateCollidersList(collider2, Result);
        return Result;
    }

    private static CheckRadius(collider1: ColliderObject, collider2: ColliderObject): boolean {
        let collider1Radius: number = (collider1.scale.x > collider1.scale.y) ? collider1.scale.y / 2.0 : collider1.scale.x / 2.0;
        let collider2Radius: number = (collider2.scale.x > collider2.scale.y) ? collider2.scale.y / 2.0 : collider2.scale.x / 2.0;
        let Distance: number = Vertex.Distance(collider1.position, collider2.position);
        return Distance < collider1Radius + collider2Radius;
    }

    private static CheckRadiusToPoint(collider: ColliderObject, position: Vertex): boolean {
        let ColliderRadius: number = (collider.scale.x > collider.scale.y) ? collider.scale.y / 2.0 : collider.scale.x / 2.0;
        let Distance: number = Vertex.Distance(collider.position, position);
        return Distance < ColliderRadius;
    }

    private static CheckRectangleToPoint(collider: ColliderObject, position: Vertex): boolean {
        let XCollision: boolean = collider.position.x - collider.scale.x / 2.0 < position.x && collider.position.x + collider.scale.x / 2.0 > position.x;
        let YCollision: boolean = collider.position.y - collider.scale.y / 2.0 < position.y && collider.position.y + collider.scale.y / 2.0 > position.y;
        return XCollision && YCollision;
    }

    private static CheckRadiusToLineX(collider: ColliderObject, x: number): boolean {
        return Math.abs(collider.position.x - x) < collider.scale.x / 2.0;
    }

    private static CheckRadiusToLineY(collider: ColliderObject, y: number): boolean {
        return Math.abs(collider.position.y - y) < collider.scale.y / 2.0;
    }

    private static CheckRectangleToLineX(collider: ColliderObject, position: Vertex): boolean {
        let XCollision: boolean = collider.position.x - collider.scale.x / 2.0 < position.x && collider.position.x + collider.scale.x / 2.0 > position.x;
        let YCollision: boolean = collider.position.y - collider.scale.y / 2.0 < position.y && collider.position.y + collider.scale.y / 2.0 > position.y;
        return XCollision && YCollision;
    }

    public static GetCollision4Way(position1: Vertex, position2: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Angle: number = Vertex.Angle(position2, position1);
        if (Angle < 45) {
            Result.left = true;
        }
        else if (Angle < 135) {
            Result.top = true;
        }
        else if (Angle < 225) {
            Result.right = true;
        }
        else if (Angle < 315) {
            Result.bottom = true;
        }
        else {
            Result.left = true;
        }
        return Result;
    }

    public static GetCollision8Way(position1: Vertex, position2: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        let Angle: number = Vertex.Angle(position2, position1);
        if (Angle < 22.5) {
            Result.left = true;
        }
        else if (Angle < 67.5) {
            Result.top = true;
            Result.left = true;
        }
        else if (Angle < 112.5) {
            Result.top = true;
        }
        else if (Angle < 157.5) {
            Result.right = true;
            Result.top = true;
        }
        else if (Angle < 202.5) {
            Result.right = true;
        }
        else if (Angle < 247.5) {
            Result.right = true;
            Result.bottom = true;
        }
        else if (Angle < 292.5) {
            Result.bottom = true;
        }
        else if (Angle < 337.5) {
            Result.bottom = true;
            Result.left = true;
        }
        else {
            Result.left = true;
        }
        return Result;
    }

    private static GetCollisionRectangularWay(collider: ColliderObject, position: Vertex): CollisionResult {
        let Result: CollisionResult = new CollisionResult();
        if (collider.position.x - collider.scale.x / 2.0 > position.x) Result.left = true;
        if (collider.position.x + collider.scale.x / 2.0 < position.x) Result.right = true;
        if (collider.position.y - collider.scale.y / 2.0 > position.y) Result.top = true;
        if (collider.position.y + collider.scale.y / 2.0 < position.y) Result.bottom = true;
        return Result;
    }

    private static GetDefaultRectangularWay(collider: ColliderObject, position: Vertex): CollisionResult {
        return Collision.GetCollisionRectangularWay(collider, position);
    }

    private static UpdateCollidersList(collider: ColliderObject, result: CollisionResult): void {
        if (!result.collision) return;
        result.colliders.push(collider);
        if (result.top) result.topColliders.push(collider);
        if (result.bottom) result.bottomColliders.push(collider);
        if (result.left) result.leftColliders.push(collider);
        if (result.right) result.rightColliders.push(collider);
    }
}
