export class BaseObject
{
    // Abstract
    ID:string;
    Name:string;
    ResourceKey:string;
    Types:string[];
    Data: { [key: string]:any };
    constructor(Old?:BaseObject)
    Copy() : BaseObject
    Is(Type:string) : boolean
    IsAnyOf(Types:string[]) : boolean
    HasAnyOf(Data:string[]) : boolean
    RegisterType(Type:string) : void
    RegisterFactory(Factory:Function) : void
    Contains(Key:string) : boolean
    Serialize() : any
    Deserialize(Data:any) : void
}

export class Resources
{
    static All:Resources;
    constructor(Old?:Resources)
    Copy() : Resources
    Get(Key:string) : BaseObject
    New(Key:string) : BaseObject
    Set(Key:string, Data:BaseObject) : void
    Exists(Key:string) : boolean
}

export class Serialization
{
    static Register(Type:string, Factory:Function) : boolean
    static Deserialize(Data:any) : BaseObject
    static Serialize(Data:BaseObject) : any
}

export enum Quality
{
    Low = 1,
    Medium = 2,
    High = 4
}

export class Settings
{
    static Version:string;
    static LibPath:string;
    static Graphics:Quality;
    static IgnoreUICSS:boolean;
    static GlobalFontScale:number;
    static GlobalFontFamily:string;
}

export class Uuid
{
    static Create() : string
}

export as namespace Core;