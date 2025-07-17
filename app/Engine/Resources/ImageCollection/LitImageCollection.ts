import ImageCollection from "./ImageCollection";

class LitImageCollection extends ImageCollection {
    public normalMaps: string[];
    public specularMaps: string[];

    public constructor(old?: LitImageCollection, images?: string[], normalMaps?: string[], specularMaps?: string[]) {
        super(old, images);
        this.registerType(LitImageCollection);
        this.normalMaps = old?.normalMaps || normalMaps || [];
        this.specularMaps = old?.specularMaps || specularMaps || [];
    }

    public override duplicate(): LitImageCollection {
        return new LitImageCollection(this);
    }
}

export default LitImageCollection;
