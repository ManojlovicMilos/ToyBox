import * as Core from "./toybox-core";
import * as Math from "./toybox-math";

export enum Type
{
    Game = "Game",
    Scene = "Scene",
    Scene2D = "Scene2D",
    SceneObject = "SceneObject",
    DrawObject = "DrawObject",
    Line = "Line",
    ImageObject = "ImageObject",
    Sprite = "Sprite",
    Tile = "Tile",
    Light = "Light",
    SpotLight = "SpotLight",
    PointLight = "PointLight",
    DirectionalLight = "DirectionalLight",
    SoundObject = "SoundObject",
    UIControlObject = "UIControlObject",
    Material = "Material",
    CustomMaterial = "CustomMaterial",
    NodeMaterial = "NodeMaterial",
    ShaderMaterial = "ShaderMaterial",
    MaterialNode = "MaterialNode",
    ImageCollection = "ImageCollection",
    SpriteSet = "SpriteSet",
    SpriteSetCollection = "SpriteSetCollection"
}

export enum MouseButton 
{
    Left,
    Middle,
    Right
}

export class Events
{
    constructor(Old?:Events)
    Copy() : Events
    Invoke(EventName:string, CurrentGame:Game, Args) : boolean
    InvokeEvents(Events:Function[], CurrentGame:Game, Args) : boolean
}

export class SceneEvents extends Events
{
    WireTouchEvents:boolean;
    Load:Function[];
    Switch:Function[];
    Leave:Function[];
    Resize:Function[];
    Update:Function[];
    KeyPress:Function[];
    KeyDown:Function[];
    KeyUp:Function[];
    Click:Function[];
    MouseDown:Function[];
    MouseUp:Function[];
    MouseMove:Function[];
    MouseWheel:Function[];
    TouchStart:Function[];
    TouchEnd:Function[];
    TouchMove:Function[];
    LoadProgress:Function[];
    LoadComplete:Function[];
    constructor(Old?:SceneEvents)
    Copy() : SceneEvents
}

export class DrawObjectEvents extends Events
{
    Collision:Function[];
    constructor(Old?:DrawObjectEvents)
    Copy() : DrawObjectEvents
}

export class ImageObjectEvents extends DrawObjectEvents
{
    Click:Function[];
    MouseDown:Function[];
    MouseUp:Function[];
    TouchStart:Function[];
    TouchEnd:Function[];
    constructor(Old?:ImageObjectEvents)
    Copy() : ImageObjectEvents
}

export class SpriteEvents extends ImageObjectEvents
{
    SetComplete:Function[];
    constructor(Old?:SpriteEvents)
    Copy() : SpriteEvents
}

export class ImageCollection extends Core.BaseObject
{
    Origin:string;
    Images:string[];
    constructor(Old?:ImageCollection, Images?:string[])
    Copy() : ImageCollection
}

export class SpriteSet extends ImageCollection
{
    Seed:number;
    constructor(Old?:SpriteSet, Images?:string[], Name?:string)
    Copy() : SpriteSet
}

export class SpriteSetCollection extends ImageCollection
{
    SpriteSets:SpriteSet[];
    constructor(Old?:SpriteSetCollection, SpriteSets?:SpriteSet[])
    Copy() : SpriteSetCollection
}

export enum MaterialNodeValueType
{
    Int = "int",
    Bool = "bool",
    Float = "float",
    Vector2 = "vec2",
    Vector3 = "vec3",
    Vector4 = "vec4"
}

export class MaterialNodeValue
{
    ID:string;
    Name:string;
    Origin:string;
    ParentName:string;
    Editable:boolean;
    Type:MaterialNodeValueType;
    InputTarget:MaterialNodeValue;
    Value:any;
    constructor(Old?:MaterialNodeValue)
    Copy() : MaterialNodeValue
    Serialize() : any
    Deserialize(Data:any) : void
}

export class MaterialNode extends Core.BaseObject
{
    FunctionID:string;
    Values:MaterialNodeValue[];
    Inputs:MaterialNodeValue[];
    Outputs:MaterialNodeValue[];
    constructor(Old?:MaterialNode)
    Copy() : MaterialNode
    AddValue(NodeValue: MaterialNodeValue) : void
    AddInput(NodeValue: MaterialNodeValue) : void
    AddOutput(NodeValue: MaterialNodeValue) : void
}

export class MaterialNodePool
{
    Pool: { [key: string]:MaterialNode; };
    constructor()
}

export enum MaterialInputType
{
    Integer = "i",
    Float = "f",
    Vector2 = "v2",
    Vector3 = "v3",
    Vector4 = "v4",
    Texture = "tv"
}

export class MaterialInput
{
    ID:string;
    Type:MaterialInputType;
    constructor(Old?:MaterialInput, ID?:string, Type?:MaterialInputType)
    Copy() : MaterialInput
    Serialize() : any
    Deserialize(Data:any) : void
}

export class ShaderCode
{
    Vector:string;
    Fragment:string;
    constructor(Old?:ShaderCode, Vector?:string, Fragment?:string)
    Copy() : ShaderCode
}

export enum TextureSamplingType
{
    Linear = "Linear",
    Nearest = "Nearest"
}

export class Material extends Core.BaseObject
{
    Lit: boolean;
    HasNormals: boolean;
    Sampling:TextureSamplingType;
    constructor(Old?:Material)
    Copy() : Material
}

