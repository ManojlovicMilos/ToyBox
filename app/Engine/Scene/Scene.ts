export { SceneType, Scene };

import * as Core from "./../../Core/Core";
import * as Util from "./../../Util/Util";
import * as Math from "./../../Mathematics/Mathematics";

import { Light } from "../SceneObject/Light";
import { DrawObject, TBX_DRAW_OBJECT_TYPE } from "../SceneObject/DrawObject";
import { SceneObject } from "../SceneObject/SceneObject";
import { SoundObject } from "../SceneObject/SoundObject";
import { EventArguments } from "../Events/EventArguments";
import { SceneEventPackage } from "./../Events/SceneEventPackage";

enum SceneType {
    Scene2D = "Scene2D",
    Scene3D = "Scene3D"
}

class Scene extends Core.BaseObject {
    protected active: boolean;
    private backColor: Math.Color;
    private events: SceneEventPackage;
    public get BackColor(): Math.Color { return this._BackColor; }
    public set BackColor(value: Math.Color) { this._BackColor = value; }
    public get Events(): SceneEventPackage { return this._Events; }
    public get Active(): boolean { return this._Active; }

    public constructor(Old?: Scene) {
        super(Old);
        this._Active = false;
        this._BackColor = Math.Color.FromRGBA(40, 40, 40, 255);
        this._Events = new SceneEventPackage();
        this._Objects = [];
        if (Old) {
            this._BackColor = Old._BackColor;
            this._Events = Old._Events.Copy();
            this._Objects = Old._Objects.map(Entry => Entry.Copy());
        }
    }

    public Copy(): Scene {
        return new Scene(this);
    }

    public Attach(SO: SceneObject): void {
        // Virtual
        this._Objects.push(SO);
        SO.OnAttach({ Scene: this });
    }
    
    public Remove(SO: SceneObject): void {
        // Virtual
        let Index: number = this._Objects.indexOf(SO);
        if (Index != -1) {
            SO.OnRemove({ Scene: this });
            this._Objects.splice(Index, 1);
        }
        else Util.Log.Warning("Object " + SO.Name + " / " + SO.ID + " does not exist in scene " + this.Name + " / " + this.ID, { Objects: this._Objects, Object });
    }

    public FindActive(ObjectType?: string): DrawObject[] {
        let Objects: DrawObject[] = <DrawObject[]>this.FindByType(Type.DrawObject);
        if (ObjectType) Objects = Objects.filter(Item => Item.Is(ObjectType));
        return Objects.filter(Item => Item.Active);
    }

    public FindColliders(Tags?: string[]): DrawObject[] {
        const DrawObjects = this.FindChildrenByType(DrawObject.name) as DrawObject[];
        if (!Tags) return DrawObjects.filter(entry => (entry.Collision.Active));
        return DrawObjects.filter(entry => (entry.Collision.Active && entry.HasTags(Tags)));
    }

    public Composite(Chunk: Scene): boolean {
        // Virtual
        return false;
    }

    public OnLeave(): void {
        // Virtual
        this._Active = false;
    }

    public OnSwitch(): void {
        // Virtual
        this._Active = true;
        let UIParent: HTMLElement = document.getElementById("ui-parent");
        if (UIParent) UIParent.innerHTML = "";
        (this.FindChildrenByType(SceneObject.name) as SceneObject[])
            .forEach((entry: SceneObject) => entry.OnSwitch());
    }

    public OnResize(Args: EventArguments): void {
        (this.FindChildrenByType(DrawObject.name) as DrawObject[])
            .forEach((entry: DrawObject) => entry.OnResize(Args));
    }

    public Serialize(): any {
        return {
            ...super.Serialize(),
            BackColor: this._BackColor.Serialize(),
            Objects: this._Objects.map(Entry => Entry.Serialize()),
        };
    }

    public Deserialize(Data: any): void {
        this._BackColor.Deserialize(Data.BackColor);
        this._Objects = [];
        for (let i in Data.Objects) {

        }
    }
}
