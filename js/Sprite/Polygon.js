import {Vector} from "../Vector.js";
import {Bounds} from "../Bounds.js";

export class Polygon
{
    constructor(vertices)
    {
        this.vertices = vertices;
    }

    get bounds()
    {
        let minX, maxX, minY, maxY;
        minX = maxX = minY = maxY = 0;

        for (let vertex of this.vertices)
        {
            if (vertex[0] < minX)
                minX = vertex[0];
            else if (vertex[0] > maxX)
                maxX = vertex[0];
            if (vertex[1] < minY)
                minY = vertex[1];
            else if (vertex[1] > maxY)
                maxY = vertex[1];
        }

        return new Bounds(new Vector(0, 0), maxX - minX, maxY - minY);
    }
}

Polygon.Gun = [
    [-2, 3.5],
    [8, 3.5],
    [11, 0.5],
    [18, -1.5],
    [20, -0.5],
    [27, -2.5],
    [24, -11.5],
    [12, -4.5],
    [10, -4.5],
    [10, -5.5],
    [12, -10.5],
    [10, -12.5],
    [8, -12.5],
    [8, -10.5],
    [6, -5.5],
    [2, -2.5],
    [-8, -14.5],
    [-10, -12.5],
    [-2, -2.5],
    [-4, -2.5],
    [-4, -2.5],
    [-14, -1.5],
    [-14, -0.5],
    [-20, -0.5],
    [-20, -1.5],
    [-23, -1.5],
    [-23, -0.5],
    [-28, -0.5],
    [-28, 0.5],
    [-23, 0.5],
    [-21, 1.5],
    [-21, 2.5],
    [-14, 2.5],
    [-14, 3.5],
    [-7, 3.5],
    [-7, 4.5]
];

Polygon.Bullet = [[-7, 0], [0,0]];