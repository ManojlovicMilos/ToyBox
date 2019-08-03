export { NodeMaterial }

import { Material } from "./Material";
import { MaterialNode } from "./MaterialNode";
import { MaterialNodeValue } from "./MaterialNodeValue";
import { MaterialInput, MaterialInputType } from "./MaterialInput";

import { Type } from "./../Types";

class NodeMaterial extends Material
{
    private _Nodes:MaterialNode[];
    private _Inputs:MaterialInput[];
    public get Nodes():MaterialNode[] { return this._Nodes; }
    public get Inputs():MaterialInput[] { return this._Inputs; }
    public constructor(Old?:NodeMaterial)
    {
        super(Old);
        this.RegisterType(Type.NodeMaterial);
        this.RegisterFactory(() => new NodeMaterial());
        this._Nodes = [];
        this._Inputs = [];
        if(Old != null)
        {
            for(let i in Old._Nodes) this._Nodes.push(Old._Nodes[i].Copy());
            for(let i in Old._Inputs) this._Inputs.push(Old._Inputs[i].Copy());
            this.CloneConnections(Old);
        }
    }
    public Copy() : NodeMaterial
    {
        return new NodeMaterial(this);
    }
    public AddNode(Node:MaterialNode) : void
    {
        while(!this.CheckNameAvailable(Node.Name))
        {
            Node.Name = this.IncrementalName(Node.Name);
        }
        this._Nodes.push(Node);
    }
    public RegisterInput(ID:string, Type:MaterialInputType) : boolean
    {
        for(let i in this._Inputs) if(this._Inputs[i].ID == ID) return false;
        this._Inputs.push(new MaterialInput(null, ID, Type));
        return true;
    }
    public FindNodeByName(Name:string) : MaterialNode
    {
        for(let i in this.Nodes)
        {
            if(this.Nodes[i].FunctionID == Name) return this.Nodes[i];
        }
    }
    public FindNodeByFunction(Function:string) : MaterialNode
    {
        for(let i in this.Nodes)
        {
            if(this.Nodes[i].FunctionID == Function) return this.Nodes[i];
        }
    }
    private CheckNameAvailable(Name:string) : boolean
    {
        for(let i in this._Nodes)
        {
            if(this._Nodes[i].Name == Name) return false;
        }
        return true;
    }
    private IncrementalName(Name:string) : string
    {
        let Match = Name.match(/_\d+/);
        if(Name.endsWith(Match[0]))
        {
            let NumString:string = Match[0];
            NumString = NumString.slice(1);
            let Value:number = parseInt(NumString);
            return Name.replace("_" + Value, "_" + (Value+1));
        }
        return Name + "_1";
    }
    private CloneConnections(Old:NodeMaterial) : void
    {
        for(let i = 0; i < this._Nodes.length; i++)
        {
            for(let j = 0; j < this._Nodes[i].Inputs.length; j++)
            {
                if(Old._Nodes[i].Inputs[j].InputTarget)
                {
                    this._Nodes[i].Inputs[j].InputTarget = this.FindNodeOutputByOrigin(Old._Nodes[i].Inputs[j].InputTarget.OriginID);
                }
            }
        }
    }
    private DeserializeCloneConnections(Old:any) : void
    {
        for(let i = 0; i < this._Nodes.length; i++)
        {
            for(let j = 0; j < this._Nodes[i].Inputs.length; j++)
            {
                if(Old.Nodes[i].Inputs[j].InputTarget != "None")
                {
                    this._Nodes[i].Inputs[j].InputTarget = this.FindNodeOutputByOrigin(Old.Nodes[i].Inputs[j].InputTarge);
                }
            }
        }
    }
    private FindNodeOutputByOrigin(ID:string) : MaterialNodeValue
    {
        for(let i = 0; i < this._Nodes.length; i++)
        {
            for(let j = 0; j < this._Nodes[i].Inputs.length; j++)
            {
                if(ID == this._Nodes[i].Outputs[j].OriginID)
                {
                    return this._Nodes[i].Outputs[j];
                }
            }
        }
    }
    public Serialize() : any
    {
        // Virtual
        let M = super.Serialize();
        M.Nodes = [];
        for(let i in this._Nodes)
        {
            M.Nodes.push(this._Nodes[i].Serialize());
        }
        return M;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Nodes = [];
        for(let i in Data.Nodes)
        {
            let MN:MaterialNode = new MaterialNode();
            MN.Deserialize(Data.Nodes[i]);
            this._Nodes.push(MN);
        }
        this.DeserializeCloneConnections(Data);
    }
}