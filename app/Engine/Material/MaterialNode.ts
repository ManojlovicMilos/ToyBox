export { MaterialNode }

import * as Core from './../../Core/Core';

import { MaterialNodeValue } from './MaterialNodeValue';

class MaterialNode extends Core.BaseObject {
    public functionId: string;
    public values: MaterialNodeValue[];
    public inputs: MaterialNodeValue[];
    public outputs: MaterialNodeValue[];

    public set name(value: string) { this._name = value; this.updateName(); }

    public constructor(old?: MaterialNode) {
        super(old);
        this.registerType(MaterialNode);
        this.functionId = old?.functionId || '';
        this.values = old ? old.values.map((entry: MaterialNodeValue) => entry.duplicate()) : [];
        this.inputs = old ? old.inputs.map((entry: MaterialNodeValue) => entry.duplicate()) : [];
        this.outputs = old ? old.outputs.map((entry: MaterialNodeValue) => entry.duplicate()) : [];
    }

    public duplicate(): MaterialNode {
        return new MaterialNode(this);
    }

    public addValue(nodeValue: MaterialNodeValue): void {
        this.addToArray(this.values, nodeValue);
    }

    public addInput(nodeValue: MaterialNodeValue): void {
        this.addToArray(this.inputs, nodeValue);
    }

    public addOutput(nodeValue: MaterialNodeValue): void {
        this.addToArray(this.outputs, nodeValue);

    }

    private addToArray(array: MaterialNodeValue[], nodeValue: MaterialNodeValue): void {
        if (!this.checkNameAvailable(nodeValue.name)) return;
        nodeValue.parentName = this.name;
        array.push(nodeValue);
    }

    private checkNameAvailable(name: string): boolean {
        return [
            ...this.values,
            ...this.inputs,
            ...this.outputs,
        ].filter((entry: MaterialNodeValue) => entry.name === name).length === 0;
    }

    private updateName(): void {
        return [
            ...this.values,
            ...this.inputs,
            ...this.outputs,
        ].forEach((entry: MaterialNodeValue) => entry.name = this.name);
    }
}
