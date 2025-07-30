import SpriteSet from "./SpriteSet";
import SpriteSetCollection from "./SpriteSetCollection";

class LitSpriteSetCollection extends SpriteSetCollection {
    public normalMapSets: SpriteSet[];
    public specularMapSets: SpriteSet[];
    public get normalMaps(): string[] { return this.packNormalMaps(); }
    public get specularMaps(): string[] { return this.packSpecularMaps(); }

    public constructor(old?: LitSpriteSetCollection) {
        super(old);
        this.registerType(LitSpriteSetCollection);
        this.normalMapSets = old?.normalMapSets.map((entry: SpriteSet) => entry.duplicate()) || [];
        this.specularMapSets = old?.specularMapSets.map((entry: SpriteSet) => entry.duplicate()) || [];
    }

    public duplicate(): LitSpriteSetCollection {
        return new LitSpriteSetCollection(this);
    }

    private packNormalMaps(): string[] {
        let images = [];
        this.normalMapSets.forEach((entry: SpriteSet) => images = [...images, entry.images]);
        return images;
    }

    private packSpecularMaps(): string[] {
        let images = [];
        this.specularMapSets.forEach((entry: SpriteSet) => images = [...images, entry.images]);
        return images;
    }
}

export default LitSpriteSetCollection;
