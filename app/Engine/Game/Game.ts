export { Game };

import * as Core from './../../Core/Core';
import { Scene } from '../Scenes/Scene/Scene';

const TITLE_ELEMENT = 'title';
const DEFAULT_GAME_NAME = 'ToyBox Game';
const SCENE_NOT_FOUND = 'Could not find scene by name: ';
const SCENE_WRONG_TYPE_MESSAGE = 'Cannot add scene, wrong type.';

class Game extends Core.BaseObject {

    public set name(value: string) { this.name = value; this.updateName(); }
    public get scenes(): Scene[] { return this.children as Scene[]; }
    public set Scenes(value: Scene[]) { this.children = value; }

    public constructor(name?: string) {
        super();
        this.name = name || DEFAULT_GAME_NAME;
        this.children = [];
        this.updateName();
    }

    public override duplicate(): Game {
        return new Game(this.name);
    }

    public override attach(scene: Scene): void {
        if (scene.is(Scene)) {
            this.scenes.push(scene);
        } else {
            this.log.warning(SCENE_WRONG_TYPE_MESSAGE);
        }
    }

    public removeSceneByName(name: string): void {
        const scene: Scene = this.findChildByName(name) as Scene;
        if (scene) {
            this.remove(scene.id);
        } else {
            this.log.warning(SCENE_NOT_FOUND + name);
        }
    }

    private updateName(): void {
        let Title: HTMLElement = document.getElementById(TITLE_ELEMENT) as HTMLElement;
        Title.innerHTML = this.name;
    }
}
