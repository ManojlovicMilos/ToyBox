import * as Core from './../../Core/Core';
import * as Math from './../../Mathematics/Mathematics';

import Light from './Light';
import DrawObject from './DrawObject';
import SoundObject from './SoundObject';
import SceneObject from './SceneObject';
import SceneEventPackage from './../Events/SceneEventPackage';

@Core.TypedObject('TBX.Scene')
class Scene extends Core.BaseObject {
    private _BackColor: Math.Color;
    private _Events: SceneEventPackage;
    protected _Current: boolean;

    public get BackColor(): Math.Color { return this._BackColor; }
    public set BackColor(value: Math.Color) { this._BackColor = value; }
    public get Events(): SceneEventPackage { return this._Events; }
    public get Objects(): SceneObject[] { return this.Children as SceneObject[]; }
    public set Objects(value: SceneObject[]) { this.Children = value; }
    public get Current(): boolean { return this._Current; }
    public get DrawnObjects(): DrawObject[] {
        return <DrawObject[]>this.FindByType(DrawObject.TypeNameToken);
    }
    public get SoundObjects(): SoundObject[] {
        return <SoundObject[]>this.FindByType(SoundObject.TypeNameToken);
    }
    public get Lights(): Light[] {
        return <Light[]>this.FindByDrawType(Light.TypeNameToken);
    }
    public get ActiveLights(): Light[] {
        return <Light[]>this.FindActiveByDrawType(Light.TypeNameToken);
    }

    public constructor(Old?: Scene) {
        super(Old);
        this.RegisterType(Scene);
        if (Old != null) {
            this._BackColor = Old._BackColor;
            this._Events = Old._Events.Copy();
        }
        else {
            this._BackColor = Math.Color.FromRGBA(40, 40, 40, 255);
            this._Events = new SceneEventPackage();
        }
    }

    public Copy(): Scene {
        return new Scene(this);
    }

    public override Attach(SO: SceneObject): void {
        if(SO.Is(SceneObject)) {
            super.Attach(SO);
        }
    }

    public FindByData(Key: string, Data?: any): SceneObject[] {
        return this.FindChildrenByData(Key, Data);
    }

    public FindByType(Type: string): SceneObject[] {
        return this.FindChildrenByType(Type);
    }

    public FindByDrawType(Type: string): DrawObject[] {
        return this.FindByType(Type) as DrawObject[];
    }

    public FindColliders(Tags: string[]): DrawObject[] {
        let Objects: DrawObject[] = [];
        this.DrawnObjects.forEach((entry: DrawObject) => {
            if (entry.Collision.Active) {
                if (Tags.length == 0) Objects.push(entry);
                else for (let i in Tags) {
                    if (entry.Data[Tags[i]]) {
                        Objects.push(entry);
                        break;
                    }
                }
            }
        });
        return Objects;
    }

    public FindActiveByDrawType(Type: string): DrawObject[] {
        return this.FindByDrawType(Type).filter((entry: DrawObject) => entry.Active);
    }

    public Composite(Chunk: Scene): boolean {
        // Virtual
        return false;
    }

    public OnLeave(): void {
        // Virtual
        this._Current = false;
    }

    public OnSwitch(): void {
        // Virtual
        this._Current = true;
        let UIParent: HTMLElement = document.getElementById('ui-parent');
        if (UIParent) UIParent.innerHTML = '';
        this.Objects.forEach((entry: SceneObject) => entry.OnSwitch());
    }

    public OnResize(Args: any): void {
        // Virtual
        this.Objects.forEach((entry: SceneObject) => entry.OnResize(Args));
    }

    // virtual
    public Serialize(): any {
        return {
            ...super.Serialize(),
            BackColor: this._BackColor.Serialize(),
        };
    }

    public Deserialize(Data: any): void {
        // Virtual
        super.Deserialize(Data);
        this._BackColor.Deserialize(Data.BackColor);
    }
}

export default Scene;
