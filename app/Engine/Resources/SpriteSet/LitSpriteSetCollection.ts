import SpriteSet from "./SpriteSet";
import SpriteSetCollection from "./SpriteSetCollection";

class LitSpriteSetCollection extends SpriteSetCollection {
    public normalMapSets: SpriteSet[];
    public specularMapSets: SpriteSet[];
    public override get images(): string[] { return this.packImages(); }

    public constructor(old?: SpriteSetCollection, spriteSets?: SpriteSet[]) {
        super(old);
        this.registerType(SpriteSetCollection);
        this.spriteSets = spriteSets
            || old?.spriteSets.map((entry: SpriteSet) => entry.duplicate())
            || [];
    }

    public duplicate(): SpriteSetCollection {
        return new SpriteSetCollection(this);
    }

    private packImages(): string[] {
        let images = [];
        this.spriteSets.forEach((entry: SpriteSet) => images = [...images, entry.images]);
        return images;
    }
}
