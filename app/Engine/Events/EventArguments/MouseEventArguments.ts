import * as Math from './../../../Mathematics/Mathematics';

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}

type MouseEventArguments = {
    delta?: number;
    mouseButton?: MouseButton;
    location?: Math.Vertex;
    viewportLocation?: Math.Vertex;
}

export default MouseEventArguments;
