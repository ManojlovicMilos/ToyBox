export { NodeMaterial }

import { CustomMaterial } from "./CustomMaterial";
import { MaterialNode } from "./MaterialNode";
import { MaterialNodeValue } from "./MaterialNodeValue";
import { MaterialInput, MaterialInputType } from "./MaterialInput";

import { Type } from "./../Types";

class NodeMaterial extends CustomMaterial
{
    private _Nodes:MaterialNode[];
    public get Nodes():MaterialNode[] { return this._Nodes; }
    public constructor(Old?:NodeMaterial)
    {
        super(Old);
        this.RegisterType(Type.NodeMaterial);
        this.RegisterFactory(() => new NodeMaterial());
        this._Nodes = [];
        if(Old != null)
        {
            for(let i in Old._Nodes) this._Nodes.push(Old._Nodes[i].Copy());
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
        M.Nodes = this._Nodes.map(Node => Node.Serialize());
        return M;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Nodes = Data.Nodes.map(Node => { let MN = new MaterialNode(); MN.Deserialize(Node); return MN; });
        this.DeserializeCloneConnections(Data);
    }
}