export class BaseObject
{
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

declare enum SerializationType
{
    Data = "Data",
    Resource = "Resource"
}

declare enum GraphicsQuality
{
    Low = 1,
    Medium = 2,
    High = 4,
}

declare class DataSettings
{
    LibPath: string;
    SerializationType: SerializationType;
    IgnoredPrefixes: string[];
}
declare class GraphicsSettings
{
    Quality: GraphicsQuality;
}
declare class CollisionSettings
{
    AdditionalSideCheck: boolean;
}
declare class MathematicsSettings
{
    Collision: CollisionSettings;
}
declare class UISettings
{
    IgnoreUICSS: boolean;
    GlobalFontScale: number;
    GlobalFontFamily: string;
}
export class Settings
{
    static Version: string;
    static Data: DataSettings;
    static Graphics: GraphicsSettings;
    static Mathematics: MathematicsSettings;
    static UI: UISettings;
}

export class Uuid
{
    static Create() : string
}

export as namespace Core;