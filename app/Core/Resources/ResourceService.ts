import Service from "../Services/Service";
import { BaseObject, LoaderService } from "../Core";

class ResourceService extends Service {
    protected resourceData: { [key: string]: unknown }
    protected loaderService: LoaderService;

    public constructor() {
        super();
    }

    public get(id: string): unknown | undefined {
        return this.resourceData[id];
    }

    public load(sceneObject: BaseObject): Promise<boolean> {
        return this.loaderService.load(sceneObject)
            .then((data: unknown) => {
                this.resourceData[sceneObject.id] = data;
                return true;
            });
    }
}

export default ResourceService;
