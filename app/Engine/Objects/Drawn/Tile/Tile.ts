export  { Tile };

import { ImageObject } from "../ImageObject/ImageObject";

class Tile extends ImageObject {
    public override set index(value:number) {
        if(this.collection.images.length > value) this._index = value;
        else this._index = 0;
        this.modified = true;
    }

    public constructor(old?: Tile) {
        super(old);
        this.registerType(Tile);
    }

    public duplicate() : Tile {
        return new Tile(this);
    }
}
