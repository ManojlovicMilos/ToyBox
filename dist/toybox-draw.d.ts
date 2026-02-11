import * as Core from './toybox-core';
import * as Math from './toybox-math';
import * as Engine from './toybox-engine';

export type DataHandlerObject<ProcessedDataType, EngineInternalType> = {
    Data: ProcessedDataType,
    Object: EngineInternalType,
};

type ResourceDataUnion = Engine.Material | Engine.ImageCollection | Engine.Light | string;

export class ResourceLoaderService<T> extends Core.Service {
    Resources: { [ID: string]: DataHandlerObject<T, ResourceDataUnion> };

    constructor()
    LoadMaterial(ImageObject: Engine.ImageObject): DataHandlerObject<T, Engine.Material> | null
    LoadCollection(Collection: Engine.ImageCollection): DataHandlerObject<T, Engine.ImageCollection> | null
    LoadTexture(Collection: Engine.ImageCollection, Path: string): DataHandlerObject<T, string> | null
    LoadLight(Light: Engine.Light): DataHandlerObject<T, Engine.Light> | null
    Update2DLights(): void
}

export class ObjectLoaderService<T> extends Core.Service {
    protected resourceLoader: ResourceLoaderService<unknown>;
    public Objects: { [ID: string]: DataHandlerObject<T, Core.BaseObject> };

    public constructor()

    PreloadScene(Scene: Engine.Scene, ProgressReport?: (Value: number) => void): void
    LoadScene(Scene: Engine.Scene): DataHandlerObject<T, Engine.Scene> | null
}

export class DrawEngine extends Core.Service {
    
    Resolution: Math.Vertex;
    GlobalScale: Math.Vertex;
    GlobalOffset: Math.Vertex;

    constructor()
    UpdateResolution(Resolution?: Math.Vertex, FixedSize?: boolean): void
    TransformToCanvas(X: number, Y: number): Math.Vertex
    DrawScene(Scene: Engine.Scene): void
    Preload2DScene(Scene: Engine.Scene2D, ReportProgress: Function): void
}
