import Loader from "./Loader";
import Resource from "./Resource";
import Service from "../Services/Service";
import inject from "../Services/InjectionManager";

export class ResourceLoadService extends Service {
    private loaders: { [key: string]: Loader }

    public constructor() {
        super();
    }

    public load(resource: Resource): Promise<Resource> {
        const loader = this.findLoader(resource);
        if (loader === null) {
            return Promise.reject('Toybox: Unable to find appropriate loader for type "' + resource.type + '".');
        }
        return loader(resource);
    }

    public register(resourceType: typeof Resource, loader: Loader): void {
        this.loaders[resourceType.name] = loader;
    }

    public exists(resourceType: typeof Resource): boolean {
        return !!this.loaders[resourceType.name];
    }

    private findLoader(resource: Resource): Loader | null {
        const types = [...resource.types].reverse();
        for (let type in types) {
            if (!!this.loaders[type]) {
                return this.loaders[type];
            }
        }
        return null;
    }
}

const load = (resource: Resource): Promise<Resource> => {
    let service = inject<ResourceLoadService>(ResourceLoadService);
    return service.load(resource);
}

export default load;
