import * as Howler from "howler";

import SceneObject from "../SceneObject/SceneObject";

const DEFAULT_VOLUME = 50;

class SoundObject extends SceneObject {
    private _sound: Howl;
    private _url: string;
    private _volume: number;
    private _looped: boolean;
    private _autoplay: boolean;

    public get autoplay(): boolean { return this._autoplay; }
    public set autoplay(value: boolean) { this._autoplay = value; this.generateSound(); }
    public get looped(): boolean { return this._looped; }
    public set looped(value: boolean) { this._looped = value; this.generateSound(); }
    public get volume(): number { return this._volume; }
    public set volume(value: number) { this._volume = value; this._sound.volume(this._volume); }
    public get url(): string { return this._url; }
    public set url(value: string) { this._url = value; this.generateSound(); }
    public get sound(): Howl { return this._sound; }

    public constructor(old?: SoundObject, url?: string) {
        super(old);
        this._url = url || old._url;
        this._volume = old._volume || DEFAULT_VOLUME;
        this._looped = old._looped || false;
        this._autoplay = old._autoplay || false;
        this.generateSound();
    }

    public override duplicate(): SoundObject {
        return new SoundObject(this);
    }

    private generateSound(): void {
        if (this._sound) this._sound.unload();
        this._sound = new Howler.Howl({
            src: this._url,
            autoplay: this._autoplay,
            loop: this._looped,
            volume: this._volume / 100.0,
            preload: true,
        });
    }

    public play(): void {
        this._sound.play();
    }
}

export default SoundObject;
