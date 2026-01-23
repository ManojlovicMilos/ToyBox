import * as Howler from 'howler';

import * as Core from '../../Core/Core';

import SceneObject from './SceneObject';

@Core.TypedObject('TBX.SoundObject')
class SoundObject extends SceneObject {
    private _Autoplay: boolean;
    private _Looped: boolean;
    private _Volume: number;
    private _Url: string;
    private _Sound: Howler.Howl;

    public get Autoplay(): boolean { return this._Autoplay; }
    public set Autoplay(value: boolean) { this._Autoplay = value; this.GenerateSound(); }
    public get Looped(): boolean { return this._Looped; }
    public set Looped(value: boolean) { this._Looped = value; this.GenerateSound(); }
    public get Volume(): number { return this._Volume; }
    public set Volume(value: number) { this._Volume = value; this._Sound.volume(this._Volume); }
    public get Url(): string { return this._Url; }
    public set Url(value: string) { this._Url = value; this.GenerateSound(); }
    public get Sound(): Howler.Howl { return this._Sound; }

    public constructor(Old?: SoundObject, Url?: string) {
        super(Old);
        this.RegisterType(SoundObject);
        if (Old != null) {
            this._Autoplay = Old._Autoplay;
            this._Looped = Old._Looped;
            this._Volume = Old._Volume;
            this._Url = Old._Url;
        }
        else {
            this._Autoplay = false;
            this._Looped = false;
            this._Volume = 50;
            this._Url = Url;
        }
        this.GenerateSound();
    }

    public Copy(): SoundObject {
        return new SoundObject(this);
    }

    private GenerateSound(): void {
        if (this._Sound) this._Sound.unload();
        this._Sound = new Howler.Howl(
            {
                src: this._Url,
                autoplay: this._Autoplay,
                loop: this._Looped,
                volume: this._Volume / 100.0,
                preload: true
            }
        )
    }

    public Play(): void {
        this._Sound.play();
    }

    public Serialize(): any {
        // Override
        let SO = super.Serialize();
        SO.Autoplay = this._Autoplay;
        SO.Looped = this._Looped;
        SO.Volume = this._Volume;
        SO.Url = this._Url;
        return SO;
    }

    public Deserialize(Data): void {
        // Override
        super.Deserialize(Data);
        this._Autoplay = Data.Autoplay;
        this._Looped = Data.Looped;
        this._Volume = Data.Volume;
        this.GenerateSound();
    }
}

export default SoundObject;
