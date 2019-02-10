import * as Math from "./toybox-math";
import * as Engine from "./toybox-engine"

export class BufferUtil
{
    static Append(Buffer1:ArrayBuffer, Buffer2:ArrayBuffer);
}

export class CollisionUtil
{
    static CheckCollision(Object1:Engine.DrawObject, Object2:Engine.DrawObject)
    static CreateColliderObject(Object:Engine.DrawObject) : Math.ColliderObject
    static CalculateCollisions(Object:Engine.DrawObject, Colliders:Engine.DrawObject[]) : Math.CollisionResult
    static CalculateTypeCollisions(Type:string, Object:Engine.DrawObject, Colliders:Engine.DrawObject[]) : void
    static Check(Object:Engine.DrawObject, Scene:Engine.Scene2D) : void
}

export class Convert
{
    static VerticesToByteArray(Vertices:Math.Vertex[], Relevant:number) : Float32Array
    static DrawObjectToCollider(Object:Engine.DrawObject) : Math.ColliderObject
}

export class Log
{
    static Enabled:boolean;
    static InfoEnabled:boolean;
    static ErrorEnabled:boolean;
    static WarningEnabled:boolean;
    static EventEnabled:boolean;
    static CustomEnabled:boolean;
    static CustomTitle:string;
    static Out(Message:string, Object?:any, Type?:string) : void
    static Info(Message:string, Object?:any, Type?:string) : void
    static Error(Message:string, Object?:any, Type?:string) : void
    static Warning(Message:string, Object?:any, Type?:string) : void
    static Event(Message:string, Object?:any) : void
    static Custom(Message:string, Object?:any, Type?:string) : void
}

export class SceneObjectUtil
{
    static CreateSprite(Name?:string, Images?:string[], Position?:Math.Vertex, Size?:Math.Vertex) : Engine.Sprite
    static CreateTile(Name?:string, Images?:string[], Position?:Math.Vertex, Size?:Math.Vertex) : Engine.Tile
}

export class DPad extends Engine.Tile
{
    static All:DPad[];
    Press:Function[];
    constructor(Old?:DPad, Position?:Math.Vertex, Size?:Math.Vertex)
    Update(Position:Math.Vertex, Size:Math.Vertex) : void
    SetColors(DPad:Math.Color, Directions:Math.Color) : void
}

export class Analog extends Engine.Tile
{
    static All:Analog[];
    Press:Function[];
    constructor(Old?:Analog, Position?:Math.Vertex, Size?:Math.Vertex)
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