import * as Three from 'three';
import * as Engine from '../../Engine/Engine';
import * as Math from '../../Mathematics/Mathematics';

import { ThreeBasicShaders } from './ThreeBasicShaders';
import ResourceLoaderService from '../ResourceLoaderService';
import { ThreeShaderGenerator } from './ThreeShaderGenerator';
import DataHandlerObject from '../DataHandlerObject';

const TOYBOX_MAX_LIGHTS = 8;

type ThreeUniformsObject = { [key: string]: { type: string, value: unknown } };
type ThreeResourceObjectDataUnion = Three.ShaderMaterial | Three.Texture | Three.Texture[] | Three.Vector3;

class ThreeResourceLoaderService extends ResourceLoaderService<ThreeResourceObjectDataUnion> {
    private _TextureLoader: Three.TextureLoader;
    private _LitMaterials: Three.ShaderMaterial[];
    private _2DLights: DataHandlerObject<Three.Vector3, Engine.Light>[];

    public Resolution: Math.Vertex;

    public constructor() {
        super();
        this._TextureLoader = new Three.TextureLoader();
        this._LitMaterials = [];
        this._2DLights = [];
        this.Resolution = new Math.Vertex(1,1,0);
    }

    public override LoadMaterial(ImageObject: Engine.ImageObject): DataHandlerObject<Three.ShaderMaterial, Engine.Material> | null {
        if (this.Resources[ImageObject.Material.ID] && !ImageObject.Modified) {
            return this.Resources[ImageObject.Material.ID] as DataHandlerObject<Three.ShaderMaterial, Engine.Material>;
        }
        const index: number = ImageObject.Index;
        const imageCollectionTextures: Three.Texture[] = this.LoadCollection(ImageObject.Collection).Data;
        const textureArray = imageCollectionTextures.length > 0 ? [imageCollectionTextures[index]] : [];
        if (ImageObject.Material.HasNormals && ImageObject.NormalCollection) {
            const normalsCollectionTextures: Three.Texture[] = this.LoadCollection(ImageObject.NormalCollection).Data;
            if (normalsCollectionTextures.length > 0) {
                textureArray.push(normalsCollectionTextures[index]);
            }
        }
        const material = this.GenerateMaterial(ImageObject, textureArray);
        if (ImageObject.Material.IsLit) {
            this.RegisterLitMaterial(material);
        }
        return this.RegisterResource(ImageObject.Material.ID, material, ImageObject.Material) as DataHandlerObject<Three.ShaderMaterial, Engine.Material>;
    }

    public override LoadCollection(Collection: Engine.ImageCollection): DataHandlerObject<Three.Texture[], Engine.ImageCollection> | null {
        if (this.Resources[Collection.ID]) {
            return this.Resources[Collection.ID] as DataHandlerObject<Three.Texture[], Engine.ImageCollection>;
        }
        const textures: Three.Texture[] = Collection.Images.map((Path: string) => this.LoadTexture(Collection, Path).Data);
        return this.RegisterResource(Collection.ID, textures, Collection) as DataHandlerObject<Three.Texture[], Engine.ImageCollection>;
    }

    public override LoadTexture(Collection: Engine.ImageCollection, Path: string): DataHandlerObject<Three.Texture, string> | null {
        const textureId = Collection.ID + '_' + Path;
        if (this.Resources[textureId]) {
            return this.Resources[textureId] as DataHandlerObject<Three.Texture, string>;
        }
        const newTexture = this._TextureLoader.load(Path);
        newTexture.flipY = false;
        if (Collection.Sampling == Engine.TextureSampling.Nearest) {
            newTexture.magFilter = Three.NearestFilter;
            newTexture.minFilter = Three.NearestMipMapNearestFilter;
        }
        else if (Collection.Sampling == Engine.TextureSampling.Linear) {
            newTexture.magFilter = Three.LinearFilter;
            newTexture.minFilter = Three.LinearMipMapLinearFilter;
        }
        return this.RegisterResource(textureId, newTexture, Path) as DataHandlerObject<Three.Texture, string>;
    }

    public LoadLight(Light: Engine.Light): DataHandlerObject<Three.Vector3, Engine.Light> | null {
        if (this.Resources[Light.ID]) {
            return this.Resources[Light.ID] as DataHandlerObject<Three.Vector3, Engine.Light>;
        }
        const totalTranslation = this.GetTotalTranslation(Light);
        const lightResource = this.RegisterResource(Light.ID, this.ConvertToThreeVector(totalTranslation), Light) as DataHandlerObject<Three.Vector3, Engine.Light>;
        this._2DLights.push(lightResource);
        return lightResource;
    }

