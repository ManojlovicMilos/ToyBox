export  { BaseObject };

import { Uuid } from "./Uuid";
import { Settings } from "./Settings";
import { Serialization } from "./Serialization";

const TOYBOX_PREFIX = "TOYBOX_";

class BaseObject
{
    // Abstract
    protected _ID:string;
    protected _Name:string;
    protected _ResourceKey:string;
    protected _Types:string[];
    protected _Data: { [key: string]:any };
    public get ID():string { return this._ID; }
    public get Name():string { return this._Name; }
    public set Name(value:string) { this._Name = value; }
    public get ResourceKey():string { return this._ResourceKey; }
    public set ResourceKey(value:string) { this._ResourceKey = value; }
    public get Type():string { return this._Types[this._Types.length - 1]; }
    public get Data():{ [key: string]:any } { return this._Data; }
    public constructor(Old?:BaseObject)
    {
        this._Types = [];
        if(Old != null)
        {
            this._ID = Uuid.Create();
            this._Name = Old._Name;
            this._Data = { };
        }
        else
        {
            this._ID = Uuid.Create();
            this._Name = this._ID;
            this._Data = { };
        }
    }
    public Copy() : BaseObject
    {
        return new BaseObject(this);
    }
    public Is(Type:string) : boolean
    {
        return this._Types.indexOf(Type) != -1;
    }
    public IsAnyOf(Types:string[]) : boolean
    {
        for(let i in Types)
        {
            if(this._Types.indexOf(Types[i]) != -1) return true;
        }
        return false;
    }
    public HasAnyOf(Data:string[]) : boolean
    {
        for(let i in Data)
        {
            if(this._Data[Data[i]] != null) return true;
        }
        return false;
    }
    protected RegisterType(Type:string) : void
    {
        this._Types.push(Type);
    }
    protected RegisterFactory(Factory:Function) : void
    {
        Serialization.Register(this.Type, Factory);
    }
    public Contains(Key:string) : boolean
    {
        return !!this._Data[Key];
    }
    public Serialize() : any
    {
        // Virtual
        let SO:any =
        {
            ID: this._ID,
            Name: this._Name,
            Type: this.Type,
            Data: BaseObject.CleanData(this.Data)
        };
        return SO;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        this._ID = Data.ID;
        this._Name = Data.Name;
        this._Data = Data.Data;
    }
    private static CleanData(Data:any) : any
    {
        let NewData:any = {};
        for(let Key in Data)
        {
            if(Key.startsWith(TOYBOX_PREFIX)) continue;
            let Skip: boolean = false;
            Settings.Data.IgnoredPrefixes.forEach(Entry => { Key.startsWith(Entry + "_") });
            if(Skip) continue;
            NewData[Key] = Data;
        }
        return NewData;
    }
}