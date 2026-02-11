export { ThreeDrawEngine };

import * as Three from 'three';
import * as Engine from './../../Engine/Engine';
import * as Mathematics from './../../Mathematics/Mathematics';

import DrawEngine from './../DrawEngine';
import ThreeObjectLoaderService from './ThreeObjectLoaderService';

class ThreeDrawEngine extends DrawEngine {
    private _Scene: Three.Scene;
    private _Camera: Three.Camera;
    private _Renderer: Three.WebGLRenderer;
    private _ToyBoxScene: Engine.Scene2D;

    public constructor() {
        super();
        this._Scene = new Three.Scene();
        this._GlobalScale = new Mathematics.Vertex(1, 1, 1);
        this._GlobalOffset = new Mathematics.Vertex(0, 0, 0);
        this._Renderer = new Three.WebGLRenderer({ canvas: this._Target });
        this._Renderer.setPixelRatio(window.devicePixelRatio);
        this._Loader = new ThreeObjectLoaderService(this._GlobalScale);
        this.UpdateResolution();
    }

    public Resize() {
        let Width: number = this._Parent.clientWidth;
        let Height: number = this._Parent.clientHeight;
        if (!this._FixedSize) {
            this._Renderer.setSize(Width, Height);
            this._GlobalScale = new Mathematics.Vertex(this.Resolution.X / Width, this.Resolution.Y / Height, 1);
            this._Camera = new Three.OrthographicCamera(0, this.Resolution.X * this._GlobalScale.X, 0, this.Resolution.Y * this._GlobalScale.Y, 1, 100);
            this._Camera.position.z = 5;
        }
        else {
            this._Renderer.setSize(this.Resolution.X, this.Resolution.Y);
            this._GlobalScale = new Mathematics.Vertex(1, 1, 1);
            this._Camera = new Three.OrthographicCamera(0, this.Resolution.X, 0, this.Resolution.Y, 1, 100);
            this._Camera.position.z = 5;
        }
        if (this._ToyBoxScene) {
            this._ToyBoxScene.OnResize({
                GlobalScale: this._GlobalScale,
                Scale: this._ToyBoxScene.Trans.Scale,
                Ratio: Width / Height,
            });
        }
        if (this._Loader) {
            const threeLoader: ThreeObjectLoaderService = this._Loader as ThreeObjectLoaderService;
            threeLoader.UpdateResolution(this.Resolution);
            threeLoader.GlobalScale = this._GlobalScale;
        }
    }

    public override UpdateResolution(Resolution?: Mathematics.Vertex, FixedSize?: boolean) {
        super.UpdateResolution(Resolution, FixedSize);
        this.Resize();
    }

    public override DrawScene2D(Scene: Engine.Scene2D): void {
        this.LoadScene2D(Scene);
        this._Renderer.render(this._Scene, this._Camera);
    }

    protected LoadScene2D(Scene: Engine.Scene2D): void {
        if (this._ToyBoxScene !== Scene) {
            if (this._ToyBoxScene) {
                this._ToyBoxScene.Events.Resize.splice(this._ToyBoxScene.Events.Resize.indexOf(this.Resize), 1);
            }
            this._ToyBoxScene = Scene;
            this._ToyBoxScene.Events.Resize.push(this.Resize.bind(this));
            this.Resize();
        }
        this._Scene = this._Loader.LoadScene(Scene).Data as Three.Scene;
    }

    public override Preload2DScene(Scene: Engine.Scene2D, ReportProgress?: (Value: number) => void): void {
        this._Loader.PreloadScene(Scene, ReportProgress);
    }
}
