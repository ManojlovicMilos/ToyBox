import * as Core from './../../Core/Core';

class ImageCollection {
    private _ID: string;
    private _Origin: string;
    private _Images: string[];

    public get ID(): string { return this._ID; }
    public get Origin(): string { return this._Origin; }
    public get Images(): string[] { return this._Images; }
    public set Images(value: string[]) { this._Images = value; }
    
    public constructor(Old?: ImageCollection, Images?: string[]) {
        if (Old != null) {
            this._ID = Core.CreateUuid();
            this._Origin = Old._Origin;
            this._Images = Old._Images;
        }
        else {
            this._ID = Core.CreateUuid();
            this._Origin = this._ID;
            if (Images) this._Images = Images;
            else this._Images = [];
        }
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
            Origin: this._Origin,
            Images: this._Images
        };
        return TC;
    }

    // virtual
    public Deserialize(Data): void {
        this._ID = Data.ID;
        this._Origin = Data.Origin;
        this._Images = Data.Images;
    }
}

export default ImageCollection;
