export {
    MouseButton,
    EventArguments
};

import { Game } from "../Game/Game";
import { Scene } from "../Scene/Scene";
import * as Core from "./../../Core/Core";
import * as Math from "./../../Mathematics/Mathematics";

enum MouseButton
{
    Left = 0,
    Middle = 1,
    Right = 2
}

type EventArguments = {
    Alt?: boolean,
    Ctrl?: boolean,
    Shift?: boolean,
    Delta?: number,
    Width?: number,
    Height?: number
    Identifier?: number,
    KeyCode?: string,
    MouseButton?: MouseButton,
    UnscaledLocation?: { X: number, Y: number },
    Location?: Math.Vertex,
    Sender?: Core.BaseObject,
    Next?: Scene
}
