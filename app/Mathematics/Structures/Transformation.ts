import Vertex from "./Vertex";

export default class Transformation {
    public translation: Vertex;
    public rotation: Vertex;
    public scale: Vertex;

    public constructor(old?: Transformation) {
        if (old != null) {
            this.translation = old.translation.duplicate();
            this.rotation = old.rotation.duplicate();
            this.scale = old.scale.duplicate();
        }
        else {
            this.translation = new Vertex(0, 0, 0);
            this.rotation = new Vertex(0, 0, 0);
            this.scale = new Vertex(1, 1, 1);
        }
    }

    public duplicate(): Transformation {
        let New: Transformation = new Transformation(this);
        return New;
    }
}
