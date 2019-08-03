export { MaterialNode }

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";
import { MaterialNodeValue } from "./MaterialNodeValue";

class MaterialNode extends Core.BaseObject
{
    private _FunctionID:string;
    private _Values:MaterialNodeValue[];
    private _Inputs:MaterialNodeValue[];
    private _Outputs:MaterialNodeValue[];
    public get FunctionID():string { return this._FunctionID; }
    public set FunctionID(value:string) { this._FunctionID = value; }
    public get Values():MaterialNodeValue[] { return this._Values; }
    public get Inputs():MaterialNodeValue[] { return this._Inputs; }
    public get Outputs():MaterialNodeValue[] { return this._Outputs; }
    public constructor(Old?:MaterialNode)
    {
        super(Old);
        this.RegisterType(Type.MaterialNode);
        this._Values = [];
        this._Inputs = [];
        this._Outputs = [];
        if(Old != null)
        {
            this._FunctionID = Old._FunctionID;
            for(let i in Old._Values) this._Values.push(Old._Values[i].Copy());
            for(let i in Old._Inputs) this._Inputs.push(Old._Inputs[i].Copy());
            for(let i in Old._Outputs) this._Outputs.push(Old._Outputs[i].Copy());
        }
        else
        {
            this._FunctionID = "";
        }
    }
    public Copy() : MaterialNode
    {
        return new MaterialNode(this);
    }
    public AddValue(NodeValue: MaterialNodeValue) : void
    {
        if(!this.CheckNameAvailable(NodeValue.Name)) return;
        NodeValue.ParentName = this._Name;
        this._Values.push(NodeValue);
    }
    public AddInput(NodeValue: MaterialNodeValue) : void
    {
        if(!this.CheckNameAvailable(NodeValue.Name)) return;
        NodeValue.ParentName = this._Name;
        this._Inputs.push(NodeValue);
    }
    public AddOutput(NodeValue: MaterialNodeValue) : void
    {
        if(!this.CheckNameAvailable(NodeValue.Name)) return;
        NodeValue.ParentName = this._Name;
        this._Outputs.push(NodeValue);
    }
    private CheckNameAvailable(Name:string) : boolean
    {
        for(let i in this._Values) if(this._Values[i].Name == Name) return false;
        for(let i in this._Inputs) if(this._Inputs[i].Name == Name) return false;
        for(let i in this._Outputs) if(this._Outputs[i].Name == Name) return false;
        return true;
    }
    private UpdateName() : void
    {
        for(let i in this._Values) this._Values[i].ParentName = this._Name;
        for(let i in this._Inputs) this._Inputs[i].ParentName = this._Name;
        for(let i in this._Outputs) this._Outputs[i].ParentName = this._Name;
    }
    public Serialize() : any
    {
        // Override
        let MN = super.Serialize();
        MN.FunctionID = this._FunctionID;
        MN.Values = this._Values.map(Item => Item.Serialize());
        MN.Inputs = this._Inputs.map(Item => Item.Serialize());
        MN.Outputs = this._Outputs.map(Item => Item.Serialize());
        return MN;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._FunctionID = Data.FunctionID;
        for(let i in Data.Values)
        {
            let MNV:MaterialNodeValue = new MaterialNodeValue();
            MNV.Deserialize(Data.Values[i]);
            this._Values.push(MNV);
        }
        for(let i in Data.Inputs)
        {
            let MNV:MaterialNodeValue = new MaterialNodeValue();
            MNV.Deserialize(Data.Inputs[i]);
            this._Inputs.push(MNV);
        }
        for(let i in Data.Outputs)
        {
            let MNV:MaterialNodeValue = new MaterialNodeValue();
            MNV.Deserialize(Data.Outputs[i]);
            this._Outputs.push(MNV);
        }
    }
}