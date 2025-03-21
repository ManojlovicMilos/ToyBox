import Uuid from "./Uuid";
import Tag, { TagCollection } from "./Tag";

export default abstract class BaseObject {
    protected _id: string;
    protected _name: string;
    protected _resourceKey: string;
    protected _types: string[];
    protected _tags: TagCollection;
    protected _children: BaseObject[];
    protected _childrenMap: { [key: string]: BaseObject }
    public get id(): string { return this._id; }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get resourceKey(): string { return this._resourceKey; }
    public set resourceKey(value: string) { this._resourceKey = value; }
    public get type(): string { return this._types[this._types.length - 1]; }
    public get tags(): TagCollection { return this._tags; }
    public get children(): BaseObject[] { return this._children; }

    public constructor(old?: BaseObject) {
        this._types = ['BaseObject'];
        if (old) {
            this._id = Uuid.Create();
            this._name = old._name;
            this._resourceKey = old._resourceKey;
            this._tags = { ...old._tags };
            this._children = old._children.map((Child: BaseObject) => Child.Duplicate());
        }
        else {
            this._id = Uuid.Create();
            this._tags = {};
            this._name = this._id;
            this._children = [];
        }
    }

    public Duplicate(): BaseObject {
        return this; // new BaseObject(this) for non-abstract
    }

    public Is(type: string): boolean {
        return this._types.indexOf(type) != -1;
    }

    public IsExactly(type: string): boolean {
        return this.type === type;
    }

    public IsAnyOf(types: string[]): boolean {
        for (let i in types) {
            if (this._types.indexOf(types[i]) != -1) return true;
        }
        return false;
    }

    public HasTag(queryTag: string, queryTagValue?: Tag): boolean {
        return !!this._tags[queryTag] && (!queryTagValue || this._tags[queryTag] === queryTagValue);
    }

    public HasTags(queryTags: string[]): boolean {
        for (let i in queryTags) {
            if (this._tags[queryTags[i]] != null) return true;
        }
        return false;
    }

    public Attach(child: BaseObject): void {
        this._children.push(child);
        this._childrenMap[child.id] = child;
        this.OnAttachChild(child);
    }

    public Remove(childId: string): void {
        this._children = this._children.filter((child: BaseObject) => child.id !== childId);
        this._childrenMap[childId] = undefined;
        this.OnRemoveChild(childId);
    }

    public HasChild(childId: string): boolean {
        return !!this._childrenMap[childId]
    }

    public FindChild(childId: string): BaseObject | undefined {
        return this._childrenMap[childId];
    }

    public FindChildrenByType(objectType: string): BaseObject[] {
        return this.children.filter(item => item.Is(objectType));
    }

    public FindChildrenByExactType(objectType: string): BaseObject[] {
        return this.children.filter(item => item.IsExactly(objectType));
    }

    public FindChildrenByTags(key: string, value?: Tag): BaseObject[] {
        return this.children.filter(item => item.HasTag(key, value));
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

    protected RegisterType(type: string): void {
        this._types.push(type);
    }
}
