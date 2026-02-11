import * as Core from './../../Core/Core';
import TextureSampling from './TextureSampling';

class ImageCollection {
    private _ID: string;
    private _Images: string[];

    public Sampling: TextureSampling;

    public get ID(): string { return this._ID; }
    public get Images(): string[] { return this._Images; }
    public set Images(value: string[]) { this._Images = value; }
    
    public constructor(Old?: ImageCollection, Images?: string[]) {
        this._ID = Core.CreateUuid();
        this._Images = Old?.Images || Images || [];
        this.Sampling = Old?.Sampling || TextureSampling.Linear;
    }

    // virtual
    public Copy(): ImageCollection {
        return new ImageCollection(this);
    }

    // virtual
    public Serialize(): any {
        let TC =
        {
            ID: this._ID,
            Images: this._Images,
            Sampling: this.Sampling,
        };
        return TC;
    }

    // virtual
    public Deserialize(Data): void {
        this._ID = Data.ID;
        this._Images = Data.Images;
        this.Sampling = Data.Sampling;
    }
}

export default ImageCollection;
