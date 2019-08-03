export { ThreeGridManager }

import * as Three from 'three';
import * as Mathematics from "./../../Mathematics/Mathematics";
import * as Engine from "./../../Engine/Engine";
import * as Util from "./../../Util/Util";

const GRID_LINE_MAIN = "TOYBOX_GRID_LINE_MAIN";
const GRID_LINE_SIDE = "TOYBOX_GRID_LINE_SIDE";
const GRID_LINES = "TOYBOX_GRID_LINES";

class ThreeGridManager
{
    public static Create2DGrid(Scene:Three.Scene, Snap:number, Metadata:any)
    {
        if(!Metadata[GRID_LINE_MAIN])
        {
            Metadata[GRID_LINE_MAIN] = new Three.LineBasicMaterial({ color: 0x888888 });
            Metadata[GRID_LINE_SIDE] = new Three.LineBasicMaterial({ color: 0x333333 });
        }
        if(Metadata[GRID_LINES])
        {
            for(let i = 0; i < Metadata[GRID_LINES].lenght; i++)
            {
                Scene.remove(Metadata[GRID_LINES][i]);
            }
        }
        Metadata[GRID_LINES] = [];
        for(let i = -5; i <= 5; i++)
        {
            if(i == 0) continue;
            let HorizontalLineGeometry = new Three.Geometry();
            HorizontalLineGeometry.vertices.push(new Three.Vector3(-5 * Snap, i * Snap, -0.5));
            HorizontalLineGeometry.vertices.push(new Three.Vector3(5 * Snap, i * Snap, -0.5));
            let HorizontalLine = new Three.Line(HorizontalLineGeometry, Metadata[GRID_LINE_SIDE]);
            Scene.add(HorizontalLine);
            Metadata[GRID_LINES].push(HorizontalLine);
            let VerticalLineGeometry = new Three.Geometry();
            VerticalLineGeometry.vertices.push(new Three.Vector3(i * Snap, -5 * Snap, -0.5));
            VerticalLineGeometry.vertices.push(new Three.Vector3(i * Snap, 5 * Snap, -0.5));
            let VerticalLine = new Three.Line(VerticalLineGeometry, Metadata[GRID_LINE_SIDE]);
            Scene.add(VerticalLine);
            Metadata[GRID_LINES].push(VerticalLine);
        }
        let HorizontalLineGeometry = new Three.Geometry();
        HorizontalLineGeometry.vertices.push(new Three.Vector3(-5 * Snap, 0, -0.5));
        HorizontalLineGeometry.vertices.push(new Three.Vector3(5 * Snap, 0, -0.5));
        let HorizontalLine = new Three.Line(HorizontalLineGeometry, Metadata[GRID_LINE_MAIN]);
        Scene.add(HorizontalLine);
        Metadata[GRID_LINES].push(HorizontalLine);
        let VerticalLineGeometry = new Three.Geometry();
        VerticalLineGeometry.vertices.push(new Three.Vector3(0, -5 * Snap, -0.5));
        VerticalLineGeometry.vertices.push(new Three.Vector3(0, 5 * Snap, -0.5));
        let VerticalLine = new Three.Line(VerticalLineGeometry, Metadata[GRID_LINE_MAIN]);
        Scene.add(VerticalLine);
        Metadata[GRID_LINES].push(VerticalLine);
    }
    public static Update2DGrid(Scene:Engine.Scene2D, Metadata:any, Scale:Mathematics.Vertex)
    {
        if(Metadata[GRID_LINES])
        {
            for(let i = 0; i < Metadata[GRID_LINES].length; i++)
            {
                Metadata[GRID_LINES][i].position.set(Scene.Trans.Translation.X * Scale.X, Scene.Trans.Translation.Y * Scale.Y, 0);
            }
        }
    }
    public static CheckGrid(ThreeScene:Three.Scene, Scene:Engine.Scene2D, Metadata:any, Scale:Mathematics.Vertex)
    {
        if(Scene.Is(Engine.Type.Scene2D))
        {
            if(Scene.Data["EDITOR_GRID"] == "Classic" && !Metadata["TOYBOX_GRID"])
            {
                ThreeGridManager.Create2DGrid(ThreeScene, 100, Metadata);
                Metadata["TOYBOX_GRID"] = true;
            }
            if(Scene.Data["EDITOR_GRID"] != null)
            {
                ThreeGridManager.Update2DGrid(Scene, Metadata, Scale);
            }
        }
    }
}