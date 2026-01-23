import ImageCollection from './ImageCollection';

class SpriteSet extends ImageCollection {
    public Name: string;
    public Seed: number;

    public constructor(Old?: SpriteSet, Images?: string[], Name?: string) {
        super(Old, Images);
        this.Name = Old?.Name || Name || '';
        this.Seed = Old?.Seed || -1;
    }

    public override Copy(): SpriteSet {
        return new SpriteSet(this);
    }

    public override Serialize(): any {
        return {
            ...super.Serialize(),
            Name: this.Name,
            Seed: this.Seed,
        }
    }

    public override Deserialize(Data: any): void {
        super.Deserialize(Data);
        this.Name = Data.Name;
        this.Seed = Data.Seed;
    }
}

export default SpriteSet;
