import {Vector} from "./Vector.js";

export class Bounds
{
    width: number;
    height: number;
    center: Vector;
    min: Vector;
    max: Vector;

    constructor(pos: Vector, width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.center = pos;
        this.min = new Vector(this.center.x - 0.5 * this.width, this.center.y - 0.5 * this.height).round();
        this.max = new Vector(this.center.x + 0.5 * this.width, this.center.y + 0.5 * this.height).round();
    }
}