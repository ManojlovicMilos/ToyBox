export  { Game };

import * as Core from "./../../Core/Core";
import { Scene } from "./../Scene/Scene";
import { SceneObject } from "./../Scene/SceneObject";

const DEFAULT_GAME_NAME = "ToyBox Game";

class Game extends Core.BaseObject
{
    private _Name:string;
    private _Scenes:Scene[];
    private _Assets:SceneObject[];
    public get Name():string { return this._Name; }
    public set Name(value:string) { this._Name = value; this.UpdateName(); }
    public get Scenes():Scene[] { return this._Scenes; }
    public set Scenes(value:Scene[]) { this._Scenes = value; }
    public get Assets():SceneObject[] { return this._Assets; }
    public set Assets(value:SceneObject[]) { this._Assets = value; }
    public constructor(Old?: Game, Name?:string)
    {
        super(Old);
        this._Name = Name || DEFAULT_GAME_NAME;
        this._Scenes = [];
        if(Name != null) this._Name = Name;
        this.UpdateName();
    }
    public Copy() : Game
    {
        let New:Game = new Game();
        New._Name = this._Name;
        return New;
    }
    private UpdateName() : void
    {
        let Title:HTMLElement = document.getElementById("title") as HTMLElement;
        Title.innerHTML = this._Name;
    }
    public Attach(Scene: Scene) : void
    {
        this.Data[Scene.Name] = Scene;
        this._Scenes.push(Scene);
    }
    public Contains(Name:string)
    {
        return !!this.Data[Name];
    }
    public Remove(Scene:Scene) : void
    {
        this.Data[Scene.Name] = null;
        this._Scenes.splice(this._Scenes.indexOf(Scene), 1);
    }
    public RemoveByName(SceneName:string) : void
    {
        this._Scenes.splice(this.Data[SceneName], 1);
        this.Data[SceneName] = null;
    }
    public FindByData(Key:string, Data?:any) : any[]
    {
        let Objects:any[] = [];
        for(let i = 0; i < this._Scenes.length; i++)
        {
            if(this._Scenes[i].Data[Key])
            {
                if(Data)
                {
                    if(this._Scenes[i].Data[Key] == Data) Objects.push(this._Scenes[i]);
                }
                else Objects.push(this._Scenes[i]);
            }
        }
        return Objects;
    }
}
