import UuidService from './Uuid';
import LogService from './Log';
import Tag, { TagCollection } from './Tag';
import inject from './Services/InjectionManager';
import { SerializedObject } from './SerializedDataTypes';

abstract class BaseObject {
    public id: string;
    public types: string[];
    public tags: TagCollection;
    public children: BaseObject[];
    protected _name: string;
    protected childrenMap: { [key: string]: BaseObject }

    protected log: LogService;
    protected uuid: UuidService;
    
    public get name() { return this._name; }
    public set name(value: string) { this.name = value; }
    public get type(): string { return this.types[this.types.length - 1]; }

    public constructor(old?: BaseObject) {
        this.types = [BaseObject.name];
        this.log = inject(LogService);
        this.uuid = inject(UuidService);
        this.id = this.uuid.create();
        this.tags = old ? { ...old.tags } : {};
        this.name = old?.name || this.id;
        this.children = old ? old.children.map((child: BaseObject) => child.duplicate()) : [];
    }

    // virtual
    public duplicate(): BaseObject {
        return this;
    }

    public is(type: string): boolean
    public is(type: typeof BaseObject): boolean
    public is(type: string | typeof BaseObject): boolean {
        const typeName = typeof type === 'string' ? type : type.name;
        return this.types.includes(typeName);
    }

    public isExactly(type: string): boolean
    public isExactly(type: typeof BaseObject): boolean
    public isExactly(type: string | typeof BaseObject): boolean {
        const typeName = typeof type === 'string' ? type : type.name;
        return this.type === typeName;
    }

    public isAnyOf(types: string[]): boolean
    public isAnyOf(types: (typeof BaseObject)[]): boolean
    public isAnyOf(types: string[] | (typeof BaseObject)[]): boolean {
        return types.find((type: string | typeof BaseObject) => this.is(type as string)).length > 0;
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
        child.onAttachToParent(this);
    }

    public remove(child: string): void
    public remove(child: BaseObject): void
    public remove(child: string | BaseObject): void {
        const childId = typeof child === 'string' ? child : child.id;
        if (this.childrenMap[childId]) {
            this.childrenMap[childId].onRemoveFromParent(this);
        }
        this.children = this.children.filter((child: BaseObject) => child.id !== childId);
        this.childrenMap[childId] = undefined;
        this.onRemoveChild(childId);
    }

    public hasChild(childId: string): boolean {
        return !!this.childrenMap[childId]
    }

    public findChild<T extends BaseObject>(childId: string): T | undefined {
        return this.childrenMap[childId] as T;
    }

    public findChildByName<T extends BaseObject>(name: string): T | undefined {
        return this.children.find((child: BaseObject) => child.name === name) as T;
    }

    public findChildrenByType<T extends BaseObject>(type: string | typeof BaseObject): T[] {
        const typeName = typeof type === 'string' ? type : type.name;
        return this.children.filter(item => item.is(typeName)) as T[];
    }

    public findChildrenByExactType<T extends BaseObject>(type: string | typeof BaseObject): T[] {
        const typeName = typeof type === 'string' ? type : type.name;
        return this.children.filter(item => item.isExactly(typeName)) as T[];
    }

    public findChildrenByTags<T extends BaseObject>(key: string, value?: Tag): T[] {
        return this.children.filter(item => item.hasTag(key, value)) as T[];
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

export default BaseObject;
