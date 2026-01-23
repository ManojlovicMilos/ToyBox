/// Core
import Settings, { Quality } from "./Core/Settings";
import Service from "./Core/Services/Service";
import Injectable from "./Core/Utilities/Injectable";
import CreateUuid from "./Core/Utilities/CreateUuid";
import TypedObject from "./Core/Utilities/TypedObject";
import UuidService from "./Core/Services/UuidService";
import Inject, { InjectionManager } from "./Core/Services/InjectionManager";

/// Data
import LogService from "./Data/Services/LogService";
import HTTPService from "./Data/Services/HttpService";

/// Engine
// Game
import Game from './Engine/Game/Game';
// Scenes
import Scene from './Engine/Scene/Scene';
import Scene2D from './Engine/Scene/Scene2D';
// Objects
import Tile from './Engine/Scene/Tile';
import Sprite from './Engine/Scene/Sprite';
import DrawObject from './Engine/Scene/DrawObject';
import SceneObject from './Engine/Scene/SceneObject';
import ImageObject from './Engine/Scene/ImageObject';
import SoundObject from './Engine/Scene/SoundObject';
import Light from './Engine/Scene/Light';
import LightAttenuation from './Engine/Scene/LightAttenuation';
// Collections
import SpriteSet from './Engine/Scene/SpriteSet';
import ImageCollection from './Engine/Scene/ImageCollection';
import SpriteSetCollection from './Engine/Scene/SpriteSetCollection';
// EventPackages
import MouseButton from './Engine/Events/EventArguments';
import EventPackage from './Engine/Events/EventPackage';
import SceneEventPackage from './Engine/Events/SceneEventPackage';
import SpriteEventPackage from './Engine/Events/SpriteEventPackage';
import ImageObjectEventPackage from './Engine/Events/ImageObjectEventPackage';
// Materials
import { MaterialNode } from './Engine/Material/MaterialNode';
import { MaterialNodePool } from './Engine/Material/MaterialNodePool';
import { MaterialInput, MaterialInputType } from './Engine/Material/MaterialInput';
import { Material, MaterialType, TextureSamplingType } from './Engine/Material/Material';
import { MaterialNodeValue, MaterialNodeValueType } from './Engine/Material/MaterialNodeValue';

/// Draw
import { DrawEngineType, DrawEngine } from "./Draw/DrawEngine";

/// Math
// Structures
import Axis from './Mathematics/Structures/Axis';
import Color from './Mathematics/Structures/Color';
import Vertex from './Mathematics/Structures/Vertex';
import Matrix from './Mathematics/Structures/Matrix';
import MatrixMode from './Mathematics/Structures/MatrixMode';
import Transformation from './Mathematics/Structures/Transformation';
// Services
import RandomService from './Mathematics/Services/RandomService';
import TransformationService from './Mathematics/Services/TransformationService';
// Collision
import CollisionType from './Mathematics/Collision/CollisionType';
import CollisionValue from './Mathematics/Collision/CollisionValue';
import ColliderObject from './Mathematics/Collision/ColliderObject';
import CollisionResult from './Mathematics/Collision/CollisionResult';
import CollisionService from './Mathematics/Collision/CollisionService';
// Util
import ProgressBar from "./Util/SceneObjects/ProgressBar";
import DPadControl from "./Util/SceneObjects/DPadControl";
import AnalogControl from "./Util/SceneObjects/AnalogControl";
import BufferService from "./Util/Services/BufferService";
import ConversionService from "./Util/Services/ConversionService";
import ObjectCreationService from "./Util/Services/ObjectCreationService";
import ObjectCollisionService from "./Util/Services/ObjectCollisionService";

/// UI
import * as UI from "./UI/UI";

/// Runner
import RunnerService from "./Runner/RunnerService";

export {
    // Core
    Inject,
    Injectable,
    CreateUuid,
    TypedObject,
    Quality,
    Service,
    Settings,
    UuidService,
    InjectionManager,

    // Data
    LogService,
    HTTPService,

    // Draw
    DrawEngine,
    DrawEngineType,

    // Engine
    Game,
    Scene,
    Scene2D,
    Tile,
    Sprite,
    DrawObject,
    SceneObject,
    ImageObject,
    SoundObject,
    Light,
    LightAttenuation,
    SpriteSet,
    ImageCollection,
    SpriteSetCollection,
    MouseButton,
    EventPackage,
    SceneEventPackage,
    SpriteEventPackage,
    ImageObjectEventPackage,
    Material,
    MaterialType,
    MaterialNode,
    MaterialNodePool,
    MaterialNodeValue,
    MaterialNodeValueType,
    MaterialInput,
    MaterialInputType,
    TextureSamplingType,

    // Math
    Axis,
    Color,
    Vertex,
    Matrix,
    MatrixMode,
    Transformation,
    RandomService,
    TransformationService,
    CollisionType,
    CollisionValue,
    ColliderObject,
    CollisionResult,
    CollisionService,

    // Util
    ProgressBar,
    DPadControl,
    AnalogControl,
    BufferService,
    ConversionService,
    ObjectCreationService,
    ObjectCollisionService,
    
    // UI
    UI,
    
    // Runner
    RunnerService
};
