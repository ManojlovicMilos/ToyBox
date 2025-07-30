export { Material, MaterialType }

import * as Core from "../../../../Core/Core";
import * as Math from "../../../../Mathematics/Mathematics";

import Material from "../Material/Material";

import { ShaderCode } from "../ShaderCode";
import { MaterialNode } from "../MaterialNode";
import { MaterialNodeValue } from "../MaterialNodeValue";
import { MaterialInput, MaterialInputType } from "../MaterialInput";


enum MaterialType {
    Default = "Default",
    Lit = "Lit",
    Phong = "Phong",
    Toon = "Toon",
    Custom = "Custom",
    Shader = "Shader"
}

class NodeMaterial extends Material {
    public nodes: MaterialNode[];
    public inputs: MaterialInput[];

    public constructor(old?: NodeMaterial) {
        super(old);
        this.registerType(NodeMaterial);
        this.nodes = old ? old.nodes.map((entry: MaterialNode) => entry.duplicate()) : [];
        this.inputs = old ? old.inputs.map((entry: MaterialInput) => entry.duplicate()) : [];
        if (old) {
            this.cloneConnections(old);
        }
    }

    public override duplicate(): NodeMaterial {
        return new NodeMaterial(this);
    }

    public addNode(node: MaterialNode): void {
        while (!this.checkNameAvailable(node.name)) {
            node.name = this.bumpName(node.name);
        }
        this.nodes.push(node);
    }

    public registerInput(id: string, Type: MaterialInputType): boolean {
        for (let i in this.inputs) if (this.inputs[i].id == id) return false;
        this.inputs.push(new MaterialInput(null, id, Type));
        return true;
    }

    public findNodeByName(name: string): MaterialNode {
        return this.nodes.find((entry: MaterialNode) => entry.name === name);
    }

    public findNodeByFunction(functionId: string): MaterialNode {
        return this.nodes.find((entry: MaterialNode) => entry.functionId === functionId);
    }

    private checkNameAvailable(name: string): boolean {
        return !!this.nodes.find((entry: MaterialNode) => entry.name === name);
    }

    private bumpName(name: string): string {
        let match = name.match(/_\d+/);
        if (name.endsWith(match[0])) {
            let numString: string = match[0];
            numString = numString.slice(1);
            const value: number = parseInt(numString);
            return name.replace("_" + value, "_" + (value + 1));
        }
        return name + "_1";
    }

    private cloneConnections(old: Material): void {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].inputs.length; j++) {
                if (old.nodes[i].inputs[j].inputTarget) {
                    this.nodes[i].inputs[j].inputTarget = this.findNodeOutputByOrigin(old.nodes[i].inputs[j].inputTarget.origin);
                }
            }
        }
    }

    private deserializeCloneConnections(old: any): void {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].inputs.length; j++) {
                if (old.nodes[i].inputs[j].inputTarget != "None") {
                    this.nodes[i].inputs[j].inputTarget = this.findNodeOutputByOrigin(old.nodes[i].inputs[j].inputTarge);
                }
            }
        }
    }

    private findNodeOutputByOrigin(ID: string): MaterialNodeValue {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].inputs.length; j++) {
                if (ID == this.nodes[i].outputs[j].origin) {
                    return this.nodes[i].outputs[j];
                }
            }
        }
    }

    public override onDeserialize(serialized: Core.SerializedObject): void {
        super.onDeserialize(serialized);
        this.deserializeCloneConnections(serialized);
    }
}
