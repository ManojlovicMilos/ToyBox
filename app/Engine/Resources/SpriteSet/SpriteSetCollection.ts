import SpriteSet from "./SpriteSet";
import ImageCollection from "../ImageCollection/ImageCollection";
import BaseObject from "../../../Core/BaseObject";

class SpriteSetCollection extends ImageCollection {
    public get spriteSets(): SpriteSet[] { return this.children as SpriteSet[] }
    public set spriteSets(value: SpriteSet[]) { this.children = value; }
    public override get images(): string[] { return this.packImages(); }

    public constructor(old?: SpriteSetCollection, spriteSets?: SpriteSet[]) {
        super(old);
        this.registerType(SpriteSetCollection);
        this.children = spriteSets
            || old?.spriteSets.map((entry: SpriteSet) => entry.duplicate())
            || [];
    }

    public override duplicate(): SpriteSetCollection {
        return new SpriteSetCollection(this);
    }

    public override attach(child: SpriteSet): void {
        if (child.is(SpriteSet)) {
            super.attach(child);
        }
    }

    private packImages(): string[] {
        let images = [];
        this.spriteSets.forEach((entry: SpriteSet) => images = [...images, ...entry.images]);
        return images;
    }
}

export default SpriteSetCollection;
