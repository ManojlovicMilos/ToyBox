import * as Core from "../../Core/Core";
import * as Engine from "../../Engine/Engine";
import * as Math from "../../Mathematics/Mathematics";

@Core.Injectable('TBX.ObjectCollisionService')
class ObjectCollisionService extends Core.Service {
    private CollisionService: Math.CollisionService;

    public constructor() {
        super();
        this.CollisionService = Core.Inject(Math.CollisionService);
    }

    public CheckCollision(Object1: Engine.DrawObject, Object2: Engine.DrawObject) {
        let Collider1: Math.ColliderObject = this.CreateColliderObject(Object1);
        let Collider2: Math.ColliderObject = this.CreateColliderObject(Object2);
        return this.CollisionService.Check(Collider1, Collider2);
    }

    public CreateColliderObject(Object: Engine.DrawObject): Math.ColliderObject {
        let Collider: Math.ColliderObject = new Math.ColliderObject();
        Collider.Position = Object.Trans.Translation;
        Collider.Scale = Object.Trans.Scale;
        if (Object.Collision.Scale) Collider.Scale = Object.Collision.Scale;
        Collider.Type = Object.Collision.Type;
        Collider.Reference = Object;
        return Collider;
    }

    public CalculateCollisions(Object: Engine.DrawObject, Colliders: Engine.DrawObject[]): Math.CollisionResult {
        let Result: Math.CollisionResult = new Math.CollisionResult();
        let Collider: Math.ColliderObject = this.CreateColliderObject(Object);
        for (let i = 0; i < Colliders.length; i++) {
            if (Object.ID == Colliders[i].ID) continue;
            let Collider2: Math.ColliderObject = this.CreateColliderObject(Colliders[i]);
            let CollisionValue: Math.CollisionResult = this.CollisionService.Check(Collider, Collider2);
            if (CollisionValue.Collision) Result.Combine(CollisionValue);
        }
        return Result;
    }

    public CalculateTypeCollisions(Type: string, Object: Engine.DrawObject, Colliders: Engine.DrawObject[]): void {
        let Result: Math.CollisionResult = this.CalculateCollisions(Object, Colliders);
        Object.Collision.Specific[Type] = Result;
    }

    public Check(Object: Engine.DrawObject, Scene: Engine.Scene2D): void {
        let Colliders: Engine.DrawObject[] = Scene.FindColliders(Object.Collision.Tags);
        Object.Collision.Result = this.CalculateCollisions(Object, Colliders);
    }
}

export default ObjectCollisionService;
