import * as Core from '../Core/Core';
import * as Data from '../Data/Data';
import * as Engine from '../Engine/Engine';
import * as Math from '../Mathematics/Mathematics';

import Style from './Style/Style';
import DockType from './Style/DockType';
import ControlEventPackage from './ControlEventPackage';

@Core.TypedObject('TBX.UI.Control')
class Control extends Engine.SceneObject {
    protected _Active: boolean;
    protected _Ratio: number;
    protected _Position: Math.Vertex;
    protected _Size: Math.Vertex;
    protected _Element: HTMLElement;
    protected _Offset: Math.Vertex;
    protected _Scale: Math.Vertex;
    protected _Style: Style;
    protected _Parent: Control;

    public get Active(): boolean { return this._Active; }
    public set Active(value: boolean) { this._Active = value; this.OnToggle(value); this.Update(); }
    public get ParentAspectRatio(): number { return this._Ratio; }
    public get Position(): Math.Vertex { return this._Position; }
    public set Position(value: Math.Vertex) { this._Position = value; this.Update(); }
    public get Size(): Math.Vertex { return this._Size; }
    public set Size(value: Math.Vertex) { this._Size = value; this.Update(); }
    public get Offset(): Math.Vertex { return this._Offset; }
    public set Offset(value: Math.Vertex) { this._Offset = value; this.Update(); }
    public get Dock(): DockType { return this._Style.Layout.Dock; }
    public set Dock(value: DockType) { this._Style.Layout.Dock = value; }
    public get ForeColor(): Math.Color { return this._Style.Text.Color; }
    public set ForeColor(value: Math.Color) { this._Style.Text.Color = value; }
    public get BackColor(): Math.Color { return this._Style.Background.Color; }
    public set BackColor(value: Math.Color) { this._Style.Background.Color = value; }
    public get Scale(): Math.Vertex { return this._Scale; }
    public set Scale(value: Math.Vertex) { this._Scale = value; }
    public get Style(): Style { return this._Style; }
    public get Parent(): Control { return this._Parent; }
    public set Parent(value: Control) { this._Parent = value; }
    public get Element(): HTMLElement { return this._Element; }
    public get Events(): ControlEventPackage { return <ControlEventPackage>this._Events; }

    public constructor(Old?: Control) {
        super(Old);
        this.RegisterType(Control);
        this._Events = new ControlEventPackage();
        if (Old) {
            this._Active = Old._Active;
            this._Position = Old._Position;
            this._Size = Old._Size;
            this._Offset = new Math.Vertex();
            this._Scale = Old._Scale.Copy();
            this._Style = Old._Style.Copy();
        }
        else {
            this._Active = true;
            this._Position = new Math.Vertex();
            this._Size = new Math.Vertex();
            this._Offset = new Math.Vertex();
            this._Scale = new Math.Vertex(100, 100, 1);
            this._Style = new Style();
        }
    }

    public Copy(): Control {
        return new Control(this);
    }

    public OnToggle(Value: boolean): void {
        // Virtual
    }

    public Update(): void {
        if (!this._Element) return;
        this._Element.setAttribute('tbx-name', this.Name);
        if (Core.Settings.EngineUIStyle) {
            this._Style.Apply(this);
        }
    }

    protected AddElement(): void {
        const Log = Core.Inject<Data.LogService>(Data.LogService);
        this.Update();
        this.Check();
        let Parent: HTMLElement = document.getElementById('ui-parent');
        if (this._Parent) {
            Parent = this._Parent._Element;
        }
        if (!Parent) {
            Log.Error('UI Parent Not Found', 'Unnable to find UI parent');
        }
        Parent.appendChild(this._Element);
    }

    protected RemoveElement(Parent?: HTMLElement): void {
        const Log = Core.Inject<Data.LogService>(Data.LogService);
        if (!Parent) {
            Parent = document.getElementById('ui-parent');
        }
        if (!Parent) {
            Log.Error('Parent Not Found', 'Unnable to find parent');
        }
        Parent.removeChild(this._Element);
    }

    public Check(): void {
        if (!this._Element) {
            this.Create();
        }
    }

    protected Create(): void {
        this._Element = <HTMLDivElement>(document.createElement('div'));
        this._Element.id = this.ID;
        this._Element.className = 'control';
        this.Events.Connect(this, this.Element);
    }

    public override OnSwitch(): void {
        this.AddElement();
    }

    public override OnResize(Args: any): void {
        this._Ratio = Args.Ratio;
        this._Scale = new Math.Vertex(Args.Scale.X / Args.GlobalScale.X, Args.Scale.Y / Args.GlobalScale.Y, 1);
        this.Update();
    }

    public override OnRemove(Parent: Control): void {
        this.RemoveElement(Parent ? Parent.Element : null);
    }

    public override OnAttach(Args: any): void {
        super.OnAttach(Args);
        this.Create();
        if (Args.Scene) {
            if (Args.Scene.Current) this.AddElement();
        }
    }
}

export default Control;
