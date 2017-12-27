import * as Math from "./toybox-math";

export class EventPackage
{
    Closing:Function[];
    KeyPress:Function[];
    KeyDown:Function[];
    KeyUp:Function[];
    Load:Function[];
    MouseClick:Function[];
    MouseDown:Function[];
    MouseUp:Function[];
    MouseMove:Function[];
    MouseWheel:Function[];
    RenderFrame:Function[];
    Resize:Function[];
    TimeTick:Function[];
    OperationProgress:Function[];
    OperationFinished:Function[];
    SpriteSetAnimationComplete:Function[];
    constructor(Old?:EventPackage)
    Copy() : EventPackage
    Invoke(EventName:string, CurrentGame:Game, Args) : boolean
    InvokeEvents(Events:Function[], CurrentGame:Game, Args) : boolean
}

export enum MouseButton 
{
    Left,
    Middle,
    Right
}

export enum SceneObjectType
{
    Undefined,
    Drawn,
    Script,
    Sound,
    Other
}

export class SceneObject
{
    ID:string;
    Name:string;
    Type:SceneObjectType;
    Events:EventPackage;
    Data:any;
    constructor(Old?:SceneObject)
    Copy() : SceneObject
    Serialize() : any
    Deserialize(Data:any) : void
}

export enum DrawObjectType 
{
    Undefined,
    Sprite,
    Tile
}

export class DrawObject extends SceneObject
{
    Modified:boolean;
    Fixed:boolean;
    Active:boolean;
    DrawType:DrawObjectType;
    Trans:Math.Transformation;
    constructor(Old?:DrawObject)
    Copy() : DrawObject
    Serialize() : any
    Deserialize(Data) : void
}

export class SpriteSet
{
    ID:string;
    Name:string;
    Seed:number;
    Sprites:string[];
    constructor(Old?:SpriteSet, Name?:string, Images?:string[])
    Copy() : SpriteSet
    Serialize() : any
    Deserialize(Data:any) : void
}

export class Sprite extends DrawObject
{
    CurrentIndex:number;
    CurrentSpriteSet:number;
    BackUpSpriteSet:number;
    Paint:Math.Color;
    SpriteSets:SpriteSet[];
    SubSprites:Sprite[];
    constructor(Old?:Sprite)
    Copy() : Sprite
    CollectiveList() : string[]
    RaiseIndex() : void
    SetSpriteSet(Index:number) : void
    UpdateSpriteSet(Index:number) : void
    SetSpriteSetByName(Name:string) : void
    UpdateSpriteSetByName(Name:string) : void
    Index() : number
    GetActiveSprites() : string[]
    GetSprites(Set:number) : string[]
    Serialize() : any
    Deserialize(Data:any) : void
}

export class TileCollection
{
    ID:string;
    Images:string[];
    constructor(Old?:TileCollection, Images?:string[])
    Copy() : TileCollection
    Serialize() : any
    Deserialize(Data) : void
}

export class Tile extends DrawObject
{
    Index:number;
    Collection:TileCollection;
    Paint:Math.Color;
    SubTiles:Tile[];
    constructor(Old?:Tile)
    Copy() : Tile
    Serialize() : any
    Deserialize(Data) : void
}

export class SoundObject extends SceneObject
{
    Autoplay:boolean;
    Looped:boolean;
    Volume:number;
    Url:string;
    constructor(Url:string, Old?:SoundObject)
    Copy() : SceneObject
    GenerateSound() : void
    Play() : void
    Serialize() : any
    Deserialize(Data) : void
}

export enum SceneType
{
    Scene2D,
    Scene3D
}

export class Scene
{
    ID:string;
    Name:string;
    Type:SceneType;
    BackColor:Math.Color;
    Events:EventPackage;
    Objects:SceneObject[];
    Data:any;
    constructor(Old?:Scene)
    Copy() : Scene
    AddSceneObject(Object:SceneObject) : void
    RemoveSceneObject(Object:SceneObject) : void
    GetObjectsWithData(Key:string, Data?:any) : any[]
    Serialize() : any
    Deserialize(Data:any) : void
}

export class Scene2D extends Scene
{
    Trans:Math.Transformation;
    Sprites:Sprite[]
    constructor(Old?:Scene2D)
    Copy() : Scene2D
    AddSceneObject(Object:SceneObject) : void
    Serialize() : any
    Deserialize(Data:any) : void
}

export class Game
{
    Name:string;
    Scenes:Scene[];
    Assets:SceneObject[];
    Data:any;
    constructor(Name?:string)
    Copy() : Game
    UpdateName() : void
    AddScene(Scene:Scene) : void
    ContainsScene(Name:string)
    RemoveScene(Scene:Scene) : void
    RemoveSceneByName(SceneName:string) : void
    GetScenesWithData(Key:string, Data?:any) : any[]
}

export as namespace Engine;