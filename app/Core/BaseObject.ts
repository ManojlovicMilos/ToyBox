import Uuid from './Uuid';
import Tag, { TagCollection } from './Tag';
import inject from './Services/InjectionManager';
import { SerializedObject } from './SerializedDataTypes';

const OBJECT_TYPE = 'BaseObject';

export default abstract class BaseObject {
    public id: string;
    public types: string[];
    public tags: TagCollection;
    public children: BaseObject[];
    protected _name: string;
    protected childrenMap: { [key: string]: BaseObject }

    protected uuid: Uuid;
    
    public get name() { return this._name; }
    public set name(value: string) { this.name = value; }
    public get type(): string { return this.types[this.types.length - 1]; }

    public constructor(old?: BaseObject) {
        this.types = [OBJECT_TYPE];
        this.uuid = inject(Uuid);
        this.id = this.uuid.create();
        this.tags = old ? { ...old.tags } : {};
        this.name = old?.name || this.id;
        this.children = old ? old.children.map((child: BaseObject) => child.duplicate()) : [];
    }

    // virtual
    public duplicate(): BaseObject {
        return this;
    }

    public is(type: string): boolean {
        return this.types.indexOf(type) != -1;
    }

    public isExactly(type: string): boolean {
        return this.type === type;
    }

    public isAnyOf(types: string[]): boolean {
        for (let i in types) {
            if (this.types.indexOf(types[i]) != -1) return true;
        }
        return false;
    }

    public hasTag(queryTag: string, queryTagValue?: Tag): boolean {
        return !!this.tags[queryTag] && (!queryTagValue || this.tags[queryTag] === queryTagValue);
    }

    public hasTags(queryTags: string[]): boolean {
        for (let i in queryTags) {
            if (this.tags[queryTags[i]] != null) return true;
        }
        return false;
    }

    public attach(child: BaseObject): void {
        this.children.push(child);
        this.childrenMap[child.id] = child;
        this.onAttachChild(child);
    }

    public remove(childId: string): void {
        this.children = this.children.filter((child: BaseObject) => child.id !== childId);
        this.childrenMap[childId] = undefined;
        this.onRemoveChild(childId);
    }

    public hasChild(childId: string): boolean {
        return !!this.childrenMap[childId]
    }

    public findChild(childId: string): BaseObject | undefined {
        return this.childrenMap[childId];
    }

    public findChildrenByType(objectType: string): BaseObject[] {
        return this.children.filter(item => item.is(objectType));
    }

    public findChildrenByExactType(objectType: string): BaseObject[] {
        return this.children.filter(item => item.isExactly(objectType));
    }

    public findChildrenByTags(key: string, value?: Tag): BaseObject[] {
        return this.children.filter(item => item.hasTag(key, value));
    }

    // virtual
    public onAttachChild(child: BaseObject): void {}

    // virtual
    public onRemoveChild(childID: string): void {}

    // virtual
    public onAttachToParent(parent: BaseObject): void {}

    // virtual
    public onRemoveFromParent(parent: BaseObject): void {}

    // virtual
    public onSerialize(serialized: SerializedObject): SerializedObject {
        return serialized;
    }

    // virtual
    public onDeserialize(serialized: SerializedObject): void {}

    // virtual
    public skipSerializeKeys(): string[] {
        return [];
    }

    protected registerType(type: typeof BaseObject): void {
        this.types.push(type.name);
        // add creating factories
    }
}
