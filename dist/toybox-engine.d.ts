import * as Core from './toybox-core';
import * as Math from './toybox-math';

export class EventPackage {
    constructor(Old?: EventPackage)
    Copy(): EventPackage
    Invoke(EventName: string, CurrentGame: Game, Args): boolean
    InvokeEvents(Events: Function[], CurrentGame: Game, Args): boolean
}

export class SceneEventPackage extends EventPackage {
    WireTouchEvents: boolean;
    Load: Function[];
    Switch: Function[];
    Leave: Function[];
    Resize: Function[];
    Update: Function[];
    KeyPress: Function[];
    KeyDown: Function[];
    KeyUp: Function[];
    Click: Function[];
    MouseDown: Function[];
    MouseUp: Function[];
    MouseMove: Function[];
    MouseWheel: Function[];
    TouchStart: Function[];
    TouchEnd: Function[];
    TouchMove: Function[];
    LoadProgress: Function[];
    LoadComplete: Function[];

    constructor(Old?: SceneEventPackage)
    Copy(): SceneEventPackage
}

export class ImageObjectEventPackage extends EventPackage {
    Click: Function[];
    MouseDown: Function[];
    MouseUp: Function[];
    TouchStart: Function[];
    TouchEnd: Function[];

    constructor(Old?: SceneEventPackage)
    Copy(): ImageObjectEventPackage
}

export class SpriteEventPackage extends ImageObjectEventPackage {
    SetComplete: Function[];

    constructor(Old?: SpriteEventPackage)
    Copy(): SpriteEventPackage
}

export enum MouseButton {
    Left,
    Middle,
    Right
}

export abstract class SceneObject extends Core.BaseObject {
    get Events(): EventPackage;

    constructor(Old?: SceneObject)
    OnSwitch(): void
    OnResize(Args: any): void
}

export enum MaterialNodeValueType {
    Int = 'int',
    Bool = 'bool',
    Float = 'float',
    Vector2 = 'vec2',
    Vector3 = 'vec3',
    Vector4 = 'vec4'
}

export class MaterialNodeValue {
    ID: string;
    Name: string;
    OriginID: string;
    ParentName: string;
    Editable: boolean;
    Type: MaterialNodeValueType;
    InputTarget: MaterialNodeValue;
    Value: any;

    constructor(Old?: MaterialNodeValue)
    Copy(): MaterialNodeValue
    Serialize(): any
    Deserialize(Data: any): void
}

export class MaterialNode {
    ID: string;
    Name: string;
    FunctionID: string;
    Values: MaterialNodeValue[];
    Inputs: MaterialNodeValue[];
    Outputs: MaterialNodeValue[];

    constructor(Old?: MaterialNode)
    Copy(): MaterialNode
    Serialize(): any
    Deserialize(Data: any): void
    AddValue(NodeValue: MaterialNodeValue): void
    AddInput(NodeValue: MaterialNodeValue): void
    AddOutput(NodeValue: MaterialNodeValue): void
}

export class MaterialNodePool {
    Pool: { [key: string]: MaterialNode; };
    constructor()
}

export enum MaterialType {
    Default = 'Default',
    Lit = 'Lit',
    Phong = 'Phong',
    Toon = 'Toon',
    Custom = 'Custom',
    Shader = 'Shader'
}

export enum MaterialInputType {
    Integer = 'i',
    Float = 'f',
    Vector2 = 'v2',
    Vector3 = 'v3',
    Vector4 = 'v4',
    Texture = 'tv'
}

export class MaterialInput {
    ID: string;
    Type: MaterialInputType;

    constructor(Old?: MaterialInput, ID?: string, Type?: MaterialInputType)
    Copy(): MaterialInput
}

export class ShaderCode {
    Vertex: string;
    Fragment: string;

    constructor(Old?: ShaderCode, Vertex?: string, Fragment?: string)
    Copy(): ShaderCode
}

export enum TextureSamplingType {
    Linear = 'Linear',
    Nearest = 'Nearest'
}

export class Material {
    ID: string;
    Name: string;
    Type: MaterialType;
    Nodes: MaterialNode[];
    Inputs: MaterialInput[];
    Shaders: ShaderCode;
    Sampling: TextureSamplingType;

    constructor(Old?: Material)
    Copy(): Material
    Serialize(): any
    Deserialize(Data: any): void
    AddNode(Node: MaterialNode): void
    RegisterInput(ID: string, Type: MaterialInputType): boolean
    FindNodeByName(Name: string): MaterialNode
    FindNodeByFunction(Function: string): MaterialNode
}

