import Loader from "./Loader";
import BaseObject from "../BaseObject";
import Service from "../Services/Service";

abstract class LoaderService extends Service {
    private loaders: { [key: string]: Loader }

    public constructor() {
        super();
    }

    public load<T>(objectData: BaseObject): Promise<T> {
        const loader = this.findLoader(objectData);
        if (loader === null) {
            return Promise.reject('Toybox: Unable to find appropriate loader for type "' + objectData.type + '".');
        }
        return loader(objectData) as Promise<T>;
    }

    public register(objectType: typeof BaseObject, loader: Loader): void {
        this.loaders[objectType.name] = loader;
    }

    public exists(objectType: typeof BaseObject): boolean {
        return !!this.loaders[objectType.name];
    }

    private findLoader(objectData: BaseObject): Loader | null {
        const types = [...objectData.types].reverse();
        for (let type in types) {
            if (!!this.loaders[type]) {
                return this.loaders[type];
            }
        }
        return null;
    }
}

export default LoaderService;
