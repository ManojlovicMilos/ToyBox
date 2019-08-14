export  { Scene };

import * as Core from "./../../Core/Core";
import * as Util from "./../../Util/Util";
import * as Math from "./../../Mathematics/Mathematics";

import { Type } from "./../Types";
import { SceneEvents } from "./../Events/SceneEvents";
import { SceneObject } from "../SceneObject/SceneObject";
import { SoundObject } from "../SceneObject/SoundObject";
import { DrawObject } from "../SceneObject/DrawObject/DrawObject";
import { Light } from "../SceneObject/DrawObject/Light/Light";

const DEFAULT_SCENE_COLOR: Math.Color = Math.Color.FromRGBA(40,40,40,255);

class Scene extends Core.BaseObject
{
    protected _Active:boolean;
    private _BackColor:Math.Color;
    private _Events:SceneEvents;
    private _Objects:SceneObject[];
    public get Active():boolean { return this._Active; }
    public get BackColor():Math.Color { return this._BackColor; }
    public set BackColor(value:Math.Color) { this._BackColor = value; }
    public get Events():SceneEvents { return this._Events; }
    public get Objects():SceneObject[] { return this._Objects; }
    public set Objects(value:SceneObject[]) { this._Objects = value; }
    public get DrawObjects() : DrawObject[] { return <DrawObject[]>this.FindByType(Type.DrawObject); }
    public get SoundObjects() : SoundObject[] { return <SoundObject[]>this.FindByType(Type.SoundObject); }
    public get Lights() : Light[] { return <Light[]>this.FindByType(Type.Light); }
    public get ActiveLights() : Light[] { return <Light[]>this.FindActive(Type.Light); }
    public constructor(Old?:Scene)
    {
        super(Old);
        this.RegisterType(Type.Scene);
        this.RegisterFactory(() => new Scene());
        this._Objects = [];
        if(Old != null)
        {
            this._BackColor = Old._BackColor;
            this._Events = Old._Events.Copy();
            for(let i = 0; i < Old._Objects.length; i++) this._Objects.push(Old._Objects[i].Copy());
        }
        else
        {
            this._BackColor = DEFAULT_SCENE_COLOR;
            this._Events = new SceneEvents();
        }
    }
    public Copy() : Scene
    {
        return new Scene(this);
    }
    public Attach(Object:SceneObject) : void
    {
        // Virtual
        this.Data[Object.ID] = Object;
        this._Objects.push(Object);
        Object.OnAttach({Scene:this});
    }
    public Remove(Object:SceneObject) : void
    {
        // Virtual
        let Index:number = this._Objects.indexOf(Object);
        if(Index != -1)
        {
            Object.OnRemove({Scene:this});
            this._Objects.splice(Index, 1);
        }
        else Util.Log.Warning("Object " + Object.Name + "/" + Object.ID + " does not exist in scene " + this.Name + "/" + this.ID, {Objects:this._Objects, Object});
    }
    public FindByData(Key:string, Data?:any) : SceneObject[]
    {
        return this.Objects.filter(Item => (Item.Data && Item.Data[Key] && (Data == null || Item.Data[Key] == Data)));
    }
    public FindByType(ObjectType:string) : SceneObject[]  
    {  
        return this.Objects.filter(Item => Item.Is(ObjectType));
    }
    public FindByExactType(ObjectType:string) : SceneObject[]  
    {  
        return this.Objects.filter(Item => Item.Type == ObjectType);
    } 
    public FindActive(ObjectType?:string) : DrawObject[]  
    {  
        let Objects:DrawObject[] = <DrawObject[]>this.FindByType(Type.DrawObject);
        if(ObjectType) Objects = Objects.filter(Item => Item.Is(ObjectType));
        return Objects.filter(Item => Item.Active);
    }
    public FindColliders(Tags?:string[]) : DrawObject[]  
    {  
        let Objects:DrawObject[] = <DrawObject[]>this.FindByType(Type.DrawObject);
        if(!Tags) return Objects.filter(Item => (Item.Collision.Active));
        return Objects.filter(Item => (Item.Collision.Active && Item.HasAnyOf(Tags)));
    }  
    public Composite(Chunk:Scene) : boolean
    {
        // Virtual
        return false;
    }
    public OnLeave() : void
    {
        // Virtual
        this._Active = false;
    }
    public OnSwitch() : void
    {
        // Virtual
        this._Active = true;
        let UIParent:HTMLElement = document.getElementById("ui-parent");
        if(UIParent) UIParent.innerHTML = "";
        for(let i in this._Objects) this._Objects[i].OnSwitch();
    }
    public OnResize(Args:any) : void
    {
        // Virtual
        for(let i in this._Objects) this._Objects[i].OnResize(Args);
    }
    public Serialize() : any
    {
        // Override
        let S = super.Serialize();
        S.BackColor = this._BackColor.Serialize();
        S.Objects = [];
        for(let i in this._Objects)
        {
            S.Objects.push(Core.Serialization.Serialize(this._Objects[i]));
        }
        return S;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._BackColor.Deserialize(Data.BackColor);
        this._Objects = [];
        for(let i in Data.Objects)
        {
            this.Attach(<SceneObject>Core.Serialization.Deserialize(Data.Objects[i]));
        }
    }
}