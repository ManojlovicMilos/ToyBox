export { MaterialNodeValue, MaterialNodeValueType }

import * as Core from './../../../../Core/Core';
import * as Math from '../../../../Mathematics/Mathematics';

enum MaterialNodeValueType {
    Int = 'int',
    Bool = 'bool',
    Float = 'float',
    Vector2 = 'vec2',
    Vector3 = 'vec3',
    Vector4 = 'vec4'
}

class MaterialNodeValue extends Core.BaseObject {
    public origin: string;
    public parentName: string;
    public value: boolean | number | Math.Vertex | null;
    public editable: boolean;
    public valueType: MaterialNodeValueType;
    public inputTarget: MaterialNodeValue | null;

    public constructor(old?: MaterialNodeValue) {
        super(old);
        this.registerType(MaterialNodeValue);
        this.id = this.uuid.create();
        this.name = old?.name || '';
        this.origin = old?.id || this.id;
        this.parentName = old.parentName || '';
        this.value = old?.duplicateValue() || null;
        this.editable = old?.editable || false;
        this.valueType = old.valueType || MaterialNodeValueType.Vector4;
        this.inputTarget = null;
    }

    public duplicate(): MaterialNodeValue {
        return new MaterialNodeValue(this);
    }

    private duplicateValue(): any {
        if (!this.value) return null;
        if (this.type == MaterialNodeValueType.Bool ||
            this.type == MaterialNodeValueType.Int ||
            this.type == MaterialNodeValueType.Float)
            return this.value;
        if (this.type == MaterialNodeValueType.Vector2 ||
            this.type == MaterialNodeValueType.Vector3 ||
            this.type == MaterialNodeValueType.Vector4)
            return (this.value as Math.Vertex).duplicate();
        return null;
    }

    public onSerialize(serialized: Core.SerializedObject): Core.SerializedObject {
        const value = super.onSerialize(serialized);
        value.data.inputTarget = this.inputTarget.origin;
        return value;
    }

    public skipSerializeKeys(): string[] {
        return ['inputTarget'];
    }
}
