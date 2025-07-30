import * as Core from "../../../../Core/Core";

import ImageObject from "../ImageObject/ImageObject";
import SpriteSet from "../../../Resources/SpriteSet/SpriteSet";
import SpriteEventPackage, { SpriteEventTypes } from "./SpriteEventPackage";
import SpriteSetCollection from "../../../Resources/SpriteSet/SpriteSetCollection";
import LitSpriteSetCollection from "../../../Resources/SpriteSet/LitSpriteSetCollection";

class Sprite extends ImageObject {
    public spriteSetIndex: number;
    public nextSpriteSetIndex: number;

    public override set index(value: number) { this.setIndex(value); }
    public override get collection(): SpriteSetCollection { return <SpriteSetCollection>this.collection; }
    public override set collection(value: SpriteSetCollection) { this.collection = value; }
    public override get events(): SpriteEventPackage { return this.events as SpriteEventPackage; }

    public get spriteSets(): SpriteSet[] { return this.collection.spriteSets; }
    public set spriteSets(value: SpriteSet[]) { this.collection.spriteSets = value; }

    public constructor(old?: Sprite) {
        super(old);
        this.registerType(Sprite);
        this._index = 0;
        this.spriteSetIndex = 0;
        this.nextSpriteSetIndex = -1;

        this._events = new SpriteEventPackage();
        this.imageCollection = new SpriteSetCollection();
    }

    public override duplicate(): Sprite {
        return new Sprite(this);
    }

    public getImageIndex(): number {
        let index: number = 0;
        for (let i = 0; i < this.spriteSetIndex; i++) {
            index += this.spriteSets[i].images.length;
        }
        index += this.index;
        return index;
    }

    public raiseIndex(): void {
        this.setIndex(this.index + 1);
    }

    public setIndex(value: number): void {
        this.index = value;
        if (this.spriteSets.length <= 0) this.index = -1;
        else if (this.index >= this.spriteSets[this.spriteSetIndex].images.length) {
            this.events.invoke(
                SpriteEventTypes.SpriteSetComplete,
                { currentSpriteSet: this.spriteSetIndex, nextSpriteSet: ((this.nextSpriteSetIndex !== -1) ? this.nextSpriteSetIndex : this.spriteSetIndex) },
                this,
            );
            if (this.nextSpriteSetIndex != -1) {
                this.spriteSetIndex = this.nextSpriteSetIndex;
                this.nextSpriteSetIndex = -1;
            }
            this.index = 0;
        }
    }

    public isActiveSpriteSet(name: string): boolean {
        return this.spriteSetIndex === this.collection.findChildIndexByName(name);
    }

    public setSpriteSet(name: string): void {
        const index = this.collection.findChildIndexByName(name);
        if (index != -1 && !this.isActiveSpriteSet(name)) {
            this.spriteSetIndex = index;
            this.index = 0;
        }
    }

    public getSprites(set: number): string[] {
        return this.collection.spriteSets.length > set
            ? this.collection.spriteSets[set].images
            : [];
    }

    public getNormalSprites(set: number): string[] {
        return this.collection.is(LitSpriteSetCollection) && (this.collection as LitSpriteSetCollection).normalMapSets.length > set
            ? (this.collection as LitSpriteSetCollection).normalMapSets[set].images
            : [];
    }

    protected override registerType(type: typeof Sprite): void {
        super.registerType(type);
        
    }
}

export default Sprite;
