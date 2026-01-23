export enum Quality {
    Low = 1,
    Medium = 2,
    High = 4,
}

export class Settings {
    static Version: string;
    static Graphics: Quality;
    static EngineUIStyle: boolean;
    static GlobalFontScale: number;
    static GlobalFontFamily: string;
    static GlobalLineHeightFactor: number;
}

export abstract class BaseObject {
    static TypeNameToken: string;

    Name: string;
    Types: string[];
    Children: BaseObject[];
    Data: { [key: string]: any };
    
    get ID(): string;
    get Type(): string;

    constructor(Old?: BaseObject)
    Copy(): BaseObject
    Is(Type: string): boolean
    Is(Type: typeof BaseObject): boolean
    Is(Type: string | typeof BaseObject)
    IsExactly(Type: string): boolean
    IsExactly(Type: typeof BaseObject): boolean
    IsExactly(Type: string | typeof BaseObject): boolean
    IsAnyOf(Types: string[]): boolean
    IsAnyOf(Types: (typeof BaseObject)[]): boolean
    IsAnyOf(Types: string[] | (typeof BaseObject)[]): boolean
    HasData(DataQuery: string, ValueQuery?: any): boolean
    HasMultipleData(DataQueries: string[]): boolean
    Attach(Child: BaseObject): void
    Remove(Child: string): void
    Remove(Child: BaseObject): void
    Remove(Child: string | BaseObject): void
    HasChild(ChildID: string): boolean
    FindChild<T extends BaseObject>(ChildID: string): T | undefined
    FindChildByName<T extends BaseObject>(Name: string): T | undefined
    FindChildrenByType<T extends BaseObject>(Type: string | typeof BaseObject): T[]
    FindChildrenByExactType<T extends BaseObject>(Type: string | typeof BaseObject): T[]
    FindChildrenByData<T extends BaseObject>(DataQuery: string, ValueQuery?: any): T[]
    FindChildIndexByName(Name: string): number
    OnAttach(Parent: BaseObject): void
    OnRemove(Parent: BaseObject): void
    OnAttachChild(Child: BaseObject): void
    OnRemoveChild(ChildID: string): void
    Serialize(): any
    Deserialize(Data: any): void

    protected RegisterType(Type: typeof BaseObject, IsAbstract?: boolean): void
}

export class Service { }

export function Inject<T>(service: typeof Service): T;

export function Injectable(InjectionToken?: string);

export function TypedObject(TypeNameToken?: string);

export function CreateUuid(): string;

export class UuidService extends Service {
    Create(): string
}

export as namespace Core;