    public Update2DLights(): void {
        let LightsPack: any = this.Pack2DLights();
        this._LitMaterials.forEach((material) => {
            material.uniforms.radii.value = LightsPack.Radii.value;
            material.uniforms.locations.value = LightsPack.Locations.value;
            material.uniforms.intensities.value = LightsPack.Intensities.value;
            material.uniforms.attenuations.value = LightsPack.Attenuations.value;
            material.uniforms.lightColors.value = LightsPack.LightColors.value;
            material.uniforms.lightParameters.value = LightsPack.Parameters.value;
            material.uniforms.lightDirections.value = LightsPack.Directions.value;
            material.uniforms.lightTypes.value = LightsPack.Types.value;
        });
    }

    private GetTotalTranslation(drawObject: Engine.DrawObject): Math.Vertex {
        if (drawObject.Parent) {
            if (drawObject.Parent.Is(Engine.Scene2D)) {
                return (drawObject.Parent as Engine.Scene2D).Trans.Translation.Add(drawObject.Trans.Translation);
            } else {
                return this.GetTotalTranslation(drawObject.Parent as Engine.DrawObject).Add(drawObject.Trans.Translation);
            }
        }
        else return drawObject.Trans.Translation.Copy();
    }

    private ConvertToThreeVector(Location: Math.Vertex): Three.Vector3 {
        let NewVector = new Three.Vector3(Location.X, Location.Y, Location.Z);
        NewVector.x -= this.Resolution.X / 2;
        NewVector.x /= this.Resolution.X;
        NewVector.x *= 2;
        NewVector.y -= this.Resolution.Y / 2;
        NewVector.y /= this.Resolution.Y;
        NewVector.y *= -2;
        return NewVector;
    }

    private GenerateMaterial(Drawn: Engine.ImageObject, Textures: Three.Texture[]): Three.ShaderMaterial {
        let Index: number = Drawn.Index;
        const hasTextures = Textures && Textures.length > 0;
        let Uniforms: ThreeUniformsObject = {
            index: { type: 'i', value: hasTextures ? Index : -1 },
            flipx: { type: 'i', value: (Drawn.FlipX) ? 1 : 0 },
            flipy: { type: 'i', value: (Drawn.FlipY) ? 1 : 0 },
            color: { type: 'v4', value: Drawn.Paint.ToArray() },
            tex: { type: 'tv', value: hasTextures ? Textures[0] : null },
            repeatx: { type: 'f', value: Drawn.RepeatX },
            repeaty: { type: 'f', value: Drawn.RepeatY }
        };
        let VertexShader = ThreeBasicShaders.Vertex2D;
        let FragmentShader = ThreeBasicShaders.Fragment2D;
        if (Drawn.Material.IsLit) {
            VertexShader = ThreeBasicShaders.LitVertex2D;
            FragmentShader = ThreeBasicShaders.LitFragment2D;
            this.PrePack2DLights(Uniforms);
            Uniforms.ambient = { type: 'v4', value: Drawn.AmbientColor.ToArray() };
        }
        if (Drawn.Material.HasNormals) {
            if (Drawn.NormalMaps && Drawn.NormalMaps.length == 0) Index = -1;
            else {
                FragmentShader = ThreeBasicShaders.PhongFragment2D;
                Uniforms.normalMap = { type: 'tv', value: Textures[1] };
            }
        }
        if (Drawn.Material.Type == Engine.MaterialType.Custom ||
            Drawn.Material.Type == Engine.MaterialType.Shader) {
            for (let i in Drawn.Material.Inputs) {
                let Input: Engine.MaterialInput = Drawn.Material.Inputs[i];
                if (Drawn.Data[Input.ID] != null) {
                    if (<string>Input.Type == 'tv') {
                        if (this.Resources[Input.ID] == null) {
                            let Path: string = Drawn.Data[Input.ID];
                            this.Resources[Input.ID] = this.LoadTexture(Drawn.Collection, Path);
                        }
                        Uniforms[Input.ID] = { type: <string>Input.Type, value: this.Resources[Input.ID].Data };
                    }
                    else {
                        Uniforms[Input.ID] = { type: <string>Input.Type, value: Drawn.Data[Input.ID] };
                    }
                }
            }
        }
        if (Drawn.Material.Type == Engine.MaterialType.Toon) {
            FragmentShader = ThreeBasicShaders.ToonFragment2D;
        }
        if (Drawn.Material.Type == Engine.MaterialType.Custom) {
            FragmentShader = ThreeShaderGenerator.GenerateFragment(Drawn.Material);
        }
        if (Drawn.Material.Type == Engine.MaterialType.Shader) {
            if (Drawn.Material.Shaders.Vertex != '') VertexShader = Drawn.Material.Shaders.Vertex;
            if (Drawn.Material.Shaders.Fragment != '') FragmentShader = Drawn.Material.Shaders.Fragment;
        }
        let DrawnMaterial = new Three.ShaderMaterial({
            uniforms: Uniforms,
            vertexShader: VertexShader,
            fragmentShader: FragmentShader    
        });
        DrawnMaterial.transparent = true;
        return DrawnMaterial;
    }

