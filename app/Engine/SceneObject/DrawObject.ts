export { DrawObject };

import * as Math from "../../Mathematics/Mathematics";

import { Material } from '../Engine';
import { SceneObject } from "./SceneObject";

abstract class DrawObject extends SceneObject {
    public fixed: boolean;
    public modified: boolean;
    public resourceKey: string;
    private material: Material;
    
    public get color(): Math.Color { return this.material.color; }
    public set color(value: Math.Color) { this.material.color = value; }
    public get position(): Math.Vertex { return this.trans.translation; }
    public set position(value: Math.Vertex) { this.trans.translation = value; }
    public get size(): Math.Vertex { return this.trans.scale; }
    public set size(value: Math.Vertex) { this.trans.scale = value; }

    public constructor(old?: DrawObject) {
        super(old);
        this.registerType(DrawObject);
        this.fixed = !!old.fixed;
        this.modified = false;
        this.resourceKey = old?.resourceKey || this.uuid.create();
        this.material = old?.material.duplicate() || new Material();
    }

    public override duplicate(): DrawObject {
        return this;
    }

    // virtual
    public OnToggle(Value: boolean): void {}

    // virtual
    public OnResize(Args: any): void {}
}
