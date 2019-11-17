import {Vector} from "./Vector.js";

export class Bounds
{
    constructor(pos, width, height)
    {
        this.width = width;
        this.height = height;
        this.center = pos;
        this.min = new Vector(this.center.x - 0.5 * this.width, this.center.y - 0.5 * this.height).round();
        this.max = new Vector(this.center.x + 0.5 * this.width, this.center.y + 0.5 * this.height).round();
    }
}