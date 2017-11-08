export  { SceneType, Scene };

import * as Data from "./../../Data/Data";
import * as Util from "./../../Util/Util";
import * as Math from "./../../Mathematics/Mathematics";

import { EventPackage } from "./../Events/Events";
import { SceneObject } from "./SceneObject";

enum SceneType
{
    Scene2D,
    Scene3D
}
class Scene
{
    private _ID:string;
    private _Name:string;
    private _Type:SceneType;
    private _BackColor:Math.Color;
    private _Events:EventPackage;
    private _Objects:SceneObject[];
    public get ID():string { return this._ID; }
    public get Name():string { return this._Name; }
    public set Name(value:string) { this._Name = value; }
    public get Type():SceneType { return this._Type; }
    public set Type(value:SceneType) { this._Type = value; }
    public get BackColor():Math.Color { return this._BackColor; }
    public set BackColor(value:Math.Color) { this._BackColor = value; }
    public get Events():EventPackage { return this._Events; }
    public get Objects():SceneObject[] { return this._Objects; }
    public set Objects(value:SceneObject[]) { this._Objects = value; }
    public Data: { [key: string]:any; } = {};
    public constructor(Old?:Scene)
    {
        if(Old != null)
        {
            this._ID = Data.Uuid.Create();
            this._Name = Old._Name;
            this._BackColor = Old._BackColor;
            this._Events = Old._Events.Copy();
            this._Objects = [];
            for(let i = 0; i < Old._Objects.length; i++) this._Objects.push(Old._Objects[i].Copy());
        }
        else
        {
            this._ID = Data.Uuid.Create();
            this._Name = this._ID;
            this._BackColor = Math.Color.FromRGBA(40,40,40,255);
            this._Events = new EventPackage();
            this._Objects = [];
        }
    }
    public Copy() : Scene
    {
        return new Scene(this);
    }
    public AddSceneObject(Object:SceneObject) : void
    {
        // Virtual
        this.Data[Object.ID] = Object;
        this._Objects.push(Object);
    }
    public RemoveSceneObject(Object:SceneObject) : void
    {
        let Index:number = this._Objects.indexOf(Object);
        if(Index != -1)
        {
            this._Objects.splice(Index, 1);
        }
        else Util.Log.Warning("Object " + Object.Name + "/" + Object.ID + " does not exist in scene " + this.Name + "/" + this.ID);
    }
    public GetObjectsWithData(Key:string, Data?:any) : any[]
    {
        let Objects:any[] = [];
        for(let i = 0; i < this.Objects.length; i++)
        {
            if(this.Objects[i].Data[Key])
            {
                if(Data)
                {
                    if(this.Objects[i].Data[Key] == Data) Objects.push(this.Objects[i]);
                }
                else Objects.push(this.Objects[i]);
            }
        }
        return Objects;
    }
}