export class CustomMaterial extends Material
{
    Inputs: MaterialInput[];
    constructor(Old?:CustomMaterial)
    Copy() : CustomMaterial
    RegisterInput(ID:string, Type:MaterialInputType) : boolean
}

export class NodeMaterial extends CustomMaterial
{
    Nodes:MaterialNode[];
    constructor(Old?:NodeMaterial)
    Copy() : NodeMaterial
    AddNode(Node:MaterialNode) : void
    FindNodeByName(Name:string) : MaterialNode
    FindNodeByFunction(Function:string) : MaterialNode
}

export class ShaderMaterial extends CustomMaterial
{
    Shaders:ShaderCode;
    constructor(Old?:ShaderMaterial)
    Copy() : ShaderMaterial
    Serialize() : any
}

export class SceneObject extends Core.BaseObject
{
    Events:Events;
    constructor(Old?:SceneObject)
    Copy() : SceneObject
    OnAttach(Args:any) : void
    OnRemove(Args:any) : void
    OnSwitch() : void
    OnResize(Args:any) : void
}

export class DrawObject extends SceneObject
{
    Modified:boolean;
    Fixed:boolean;
    Active:boolean;
    Paint:Math.Color;
    Trans:Math.Transformation;
    Collision:Math.CollisionData;
    Position:Math.Vector;
    Size:Math.Vector;
    Rotation:Math.Vector;
    Events: DrawObjectEvents;
    constructor(Old?:DrawObject)
    Copy() : DrawObject
    OnToggle(Value:boolean) : void
}

export class LightAttenuation
{
    Constant:number;
    Linear:number;
    Quadratic:number;
    constructor(Old?:LightAttenuation, Constant?:number, Linear?:number, Quadratic?:number);
}

export class Light extends DrawObject
{
    Radius:number;
    Intensity:number;
    Attenuation:LightAttenuation;
    constructor(Old?:Light);
}

export class ImageObject extends DrawObject
{
    FlipX:boolean;
    FlipY:boolean;
    RepeatX:number;
    RepeatY:number;
    AmbientColor:Math.Color;
    Material:Material;
    Collection:ImageCollection;
    NormalCollection:ImageCollection;
    SpecularCollection:ImageCollection;
    Events: ImageObjectEvents;
    constructor(Old?:ImageObject)
    Copy() : ImageObject
}

export class Line extends DrawObject
{
    Width: number;
    Position2: Math.Vector;
    constructor(Old?:Line)
    Copy() : Line
}

export class Sprite extends ImageObject
{
    CurrentIndex:number;
    CurrentSpriteSet:number;
    BackUpSpriteSet:number;
    SpriteSets: SpriteSet[];
    NormalSets: SpriteSet[];
    Collection: SpriteSetCollection;
    NormalCollection: SpriteSetCollection;
    SpecularCollection: SpriteSetCollection;
    Events: SpriteEvents;
    constructor(Old?:Sprite)
    Copy() : Sprite
    SetSpriteSet(Index:number) : void
    UpdateSpriteSet(Index:number) : void
    SetSpriteSetByName(Name:string) : void
    UpdateSpriteSetByName(Name:string) : void
}

export class Tile extends ImageObject
{
    Index:number;
    constructor(Old?:Tile)
    Copy() : Tile
}

export class SoundObject extends SceneObject
{
    Autoplay:boolean;
    Looped:boolean;
    Volume:number;
    Url:string;
    Sound:any;
    Duration:number;
    constructor(Old?:SoundObject, Url?:string)
    Copy() : SceneObject
    Play() : void
    Pause() : void
    Stop() : void
    Seek(Value:number) : void
}

export enum SceneType
{
    Scene2D = "Scene2D",
    Scene3D = "Scene3D"
}

export class Scene extends Core.BaseObject
{
    Active:boolean;
    BackColor:Math.Color;
    Events:SceneEvents;
    Objects:SceneObject[];
    Lights:Light[];
    DrawObjects:DrawObject[];
    SoundObjects:SoundObject[];
    Current:boolean;
    constructor(Old?:Scene)
    Copy() : Scene
    Attach(Object:SceneObject) : void
    Remove(Object:SceneObject) : void
    FindByData(Key:string, Data?:any) : SceneObject[]
    FindByType(ObjectType:string) : SceneObject[]
    FindByExactType(ObjectType:string) : SceneObject[]
    FindActive(ObjectType?:string) : DrawObject[]
    FindColliders(Tags?:string[]) : DrawObject[]
    Composite(Chunk:Scene) : boolean
    OnLeave() : void
    OnSwitch() : void
    OnResize(Args:any) : void
}

export class Scene2D extends Scene
{
    Trans: Math.Transformation;
    Lines: Line[];
    Tiles: Tile[];
    Sprites: Sprite[];
    constructor(Old?:Scene2D)
    Copy() : Scene2D
}

export class Game extends Core.BaseObject
{
    Scenes:Scene[];
    constructor(Name?:string)
    Copy() : Game
    Attach(Scene:Scene) : void
    Contains(Name:string)
    Remove(Scene:Scene) : void
    RemoveByName(SceneName:string) : void
    GetScenesWithData(Key:string, Data?:any) : any[]
}

export as namespace Engine;