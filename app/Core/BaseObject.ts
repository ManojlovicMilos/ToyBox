export {
    Tag,
    BaseObject,
    TagCollection,
    BaseObjectCollection
};

import { Uuid } from "./Uuid";

type Tag = string | number | boolean;
type TagCollection = { [key: string]: Tag };
type BaseObjectCollection = { [key: string]: BaseObject };

abstract class BaseObject {
    protected _ID: string;
    protected _Name: string;
    protected _ResourceKey: string;
    protected _Types: string[];
    protected _Tags: TagCollection;
    protected _Children: BaseObject[];
    protected _ChildrenMap: { [key: string]: BaseObject }
    public get ID(): string { return this._ID; }
    public get Name(): string { return this._Name; }
    public set Name(value: string) { this._Name = value; }
    public get ResourceKey(): string { return this._ResourceKey; }
    public set ResourceKey(value: string) { this._ResourceKey = value; }
    public get Type(): string { return this._Types[this._Types.length - 1]; }
    public get Tags(): TagCollection { return this._Tags; }
    public get Children(): BaseObject[] { return this._Children; }

    public constructor(Old?: BaseObject) {
        this._Types = ['BaseObject'];
        if (Old) {
            this._ID = Uuid.Create();
            this._Name = Old._Name;
            this._ResourceKey = Old._ResourceKey;
            this._Tags = { ...Old._Tags };
            this._Children = Old._Children.map((Child: BaseObject) => Child.Duplicate());
        }
        else {
            this._ID = Uuid.Create();
            this._Tags = {};
            this._Name = this._ID;
            this._Children = [];
        }
    }

    public Duplicate(): BaseObject {
        return this; // new BaseObject(this) for non-abstract
    }

    public Is(Type: string): boolean {
        return this._Types.indexOf(Type) != -1;
    }

    public IsExactly(Type: string): boolean {
        return this.Type === Type;
    }

    public IsAnyOf(Types: string[]): boolean {
        for (let i in Types) {
            if (this._Types.indexOf(Types[i]) != -1) return true;
        }
        return false;
    }

    public HasTag(QueryTag: string, QueryTagValue?: Tag): boolean {
        return !!this._Tags[QueryTag] && (!QueryTagValue || this._Tags[QueryTag] === QueryTagValue);
    }

    public HasTags(QueryTags: string[]): boolean {
        for (let i in QueryTags) {
            if (this._Tags[QueryTags[i]] != null) return true;
        }
        return false;
    }

    public Attach(Child: BaseObject): void {
        this._Children.push(Child);
        this._ChildrenMap[Child.ID] = Child;
        this.OnAttachChild(Child);
    }

    public Remove(ChildID: string): void {
        this._Children = this._Children.filter((Child: BaseObject) => Child.ID !== ChildID);
        this._ChildrenMap[ChildID] = undefined;
        this.OnRemoveChild(ChildID);
    }

    public HasChild(ChildID: string): boolean {
        return !!this._ChildrenMap[ChildID]
    }

    public FindChild(ChildID: string): BaseObject | undefined {
        return this._ChildrenMap[ChildID];
    }

    public FindChildrenByType(ObjectType: string): BaseObject[] {
        return this.Children.filter(Item => Item.Is(ObjectType));
    }

    public FindChildrenByExactType(ObjectType: string): BaseObject[]  
    {
        return this.Children.filter(Item => Item.IsExactly(ObjectType));
    }

    public FindChildrenByTags(Key: string, Value?: Tag): BaseObject[]
    {
        return this.Children.filter(Item => Item.HasTag(Key, Value));
    }

    public OnAttachChild(Child: BaseObject): void {
        // Virtual
    }

    public OnRemoveChild(ChildID: string): void {
        // Virtual
    }

    public OnAttachToParent(Parent: BaseObject): void {
        // Virtual
    }

    public OnRemoveFromParent(Parent: BaseObject): void {
        // Virtual
    }

    protected RegisterType(Type: string): void {
        this._Types.push(Type);
    }
}
