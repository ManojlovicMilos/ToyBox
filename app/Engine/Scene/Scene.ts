export { SceneType, Scene };

import * as Core from "./../../Core/Core";
import * as Util from "./../../Util/Util";
import * as Math from "./../../Mathematics/Mathematics";

import { Light } from "./Light";
import { DrawObject } from "./DrawObject";
import { SceneObject } from "./SceneObject";
import { SoundObject } from "./SoundObject";
import { EventArguments } from "../Events/EventArguments";
import { SceneEventPackage } from "./../Events/SceneEventPackage";

enum SceneType
{
    Scene2D = "Scene2D",
    Scene3D = "Scene3D"
}

class Scene extends Core.BaseObject
{
    protected _Active: boolean;
    private _BackColor: Math.Color;
    private _Events: SceneEventPackage;
    private _Objects: SceneObject[];
    public get BackColor(): Math.Color { return this._BackColor; }
    public set BackColor(value: Math.Color) { this._BackColor = value; }
    public get Events(): SceneEventPackage { return this._Events; }
    public get Objects(): SceneObject[] { return this._Objects; }
    public set Objects(value: SceneObject[]) { this._Objects = value; }
    public get Active(): boolean { return this._Active; }
    public get DrawnObjects(): DrawObject[]
    {
        return <DrawObject[]>this.FindByType(DrawObject.name);
    }
    public get SoundObjects(): SoundObject[]
    {
        return <SoundObject[]>this.FindByType(SoundObject.name);
    }
    public get Lights(): Light[]
    {
        return <Light[]>this.FindByDrawType(Light.name);
    }
    public get ActiveLights(): Light[]
    {
        return <Light[]>this.FindActiveByDrawType(Light.name);
    }
    public constructor(Old?: Scene)
    {
        super(Old);
        this._Active = false;
        this._BackColor = Math.Color.FromRGBA(40, 40, 40, 255);
        this._Events = new SceneEventPackage();
        this._Objects = [];
        if (Old)
        {
            this._BackColor = Old._BackColor;
            this._Events = Old._Events.Copy();
            this._Objects = Old._Objects.map(Entry => Entry.Copy());
        }
    }
    public Copy(): Scene
    {
        return new Scene(this);
    }
    public Attach(SO: SceneObject): void
    {
        // Virtual
        this.Data[SO.ID] = SO;
        this._Objects.push(SO);
        SO.OnAttach({ Scene: this });
    }
    public Remove(SO: SceneObject): void
    {
        // Virtual
        let Index: number = this._Objects.indexOf(SO);
        if (Index != -1)
        {
            SO.OnRemove({ Scene: this });
            this._Objects.splice(Index, 1);
        }
        else Util.Log.Warning("Object " + SO.Name + " / " + SO.ID + " does not exist in scene " + this.Name + " / " + this.ID, { Objects: this._Objects, Object });
    }
    public FindByData(Key: string, Data?: Core.BaseObjectProperty): SceneObject[]
    {
        return this.Objects.filter(Item => (Item.Data && Item.Data[Key] && (Data == null || Item.Data[Key] == Data)));
    }
    public FindByType(ObjectType: string): SceneObject[]  
    {
        return this.Objects.filter(Item => Item.Is(ObjectType));
    }
    public FindByExactType(ObjectType: string): SceneObject[]  
    {
        return this.Objects.filter(Item => Item.Type == ObjectType);
    }
    public FindActive(ObjectType?: string): DrawObject[]  
    {
        let Objects: DrawObject[] = <DrawObject[]>this.FindByType(Type.DrawObject);
        if (ObjectType) Objects = Objects.filter(Item => Item.Is(ObjectType));
        return Objects.filter(Item => Item.Active);
    }
    public FindColliders(Tags?: string[]): DrawObject[]  
    {
        let Objects: DrawObject[] = <DrawObject[]>this.FindByType(Type.DrawObject);
        if (!Tags) return Objects.filter(Item => (Item.Collision.Active));
        return Objects.filter(Item => (Item.Collision.Active && Item.HasAnyOf(Tags)));
    }
    public Composite(Chunk: Scene): boolean
    {
        // Virtual
        return false;
    }
    public OnLeave(): void
    {
        // Virtual
        this._Active = false;
    }
    public OnSwitch(): void
    {
        // Virtual
        this._Active = true;
        let UIParent: HTMLElement = document.getElementById("ui-parent");
        if (UIParent) UIParent.innerHTML = "";
        for (let i in this._Objects) this._Objects[i].OnSwitch();
    }
    public OnResize(Args: EventArguments): void
    {
        // Virtual
        for (let i in this._Objects) this._Objects[i].OnResize(Args);
    }
    public Serialize(): any
    {
        // Virtual
        return {
            ...super.Serialize(),
            BackColor: this._BackColor.Serialize(),
            Objects: this._Objects.map(Entry => Entry.Serialize()),
        };
    }
    public Deserialize(Data: any): void
    {
        // Virtual
        this._BackColor.Deserialize(Data.BackColor);
        this._Objects = [];
        for (let i in Data.Objects)
        {

        }
    }
}
