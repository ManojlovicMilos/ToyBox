import * as Core from "./toybox-core";
import * as Math from "./toybox-math";
import * as Draw from "./toybox-draw";
import * as Engine from "./toybox-engine";

export class RunnerService extends Core.Service {
    Game: Engine.Game;
    DrawEngine: Draw.DrawEngine;
    constructor()
    Init(Game: Engine.Game, EngineType?: typeof Draw.DrawEngine, HTMLElementId?: string): void
    SwitchScene(SceneName: string): void
    PreloadScene(SceneName: string): void
    SetResolution(Resolution: Math.Vertex, FixedSize?: boolean)
    Run(): void
    Stop(): void
    PickSceneObject(Position: Math.Vertex): Engine.SceneObject
    TouchscreenDevice(): boolean
}