    private RegisterLitMaterial(Material: any): void {
        this._LitMaterials.push(Material);
    }

    private PrePack2DLights(Uniforms: ThreeUniformsObject): void {
        let LightsPack: ThreeUniformsObject = this.Pack2DLights();
        Uniforms.radii = LightsPack.Radii;
        Uniforms.locations = LightsPack.Locations;
        Uniforms.intensities = LightsPack.Intensities;
        Uniforms.attenuations = LightsPack.Attenuations;
        Uniforms.lightColors = LightsPack.LightColors;
        Uniforms.lightTypes = LightsPack.Types;
        Uniforms.lightParameters = LightsPack.Parameters;
        Uniforms.lightDirections = LightsPack.Directions;
    }

    private Pack2DLights(): ThreeUniformsObject {
        let Radii = new Array(TOYBOX_MAX_LIGHTS).fill(.0);
        let Locations = new Array(TOYBOX_MAX_LIGHTS).fill(new Three.Vector3());
        let Intensities = new Array(TOYBOX_MAX_LIGHTS).fill(.0);
        let Attenuations = new Array(TOYBOX_MAX_LIGHTS).fill(new Three.Vector3());
        let LightColors = new Array(TOYBOX_MAX_LIGHTS).fill(new Three.Vector4());
        let Parameters = new Array(TOYBOX_MAX_LIGHTS).fill(.0);
        let Directions = new Array(TOYBOX_MAX_LIGHTS).fill(new Three.Vector3());
        let Types = new Array(TOYBOX_MAX_LIGHTS).fill(0);
        let appliedLights = 0;
        this._2DLights.forEach((lightResource) => {
            const light = lightResource.Object;
            if (lightResource.Object.Active) {
                const index = appliedLights;
                Radii[index] = light.Radius / 100;
                Locations[index] = lightResource.Data;
                Intensities[index] = lightResource.Object.Intensity / 100;
                Attenuations[index] = TMGUtil.Vec3FromData(lightResource.Object.Attenuation.ToVertex().ToArray());
                LightColors[index] = TMGUtil.Vec4FromData(lightResource.Object.Paint.ToArray());
                Parameters[index] = lightResource.Object.Parameter;
                Directions[index] = TMGUtil.Vec3FromData(lightResource.Object.Direction.ToArray());
                Types[index] = TMGUtil.CodeLightType(lightResource.Object.Type);
                appliedLights++;
            }
        });
        const x = {
            Radii: { type: 'fv', value: Radii },
            Locations: { type: 'v3v', value: Locations },
            Intensities: { type: 'fv', value: Intensities },
            Attenuations: { type: 'v3v', value: Attenuations },
            LightColors: { type: 'v4v', value: LightColors },
            Parameters: { type: 'fv', value: Parameters },
            Directions: { type: 'v3v', value: Directions },
            Types: { type: 'iv', value: Types }
        };
        return x;
    }
}

class TMGUtil {
    public static CodeLightType(Type: string): number {
        if (Type == Engine.Light.TypeNameToken) return 0;
        if (Type == Engine.SpotLight.TypeNameToken) return 1;
        if (Type == Engine.DirectionalLight.TypeNameToken) return 2;
        return -1;
    }

    public static Vec3FromData(Data: number[]): Three.Vector3 {
        return new Three.Vector3(Data[0], Data[1], Data[2]);
    }

    public static Vec4FromData(Data: number[]): Three.Vector4 {
        return new Three.Vector4(Data[0], Data[1], Data[2], Data[3]);
    }

    public static PrepLightLoc(Location: Math.Vertex, Resolution: Math.Vertex): Three.Vector3 {
        let NewVector = new Three.Vector3(Location.X, Location.Y, Location.Z);
        NewVector.x -= Resolution.X / 2;
        NewVector.x /= Resolution.X;
        NewVector.x *= 2;
        NewVector.y -= Resolution.Y / 2;
        NewVector.y /= Resolution.Y;
        NewVector.y *= -2;
        return NewVector;
    }
}

export default ThreeResourceLoaderService;
