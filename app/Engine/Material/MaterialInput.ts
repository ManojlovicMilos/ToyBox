export { MaterialInput, MaterialInputType }

enum MaterialInputType {
    Integer = "i",
    Float = "f",
    Vector2 = "v2",
    Vector3 = "v3",
    Vector4 = "v4",
    Texture = "tv"
}

class MaterialInput {
    public id: string;
    public type: MaterialInputType;

    public constructor(old?: MaterialInput, id?: string, type?: MaterialInputType) {
        this.id = old?.id || id || '';
        this.type = old?.type || type || MaterialInputType.Vector4;
    }

    public duplicate(): MaterialInput {
        return new MaterialInput(this);
    }
}
