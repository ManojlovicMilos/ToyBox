export {
    Tag,
    BaseObject,
    TagCollection,
    BaseObjectCollection
};

import { Uuid } from "./Uuid";

const INFIX = "_";

type Tag = string | number | boolean;
type TagCollection = { [key: string]: Tag }
type BaseObjectCollection = { [key: string]: BaseObject }

class BaseObject
{
    // Abstract
    protected _ID: string;
    protected _Name: string;
    protected _ResourceKey: string;
    protected _Types: string[];
    protected _Tags: TagCollection;
    public get ID(): string { return this._ID; }
    public get Name(): string { return this._Name; }
    public set Name(value: string) { this._Name = value; }
    public get ResourceKey(): string { return this._ResourceKey; }
    public set ResourceKey(value: string) { this._ResourceKey = value; }
    public get Type(): string { return this._Types[this._Types.length - 1]; }
    public get Tags(): TagCollection { return this._Tags; }
    public constructor(Old?: BaseObject)
    {
        this._Types = [];
        if (Old)
        {
            this._ID = Uuid.Create();
            this._Name = Old._Name;
            this._ResourceKey = Old._Name + INFIX + Old._ID;
            this._Tags = { ...Old._Tags };
        }
        else
        {
            this._ID = Uuid.Create();
            this._Name = this._ID;
            this._ResourceKey = this._ID;
            this._Tags = {};
        }
    }
    public Copy(): BaseObject
    {
        return new BaseObject(this);
    }
    public Is(Type: string): boolean
    {
        return this._Types.indexOf(Type) != -1;
    }
    public IsAnyOf(Types: string[]): boolean
    {
        for (let i in Types)
        {
            if (this._Types.indexOf(Types[i]) != -1) return true;
        }
        return false;
    }
    public HasTag(QueryTag: string): boolean
    {
        return !!this._Tags[QueryTag];
    }
    public HasTags(QueryTags: string[]): boolean
    {
        for (let i in QueryTags)
        {
            if (this._Tags[QueryTags[i]] != null) return true;
        }
        return false;
    }
    protected RegisterType(Type: string): void
    {
        this._Types.push(Type);
    }
}
