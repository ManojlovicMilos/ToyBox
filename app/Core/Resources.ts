export  { Resources };

import { BaseObject } from "./BaseObject";

class Resources
{
    public static All:Resources;
    private _Objects: { [key: string]:BaseObject };
    public constructor(Old?:Resources)
    {
        if(Old != null)
        {
            this._Objects = { ...Old._Objects };
        }
        else
        {
            this._Objects = { };
        }
    }
    public Copy() : Resources
    {
        return new Resources(this);
    }
    public Get(Key:string) : BaseObject
    {
        return this._Objects[Key];
    }
    public New(Key:string) : BaseObject
    {
        return this._Objects[Key].Copy();
    }
    public Set(Key:string, Data:BaseObject) : void
    {
        Data.ResourceKey = Key;
        this._Objects[Key] = Data;
    }
    public Exists(Key:string) : boolean
    {
        return this._Objects[Key] != null;
    }
}