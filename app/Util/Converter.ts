export  { Convert };

import * as Data from "./../Data/Data";
import * as Engine from "./../Engine/Engine";
import * as Math from "./../Mathematics/Mathematics";

class Convert
{
    public static VerticesToByteArray(Vertices:Math.Vector[], Relevant:number) : Float32Array
    {
        let NewArrayBuffer:number[] = [];
        for(let i = 0; i < Vertices.length; i++)
        {
            NewArrayBuffer.push(Vertices[i].X);
            if(Relevant > 1) NewArrayBuffer.push(Vertices[i].Y);
            else if(Relevant > 2) NewArrayBuffer.push(Vertices[i].Z);
        }
        return new Float32Array(NewArrayBuffer);
    }
    public static DrawObjectToCollider(Object:Engine.DrawObject) : Math.Collider
    {
        let Collider:Math.Collider = new Math.Collider();
        Collider.Position = Object.Trans.Translation;
        Collider.Scale = Object.Trans.Scale;
        Collider.Type = <Math.CollisionType>Object.Data["Collision"];
        return Collider;
    }
}