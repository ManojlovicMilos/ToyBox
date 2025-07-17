import ImageCollection from "../ImageCollection/ImageCollection";

class SpriteSet extends ImageCollection {
    public seed: number;

    public constructor(old?: SpriteSet, images?: string[], name?: string) {
        super(old, images);
        this.registerType(SpriteSet);
        this._name = name || old?.name || this.id;
    }

    public duplicate(): SpriteSet {
        return new SpriteSet(this);
    }
}

export default SpriteSet;
