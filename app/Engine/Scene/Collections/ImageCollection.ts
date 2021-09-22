export { ImageCollection }

import * as Core from "../../../Core/Core";

class ImageCollection extends Core.BaseObject
{
    private _Origin: string;
    private _Images: string[];
    public get Origin(): string { return this._Origin; }
    public get Images(): string[] { return this._Images; }
    public set Images(value: string[]) { this._Images = value; }
    public constructor(Old?: ImageCollection, Images?: string[])
    {
        super(Old);
        this.RegisterType(ImageCollection.name);
        if (Old != null)
        {
            this._Origin = Old._Origin;
            this._Images = Old._Images;
        }
        else
        {
            this._Origin = this._ID;
            if (Images) this._Images = Images;
            else this._Images = [];
        }
    }
    public Copy(): ImageCollection
    {
        return new ImageCollection(this);
    }
    public Serialize(): any
    {
        // Override
        return {
            ...super.Serialize(),
            Origin: this._Origin,
            Images: this._Images
        };
    }
    public Deserialize(Data: any): void
    {
        // Override
        super.Deserialize(Data);
        this._Origin = Data.Origin;
        this._Images = Data.Images;
    }
}
