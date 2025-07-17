import Loader from "./Loader";
import Resource from "./Resource";
import Service from "../Services/Service";
import inject from "../Services/InjectionManager";

export class LoaderService extends Service {
    private loaders: { [key: string]: Loader }

    public constructor() {
        super();
    }

    public load<T>(resource: Resource): Promise<T> {
        const loader = this.findLoader(resource);
        if (loader === null) {
            return Promise.reject('Toybox: Unable to find appropriate loader for type "' + resource.type + '".');
        }
        return loader(resource) as Promise<T>;
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

const load = <T extends Resource>(resource: T): Promise<T> => {
    let service = inject<LoaderService>(LoaderService);
    return service.load(resource);
};

const registerLoader = <T>(resourceType: typeof Resource, loader: Loader): void => {
    let service = inject<LoaderService>(LoaderService);
    service.register(resourceType, loader);
};

export { load, registerLoader };