export abstract class DrawObject extends SceneObject {
    Modified: boolean;
    Fixed: boolean;
    Active: boolean;
    Paint: Math.Color;
    Trans: Math.Transformation;
    Position: Math.Vertex;
    Size: Math.Vertex;
    Collision: Math.CollisionValue;

    constructor(Old?: DrawObject)
    Copy(): DrawObject
}

export class LightAttenuation {
    Constant: number;
    Linear: number;
    Quadratic: number;

    constructor(Old?: LightAttenuation, Constant?: number, Linear?: number, Quadratic?: number);
}

export class Light extends DrawObject {
    Radius: number;
    Intensity: number;
    Attenuation: LightAttenuation;

    constructor(Old?: Light);
}

export abstract class ImageObject extends DrawObject {
    Index: number;
    Images: string[];
    NormalMaps: string[];
    SpecularMaps: string[];
    FlipX: boolean;
    FlipY: boolean;
    RepeatX: number;
    RepeatY: number;
    AmbientColor: Math.Color;
    Material: Material;
    Collection: ImageCollection;
    NormalCollection: ImageCollection;
    SpecularCollection: ImageCollection;

    get Events(): ImageObjectEventPackage;

    constructor(Old?: ImageObject)
    Copy(): ImageObject
}

export class ImageCollection {
    ID: string;
    Origin: string;
    Images: string[];

    constructor(Old?: ImageCollection, Images?: string[])
    Copy(): ImageCollection
    Serialize(): any
    Deserialize(Data: any): void
}

export class SpriteSet extends ImageCollection {
    Name: string;
    Seed: number;

    constructor(Old?: SpriteSet, Images?: string[], Name?: string)
    Copy(): SpriteSet
}

export class SpriteSetCollection extends ImageCollection {
    SpriteSets: SpriteSet[];

    constructor(Old?: SpriteSetCollection, SpriteSets?: SpriteSet[])
    Copy(): SpriteSetCollection
}

export class Sprite extends ImageObject {
    CurrentIndex: number;
    CurrentSpriteSet: number;
    BackUpSpriteSet: number;
    SpriteSets: SpriteSet[];
    NormalSets: SpriteSet[];
    Collection: SpriteSetCollection;
    NormalCollection: SpriteSetCollection;
    SpecularCollection: SpriteSetCollection;

    get Events(): SpriteEventPackage;

    constructor(Old?: Sprite)
    Copy(): Sprite
    CollectiveList(): string[]
    RaiseIndex(): void
    SetSpriteSet(Index: number): void
    UpdateSpriteSet(Index: number): void
    SetSpriteSetByName(Name: string): void
    UpdateSpriteSetByName(Name: string): void
    GetSprites(Set: number): string[]
    GetNormalSprites(Set: number): string[]
}

export class Tile extends ImageObject {
    SubTiles: Tile[];

    constructor(Old?: Tile)
    Copy(): Tile
}

export class SoundObject extends SceneObject {
    Autoplay: boolean;
    Looped: boolean;
    Volume: number;
    Url: string;

    constructor(Old?: SoundObject, Url?: string)
    Copy(): SceneObject
    GenerateSound(): void
    Play(): void
}

export enum SceneType {
    Scene2D = 'Scene2D',
    Scene3D = 'Scene3D'
}

export abstract class Scene extends Core.BaseObject {
    BackColor: Math.Color;
    Lights: Light[];
    DrawObjects: DrawObject[];
    SoundObjects: SoundObject[];
    Objects(): SceneObject[];
    Data: any;
    Current: boolean;

    get Events(): SceneEventPackage;

    constructor(Old?: Scene)
    Copy(): Scene
    Attach(Object: SceneObject): void
    FindByData(Key: string, Data?: any): SceneObject[]
    FindByType(Type: string): SceneObject[]
    FindByDrawType(Type: string): DrawObject[]
    FindColliders(Tags: string[]): DrawObject[]
    FindActiveByDrawType(Type: string): DrawObject[]
    Serialize(): any
    Deserialize(Data: any): void
    OnSwitch(): void
    OnLeave(): void
    OnResize(Args: any): void
}

export class Scene2D extends Scene {
    Trans: Math.Transformation;

    get Tiles(): Tile[]
    get Sprites(): Sprite[]

    constructor(Old?: Scene2D)
    Copy(): Scene2D
    Composite(Chunk: Scene): boolean
}

export class Game {
    Name: string;
    Scenes: Scene[];
    Assets: SceneObject[];
    Data: any;
    
    constructor(Name?: string)
    Copy(): Game
    Attach(Scene: Scene): void
    Contains(Name: string)
    Remove(Scene: Scene): void
    RemoveByName(SceneName: string): void
    FindByData(Key: string, Data?: any): any[]
}

export as namespace Engine;
