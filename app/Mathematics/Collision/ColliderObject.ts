import Vertex from '../Structures/Vertex';
import CollisionType from './CollisionType';

class ColliderObject {
    public Position: Vertex;
    public Scale: Vertex;
    public Type: CollisionType;
    public Reference: any;
}

export default ColliderObject;
