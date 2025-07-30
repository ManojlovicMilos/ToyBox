import * as ThreeJS from 'three';
import * as Core from "../../Core/Core";
import * as Engine from "../../Engine/Engine";

class ThreeJSLoaderService extends Core.LoaderService {
    public constructor() {
        super();
    }

    protected loadImageCollection(): Promise<ThreeJS.Texture> {
        return new Promise((resolve) => {

        });
    }
}
