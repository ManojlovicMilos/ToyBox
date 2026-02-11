import * as Core from '../Core/Core';
import * as Engine from '../Engine/Engine';
import DataHandlerObject from './DataHandlerObject';
import ResourceLoaderService from './ResourceLoaderService';

@Core.Injectable('TBX.LoadService')
class ObjectLoaderService<T> extends Core.Service {
    protected resourceLoader: ResourceLoaderService<unknown>;
    public Objects: { [ID: string]: DataHandlerObject<T, Core.BaseObject> };

    public constructor() {
        super();
        this.Objects = {};
    }

    // virtual
    public PreloadScene(Scene: Engine.Scene, ProgressReport?: (Value: number) => void): void {}

    // virtual
    public LoadScene(Scene: Engine.Scene): DataHandlerObject<T, Engine.Scene> | null {
        if (Scene.Is(Engine.Scene2D)) return this.Load2DScene(Scene);
        return null;
    }

    // virtual
    protected Load2DScene(Scene: Engine.Scene): DataHandlerObject<T, Engine.Scene2D> | null {
        return null;
    }

    // virtual
    protected LoadSceneObject(SceneObject: Engine.SceneObject): DataHandlerObject<T, Engine.SceneObject> | null {
        return null;
    }

    // virtual
    protected LoadImageObject(ImageObject: Engine.ImageObject): DataHandlerObject<T, Engine.SceneObject> | null {
        return null;
    }

    // virtual
    protected LoadLight2D(Light: Engine.Light): DataHandlerObject<T, Engine.Light> | null {
        return null;
    }
}

export default ObjectLoaderService;
