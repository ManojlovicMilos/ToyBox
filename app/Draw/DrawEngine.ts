import * as Core from './../Core/Core';
import * as Engine from './../Engine/Engine';
import * as Math from './../Mathematics/Mathematics'

import ObjectLoaderService from './ObjectLoaderService';

const CANVAS_ELEMENT_ID = 'canvas';
const PARENT_ELEMENT_ID = 'canvas-parent';
const DEFAULT_RESOLUTION = new Math.Vertex(1920, 1080, 1);

@Core.Injectable('TBX.DrawEngine')
class DrawEngine extends Core.Service {
    protected _FixedSize: boolean;
    protected _Resolution: Math.Vertex;
    protected _GlobalScale: Math.Vertex;
    protected _GlobalOffset: Math.Vertex;
    protected _Parent: HTMLElement;
    protected _Target: HTMLCanvasElement;
    protected _Loader: ObjectLoaderService<unknown>;

    public get Resolution(): Math.Vertex { return this._Resolution; }
    public get GlobalScale(): Math.Vertex { return this._GlobalScale; }
    public get GlobalOffset(): Math.Vertex { return this._GlobalOffset; }

    public constructor() {
        super();
        this._FixedSize = false;
        this._Parent = document.getElementById(PARENT_ELEMENT_ID);
        this._Target = document.getElementById(CANVAS_ELEMENT_ID) as HTMLCanvasElement;
        Core.Log('ToyBox Version ' + Core.Settings.Version, null, 'Info');
    }

    // virtual
    public UpdateResolution(Resolution?: Math.Vertex, FixedSize?: boolean): void {
        if (Resolution) this._Resolution = Resolution;
        else this._Resolution = DEFAULT_RESOLUTION;
        if (FixedSize != null) this._FixedSize = FixedSize;
    }

    public TransformToCanvas(X: number, Y: number): Math.Vertex {
        if (this._FixedSize) return new Math.Vertex(X, Y, 0);
        return new Math.Vertex((X / this._Target.clientWidth) * this._Resolution.X, (Y / this._Target.clientHeight) * this._Resolution.Y, 0);
    }

    // virtual
    public DrawScene(Scene: Engine.Scene): void {
        if (Scene.Is(Engine.Scene2D)) {
            this.DrawScene2D(Scene as Engine.Scene2D);
        }
    }

    // virtual
    protected DrawScene2D(Scene: Engine.Scene2D): void {}

    // virtual
    public Preload2DScene(Scene: Engine.Scene2D, ReportProgress: Function): void {}
}

export default DrawEngine;
