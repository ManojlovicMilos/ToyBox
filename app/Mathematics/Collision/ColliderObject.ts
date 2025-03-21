import * as Core from "./../../Core/Core";
import Vertex from "../Structures/Vertex";
import CollisionType from "./CollisionType";

export default class ColliderObject {
    public position: Vertex;
    public scale: Vertex;
    public type: CollisionType;
    public reference: Core.BaseObject;
}
