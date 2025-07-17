export { ImageObject }

import DrawObject from "../DrawObject/DrawObject";
import ImageObjectEventManager from "./ImageObjectEventManager";
import ImageCollection from "../../../Resources/ImageCollection/ImageCollection";
import LitImageCollection from "../../../Resources/ImageCollection/LitImageCollection";

type ImageObjectLayout = {
    flipX: boolean;
    flipY: boolean;
    repeatX: number;
    repeatY: number;
}

// abstract
abstract class ImageObject extends DrawObject {
    public layout: ImageObjectLayout;
    protected _index: number;
    protected imageCollection: ImageCollection;

    public get index(): number { /*virtual*/ return -1; }
    public set index(value: number) { /*virtual*/ }
    public get collection(): ImageCollection { return this.imageCollection; }
    public set collection(value: ImageCollection) { this.imageCollection = value; }
    public get images(): string[] { /* virtual */ return this.imageCollection.images; }
    public get normalMaps(): string[] { return this.imageCollection.isAnyOf([LitImageCollection]) ? (this.imageCollection as LitImageCollection).normalMaps : [] }
    public get specularMaps(): string[] { return this.imageCollection.isAnyOf([LitImageCollection]) ? (this.imageCollection as LitImageCollection).specularMaps : [] }
    public override get events(): ImageObjectEventManager { return this.events as ImageObjectEventManager; }
    public override set events(value: ImageObjectEventManager) { this._events = value; }

    public constructor(old?: ImageObject) {
        super(old);
        this.registerType(ImageObject);
        this.layout = old?.layout ? { ...old.layout } : {
            flipX: false,
            flipY: false,
            repeatX: 1,
            repeatY: 1,
        };
        this._index = old?._index || -1;
        this.imageCollection = new ImageCollection();
        this.events = new ImageObjectEventManager();
        // TODO: this._AmbientColor = Math.Color.FromRGBA(50, 50, 50, 255);
        // Add to material
    }
}
