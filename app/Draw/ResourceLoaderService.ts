import * as Core from '../Core/Core';
import * as Engine from '../Engine/Engine';

import DataHandlerObject from './DataHandlerObject';

type ResourceDataUnion = Engine.Material | Engine.ImageCollection | Engine.Light | string;

@Core.Injectable('TBX.MaterialLoaderService')
class ResourceLoaderService<T> extends Core.Service {
    public Resources: { [ID: string]: DataHandlerObject<T, ResourceDataUnion> };

    public constructor() {
        super();
        this.Resources = {};
    }

    // virtual
    public LoadMaterial(ImageObject: Engine.ImageObject): DataHandlerObject<T, Engine.Material> | null {
        return null;
    }

    // virtual
    public LoadCollection(Collection: Engine.ImageCollection): DataHandlerObject<T, Engine.ImageCollection> | null  {
        return null;
    }

    // virtual
    public LoadTexture(Collection: Engine.ImageCollection, Path: string): DataHandlerObject<T, string> | null {
        return null;
    }

    // virtual
    public LoadLight(Light: Engine.Light): DataHandlerObject<T, Engine.Light> | null {
        return null;
    }

    // virtual
    public Update2DLights(): void {}

    // virtual
    protected RegisterResource(ID: string, Data: T, Object: ResourceDataUnion): DataHandlerObject<T, ResourceDataUnion> {
        const newResource = {
            Data,
            Object,
        };
        this.Resources[ID] = newResource;
        return newResource;
    }
}

export default ResourceLoaderService;
