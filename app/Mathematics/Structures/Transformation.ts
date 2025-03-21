import Vertex from "./Vertex";

export default class Transformation {
    private translation: Vertex;
    private rotation: Vertex;
    private scale: Vertex;

    public constructor(old?: Transformation) {
        if (old != null) {
            this.translation = old.translation.Copy();
            this.rotation = old.rotation.Copy();
            this.scale = old.scale.Copy();
        }
        else {
            this.translation = new Vertex(0, 0, 0);
            this.rotation = new Vertex(0, 0, 0);
            this.scale = new Vertex(1, 1, 1);
        }
    }

    public Copy(): Transformation {
        let New: Transformation = new Transformation(this);
        return New;
    }

    public Composite(trans: Transformation): void {
        this.translation.Translate(trans.translation);
        this.scale.Scale(trans.scale);
        this.rotation.Translate(trans.rotation);
    }

    public Serialize(): any {
        return {
            translation: this.translation.Serialize(),
            rotation: this.rotation.Serialize(),
            scale: this.scale.Serialize()
        };
    }

    public Deserialize(Data): void {
        this.translation.Deserialize(Data.translation);
        this.rotation.Deserialize(Data.rotation);
        this.scale.Deserialize(Data.scale);
    }
}
