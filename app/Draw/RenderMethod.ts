import * as Engine from "../Engine/Engine";

type SceneObjectRenderer = (sceneObject: Engine.Scene | Engine.SceneObject) => void;

export default SceneObjectRenderer;
