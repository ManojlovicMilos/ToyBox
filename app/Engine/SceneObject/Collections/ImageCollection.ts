export { ImageCollection }

import * as Core from "../../../Core/Core";

class ImageCollection extends Core.BaseObject {
    public origin: string;
    public images: string[];
    public get Origin(): string { return this._Origin; }
    public get Images(): string[] { return this._Images; }
    public set Images(value: string[]) { this._Images = value; }

    public constructor(Old?: ImageCollection, Images?: string[]) {
        super(Old);
        this.registerType(ImageCollection);
        if (Old != null) {
            this._Origin = Old._Origin;
            this._Images = Old._Images;
        }
        else {
            this.origin = this.id;
            if (Images) this._Images = Images;
            else this._Images = [];
        }
    }

    public override duplicate(): ImageCollection {
        return new ImageCollection(this);
    }
}
