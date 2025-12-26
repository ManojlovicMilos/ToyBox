import * as Core from "./toybox-core";
import * as Math from "./toybox-math";
import * as Engine from "./toybox-engine"

export class BufferService extends Core.Service
{
    Append(Buffer1:ArrayBuffer, Buffer2:ArrayBuffer);
}

export class ObjectCreationService extends Core.Service
{
    CreateSprite(Name?:string, Images?:string[], Position?:Math.Vertex, Size?:Math.Vertex) : Engine.Sprite
    CreateTile(Name?:string, Images?:string[], Position?:Math.Vertex, Size?:Math.Vertex) : Engine.Tile
}

export class ObjectCollisionService extends Core.Service
{
    CheckCollision(Object1:Engine.DrawObject, Object2:Engine.DrawObject)
    CreateColliderObject(Object:Engine.DrawObject) : Math.ColliderObject
    CalculateCollisions(Object:Engine.DrawObject, Colliders:Engine.DrawObject[]) : Math.CollisionResult
    CalculateTypeCollisions(Type:string, Object:Engine.DrawObject, Colliders:Engine.DrawObject[]) : void
    Check(Object:Engine.DrawObject, Scene:Engine.Scene2D) : void
}

export class ConversionService extends Core.Service
{
    VerticesToByteArray(Vertices:Math.Vertex[], Relevant:number) : Float32Array
    DrawObjectToCollider(Object:Engine.DrawObject) : Math.ColliderObject
}

export class DPadControl extends Engine.Tile
{
    Press:Function[];
    constructor(Old?:DPadControl, Position?:Math.Vertex, Size?:Math.Vertex)
    Update(Position:Math.Vertex, Size:Math.Vertex) : void
    SetColors(DPad:Math.Color, Directions:Math.Color) : void
}

export class AnalogControl extends Engine.Tile
{
    Press:Function[];
    constructor(Old?:AnalogControl, Position?:Math.Vertex, Size?:Math.Vertex)
    Update(Position:Math.Vertex, Size:Math.Vertex) : void
    SetColors(Stick:Math.Color, Pointer:Math.Color) : void
}

export class ProgressBar extends Engine.Tile
{
    Value:number;
    Indicator:Engine.Tile;
    constructor(Old?:ProgressBar, TargetScene?:Engine.Scene);
    ChangeTargetScene(Scene:Engine.Scene) : void
}
