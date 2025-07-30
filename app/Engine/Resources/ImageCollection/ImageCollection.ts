import * as Core from "../../../Core/Core";

class ImageCollection extends Core.Resource {
    protected _images: string[];
    public get images(): string[] { return this._images; }
    public set images(value: string[]) { this._images = value; }

    public constructor(old?: ImageCollection, images?: string[]) {
        super(old);
        this.registerType(ImageCollection);
        this._images = images || old?._images || [];
    }

    public override duplicate(): ImageCollection {
        return new ImageCollection(this);
    }
}

export default ImageCollection;
