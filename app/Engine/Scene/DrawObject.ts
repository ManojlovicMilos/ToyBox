export { DrawObject };

import * as Math from "../../Mathematics/Mathematics";

import { SceneObject } from "./SceneObject";

const INFIX = "_";

abstract class DrawObject extends SceneObject {
    private _Modified: boolean;
    private _Fixed: boolean;
    private _Active: boolean;
    private _ResourceKey: string;
    private _Paint: Math.Color;
    private _Trans: Math.Transformation;
    private _Collision: Math.CollisionValue;
    public get Modified(): boolean { return this._Modified; }
    public set Modified(value: boolean) { this._Modified = value; }
    public get Active(): boolean { return this._Active; }
    public set Active(value: boolean) { this._Active = value; this.OnToggle(value); }
    public get Fixed(): boolean { return this._Fixed; }
    public set Fixed(value: boolean) { this._Fixed = value; }
    public get ResourceKey(): string { return this._ResourceKey; }
    public set ResourceKey(value: string) { this._ResourceKey = value; }
    public get Paint(): Math.Color { return this._Paint; }
    public set Paint(value: Math.Color) { this._Paint = value; }
    public get Trans(): Math.Transformation { return this._Trans; }
    public set Trans(value: Math.Transformation) { this._Trans = value; }
    public get Collision(): Math.CollisionValue { return this._Collision; }
    public set Collision(value: Math.CollisionValue) { this._Collision = value; }
    public get Position(): Math.Vertex { return this._Trans.Translation; }
    public set Position(value: Math.Vertex) { this._Trans.Translation = value; }
    public get Size(): Math.Vertex { return this._Trans.Scale; }
    public set Size(value: Math.Vertex) { this._Trans.Scale = value; }

    public constructor(Old?: DrawObject) {
        super(Old);
        this.RegisterType(DrawObject.name);
        if (Old != null) {
            this._Modified = false;
            this._Fixed = Old._Fixed;
            this._Active = Old._Active;
            this._ResourceKey = Old._Name + INFIX + Old._ID;
            this._Paint = Old._Paint.Copy();
            this._Trans = Old._Trans.Copy();
            this._Collision = Old._Collision.Copy();
        }
        else {
            this._Modified = false;
            this._Fixed = false;
            this._Active = true;
            this._ResourceKey = this._ID;
            this._Paint = Math.Color.White;
            this._Trans = new Math.Transformation();
            this._Collision = new Math.CollisionValue();
        }
    }

    public Copy(): DrawObject {
        return this; // new DrawObject(this) for non-abstract
    }

    public OnToggle(Value: boolean): void {
        // Virtual
    }

    public OnResize(Args: any): void {
        // Virtual
    }
}
