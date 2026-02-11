import * as Core from './../../Core/Core';

import ImageObject from './ImageObject';
import SpriteSet from './SpriteSet';
import SpriteSetCollection from './SpriteSetCollection';
import SpriteEventPackage from '../Events/SpriteEventPackage';

@Core.TypedObject('TBX.Sprite')
class Sprite extends ImageObject {
    private _CurrentIndex: number;
    private _CurrentSpriteSet: number;
    private _BackUpSpriteSet: number;

    public override get Index(): number { return this.GetIndex(); }
    public override get Images(): string[] { return this.Collection.Images }
    public override get NormalMaps(): string[] { return this.NormalCollection.Images }
    public override get SpecularMaps(): string[] { return this.SpecularCollection.Images }
    
    public get BackUpSpriteSet(): number { return this._BackUpSpriteSet; }
    public set BackUpSpriteSet(value: number) { this._BackUpSpriteSet = value; }
    public get CurrentIndex(): number { return this._CurrentIndex; }
    public get CurrentSpriteSet(): number { return this._CurrentSpriteSet; }
    public get Collection(): SpriteSetCollection { return <SpriteSetCollection>this._Collection; }
    public set Collection(value: SpriteSetCollection) { this._Collection = value; }
    public get NormalCollection(): SpriteSetCollection { return <SpriteSetCollection>this._NormalCollection; }
    public set NormalCollection(value: SpriteSetCollection) { this._NormalCollection = value; }
    public get SpecularCollection(): SpriteSetCollection { return <SpriteSetCollection>this._SpecularCollection; }
    public set SpecularCollection(value: SpriteSetCollection) { this._SpecularCollection = value; }
    public get SpriteSets(): SpriteSet[] { return (<SpriteSetCollection>this._Collection).SpriteSets; }
    public set SpriteSets(value: SpriteSet[]) { (<SpriteSetCollection>this._Collection).SpriteSets = value; }
    public get NormalSets(): SpriteSet[] { return (<SpriteSetCollection>this._NormalCollection).SpriteSets; }
    public set NormalSets(value: SpriteSet[]) { (<SpriteSetCollection>this._NormalCollection).SpriteSets = value; }
    public get SpecularSets(): SpriteSet[] { return (<SpriteSetCollection>this._SpecularCollection).SpriteSets; }
    public set SpecularSets(value: SpriteSet[]) { (<SpriteSetCollection>this._SpecularCollection).SpriteSets = value; }
    public get Events(): SpriteEventPackage { return <SpriteEventPackage>this._Events; }

    public constructor(Old?: Sprite) {
        super(Old);
        this.RegisterType(Sprite);
        this._CurrentIndex = 0;
        this._CurrentSpriteSet = 0;
        this._BackUpSpriteSet = -1;
        this._Collection = Old?._Collection.Copy() || new SpriteSetCollection();
        this._NormalCollection = Old?._NormalCollection.Copy() || new SpriteSetCollection();
        this._SpecularCollection = Old?._SpecularCollection.Copy() || new SpriteSetCollection();
        this._Events = new SpriteEventPackage();
    }

    public Copy(): Sprite {
        return new Sprite(this);
    }

    private GetIndex(): number {
        let Index: number = 0;
        for (let i = 0; i < this._CurrentSpriteSet; i++) {
            Index += this.SpriteSets[i].Images.length;
        }
        Index += this._CurrentIndex;
        return Index;
    }

    public CollectiveList(): string[] {
        let List: string[] = [];
        for (let i = 0; i < this.SpriteSets.length; i++) {
            for (let j = 0; j < this.SpriteSets[i].Images.length; j++) {
                List.push(this.SpriteSets[i].Images[j]);
            }
        }
        return List;
    }

    public RaiseIndex(): void {
        this._CurrentIndex++;
        if (this.SpriteSets.length <= 0) this._CurrentIndex = -1;
        else if (this._CurrentIndex >= this.SpriteSets[this._CurrentSpriteSet].Images.length) {
            this.Events.Invoke('SetComplete', null, { CurrentSpriteSet: this._CurrentSpriteSet, NextSpriteSet: ((this._BackUpSpriteSet != -1) ? this._BackUpSpriteSet : this._CurrentSpriteSet) });
            if (this._BackUpSpriteSet != -1) {
                this._CurrentSpriteSet = this._BackUpSpriteSet;
                this._BackUpSpriteSet = -1;
            }
            this._CurrentIndex = 0;
        }
        this.Modified = true;
    }

    public SetSpriteSet(Index: number): void {
        if (Index >= this.SpriteSets.length) return;
        this._CurrentSpriteSet = Index;
        this._CurrentIndex = 0;
        this.Modified = true;
    }

    public UpdateSpriteSet(Index: number): void {
        if (Index != this._CurrentSpriteSet) this.SetSpriteSet(Index);
    }

    public SetSpriteSetByName(Name: string): void {
        for (let i = 0; i < this.SpriteSets.length; i++) {
            if (this.SpriteSets[i].Name == Name) this.SetSpriteSet(i);
        }
    }

    public UpdateSpriteSetByName(Name: string): void {
        for (let i = 0; i < this.SpriteSets.length; i++) {
            if (this.SpriteSets[i].Name == Name) this.UpdateSpriteSet(i);
        }
    }

    public GetSprites(Set: number): string[] {
        if (this.SpriteSets.length == 0) return [];
        return this.SpriteSets[Set].Images;
    }

    public GetNormalSprites(Set: number): string[] {
        if (this.NormalSets.length == 0) return [];
        return this.NormalSets[Set].Images;
    }

    public override Serialize(): any {
        return {
            ...super.Serialize(),
            Index: this._CurrentSpriteSet,
        }
    }

    public override Deserialize(Data: any): void {
        super.Deserialize(Data);
        this._CurrentSpriteSet = Data.Index;
    }
}

export default Sprite;
