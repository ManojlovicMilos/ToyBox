export { Game };

import * as Core from './../../Core/Core';
import { Scene } from './../Scene/Scene';
import { SceneObject } from '../SceneObject/SceneObject';

const TITLE_ELEMENT = 'title';
const DEFAULT_GAME_NAME = 'ToyBox Game';

class Game extends Core.BaseObject {
    private _Scenes: Scene[];
    private _Assets: SceneObject[];
    public set name(value: string) { this.name = value; this.updateName(); }
    public get Scenes(): Scene[] { return this._Scenes; }
    public set Scenes(value: Scene[]) { this._Scenes = value; }
    public get Assets(): SceneObject[] { return this._Assets; }
    public set Assets(value: SceneObject[]) { this._Assets = value; }

    public constructor(old?: Game, name?: string) {
        super(old);
        this.name = name || DEFAULT_GAME_NAME;
        this._Scenes = [];
        this.UpdateName();
    }

    public override duplicate(): Game {
        let New: Game = new Game();
        New._Name = this._Name;
        return New;
    }

    

    public override attach(Scene: Core.BaseObject): void {
        if ()
        this._Children.push(Scene);
    }

    public Remove(Scene: Scene): void {
        this.Data[Scene.Name] = null;
        this._Scenes.splice(this._Scenes.indexOf(Scene), 1);
    }

    public RemoveByName(SceneName: string): void {
        this._Scenes.splice(this.Data[SceneName], 1);
        this.Data[SceneName] = null;
    }

    public findByData(key: string, data?: any): any[] {
        let Objects: any[] = [];
        for (let i = 0; i < this._Scenes.length; i++) {
            if (this._Scenes[i].data[key]) {
                if (data) {
                    if (this._Scenes[i].data[key] == data) Objects.push(this._Scenes[i]);
                }
                else Objects.push(this._Scenes[i]);
            }
        }
        return Objects;
    }

    private updateName(): void {
        let Title: HTMLElement = document.getElementById(TITLE_ELEMENT) as HTMLElement;
        Title.innerHTML = this.name;
    }
}
