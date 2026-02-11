import * as Three from 'three';

import * as Core from '../../Core/Core';
import * as Engine from '../../Engine/Engine';
import * as Mathematics from '../../Mathematics/Mathematics';

import DataHandlerObject from '../DataHandlerObject';
import ObjectLoaderService from '../ObjectLoaderService';
import ThreeResourceLoaderService from './ThreeResourceLoaderService';

type ThreeRenderObjectDataUnion = Three.Scene | Three.Object3D | Three.Vector3;

class ThreeObjectLoaderService extends ObjectLoaderService<ThreeRenderObjectDataUnion> {
    private _Current2DScene: Engine.Scene2D;
    private _PreloadedScene: Engine.Scene;
    private _ProgressReport?: (Value: number) => void;

    public GlobalScale: Mathematics.Vertex;

    protected get threeResourceLoader(): ThreeResourceLoaderService { return this.resourceLoader as ThreeResourceLoaderService }

    public constructor(GlobalScale: Mathematics.Vertex) {
        super();
        this.GlobalScale = GlobalScale;
        this.resourceLoader = Core.Inject(ThreeResourceLoaderService);
    }

    public UpdateResolution(Resolution: Mathematics.Vertex): void {
        this.threeResourceLoader.Resolution = Resolution;
    }

    public PreloadScene(Scene: Engine.Scene, ProgressReport?: (Value: number) => void): void {
        this._PreloadedScene = Scene;
        this._ProgressReport = ProgressReport;
        this.LoadScene(Scene);
    }

    protected override Load2DScene(Scene: Engine.Scene2D): DataHandlerObject<Three.Scene, Engine.Scene2D> | null {
        this._Current2DScene = Scene;
        const isPreload = this.IsPreloaded(Scene);
        const loadedObject = this.Objects[Scene.ID] || {
            Data: new Three.Scene,
            Object: Scene,
        };
        this.Objects[Scene.ID] = loadedObject;
        const threeScene = loadedObject.Data as Three.Scene;
        threeScene.background = new Three.Color(Scene.BackColor.R, Scene.BackColor.G, Scene.BackColor.B);
        let processedObjectUuids = [];
        Scene.Objects.forEach((objectToLoad, index) => {
            const loadedObject = this.LoadSceneObject(objectToLoad as Engine.SceneObject);
            if (objectToLoad.Is(Engine.ImageObject)) {
                if (!this.CheckForCulling2D(Scene, objectToLoad as Engine.DrawObject) || isPreload) {
                    const threeObject: Three.Object3D = loadedObject.Data as Three.Object3D;
                    if(threeObject.parent !== threeScene) {
                        threeScene.add(threeObject);
                    }
                    processedObjectUuids.push(threeObject.uuid);
                }
            }
            if (isPreload && this._ProgressReport) {
                this._ProgressReport(Math.ceil(index * 100.0 / Scene.Objects.length));
            }
        });
        this.threeResourceLoader.Update2DLights();
        const threeSceneObjects = [...threeScene.children];
        threeSceneObjects.forEach((threeObject: Three.Object3D) => {
            if (!processedObjectUuids.includes(threeObject.uuid)) {
                threeScene.remove(threeObject);
            }
        });
        this._Current2DScene = null;
        return loadedObject as DataHandlerObject<Three.Scene, Engine.Scene2D>;
    }

    private IsPreloaded(Scene: Engine.Scene): boolean {
        return this._PreloadedScene && this._PreloadedScene.ID === Scene.ID;
    }

    protected CheckForCulling2D(scene: Engine.Scene2D, drawObject: Engine.DrawObject): boolean {
        if (drawObject.Fixed) return false;
        const resolution = this.threeResourceLoader.Resolution;
        const cullRange = resolution.X > resolution.Y ? resolution.X : resolution.Y;
        if (drawObject.Trans.Translation.X + scene.Trans.Translation.X + drawObject.Trans.Scale.X / 2 < 0 ||
            drawObject.Trans.Translation.Y + scene.Trans.Translation.Y + drawObject.Trans.Scale.Y / 2 < 0 ||
            drawObject.Trans.Translation.X + scene.Trans.Translation.X - drawObject.Trans.Scale.X / 2 > cullRange ||
            drawObject.Trans.Translation.Y + scene.Trans.Translation.Y - drawObject.Trans.Scale.Y / 2 > cullRange) {
            return true;
        }
        return false;
    }

