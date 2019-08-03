export  { Game };

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";
import { Scene } from "./../Scene/Scene";

const TITLE_ELEMENT = "title";
const DEFAULT_NAME = "ToyBox Game";

class Game extends Core.BaseObject
{
    private _Scenes:Scene[];
    public set Name(value:string) { this._Name = value; this.UpdatePageName(); }
    public get Scenes():Scene[] { return this._Scenes; }
    public set Scenes(value:Scene[]) { this._Scenes = value; }
    public constructor(Old?:Game, Name?:string)
    {
        super(Old);
        this.RegisterType(Type.Game);
        this.RegisterFactory(() => new Game());
        if(Old) 
        {
            this._Scenes = [];
            for(let i in Old._Scenes) this._Scenes.push(Old._Scenes[i].Copy());
        }
        else 
        {
            this._Name = DEFAULT_NAME;
            if(Name != null) this._Name = Name;
            this._Scenes = [];
        }
        this.UpdatePageName();
    }
    public Copy() : Game
    {
        let New:Game = new Game();
        New._Name = this._Name;
        return New;
    }
    private UpdatePageName() : void
    {
        let Title:HTMLElement = document.getElementById(TITLE_ELEMENT) as HTMLElement;
        Title.innerHTML = this._Name;
    }
    public Attach(Scene:Scene) : void
    {
        this.Data[Scene.Name] = Scene;
        this._Scenes.push(Scene);
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