    protected override LoadSceneObject(SceneObject: Engine.SceneObject): DataHandlerObject<Three.Object3D, Engine.SceneObject> | null {
        let loadedObject = this.Objects[SceneObject.ID] || null;
        if (SceneObject.Is(Engine.ImageObject)) {
            loadedObject = this.LoadImageObject(SceneObject as Engine.ImageObject);
        } else if (SceneObject.Is(Engine.Light)) {
            loadedObject = this.LoadLight2D(SceneObject as Engine.Light);
        }
        this.Objects[SceneObject.ID] = loadedObject;
        let processedObjectUuids = [];
        SceneObject.Children.forEach((objectToLoad: Engine.SceneObject) => {
            const loadedChild = this.LoadSceneObject(objectToLoad);
            if (objectToLoad.Is(Engine.ImageObject)) {
                processedObjectUuids.push((loadedObject.Data as Three.Object3D).uuid);
            }
        });
        if (SceneObject.Is(Engine.ImageObject)) {
            const threeChildObjects = [...(loadedObject.Data as Three.Object3D).children];
            threeChildObjects.forEach((threeObject: Three.Object3D) => {
                if (!processedObjectUuids.includes(threeObject.uuid)) {
                    (loadedObject.Data as Three.Object3D).remove(threeObject);
                }
            });
        }
        return loadedObject as DataHandlerObject<Three.Object3D, Engine.SceneObject>;
    }

    protected override LoadImageObject(imageObject: Engine.ImageObject): DataHandlerObject<Three.Object3D, Engine.ImageObject> | null {
        const loadedObject = this.Objects[imageObject.ID] || {
            Data: null,
            Object: imageObject,
        };
        if (!loadedObject.Data) {
            const parentDataObject = this.Objects[imageObject.Parent.ID];
            const threeParent = parentDataObject.Data as Three.Object3D;
            const material = this.threeResourceLoader.LoadMaterial(imageObject).Data;
            loadedObject.Data = new Three.Mesh(new Three.BoxGeometry(1, 1, 1), material);
            threeParent.add(loadedObject.Data as Three.Object3D);
            this.DrawObjectValueCheck(loadedObject as DataHandlerObject<Three.Object3D, Engine.DrawObject>);
        }
        if (imageObject.Modified) {
            (loadedObject.Data as Three.Mesh).material = this.threeResourceLoader.LoadMaterial(imageObject).Data;
            imageObject.Modified = false;
        }
        (loadedObject.Data as Three.Mesh).material['uniforms'].color.value = imageObject.Paint.ToArray();
        this.DrawObjectValueCheck(loadedObject as DataHandlerObject<Three.Object3D, Engine.DrawObject>);
        return loadedObject as DataHandlerObject<Three.Object3D, Engine.Tile>;
    }

    protected override LoadLight2D(Light: Engine.Light): DataHandlerObject<Three.Vector3, Engine.Light> | null {
        return this.threeResourceLoader.LoadLight(Light);
    }

    private DrawObjectValueCheck(renderDataObject: DataHandlerObject<Three.Object3D, Engine.DrawObject>) {
        renderDataObject.Data.visible = renderDataObject.Object.Active;
        renderDataObject.Data.name = renderDataObject.Object.Name;
        renderDataObject.Data.position.copy(this.DrawObjectTranslationTransform(renderDataObject.Object));
        renderDataObject.Data.scale.set(
            renderDataObject.Object.Trans.Scale.X * this.GlobalScale.X,
            renderDataObject.Object.Trans.Scale.Y * this.GlobalScale.Y,
            1,
        );
        renderDataObject.Data.rotation.set(
            (renderDataObject.Object.Trans.Rotation.X / 180) * 3.14,
            (renderDataObject.Object.Trans.Rotation.Y / 180) * 3.14, 
            (renderDataObject.Object.Trans.Rotation.Z / 180) * 3.14,
        );
    }

    private DrawObjectTranslationTransform(Drawn: Engine.DrawObject): Three.Vector3 {
        let Translate: Three.Vector3 = new Three.Vector3();
        if (!Drawn.Fixed) Translate.set(
            (this._Current2DScene.Trans.Translation.X + Drawn.Trans.Translation.X) * this.GlobalScale.X,
            (this._Current2DScene.Trans.Translation.Y + Drawn.Trans.Translation.Y) * this.GlobalScale.Y,
            Drawn.Trans.Translation.Z,
        );
        else Translate.set(
            Drawn.Trans.Translation.X * this.GlobalScale.X,
            Drawn.Trans.Translation.Y * this.GlobalScale.Y,
            Drawn.Trans.Translation.Z
        );
        return Translate;
    }
}

export default ThreeObjectLoaderService;
