import {Vector} from "./Vector.js";

export class Bounds
{
    constructor(pos, width, height)
    {
        this.width = width;
        this.height = height;
        this.center = Vector.add(pos, new Vector(this.width / 2, this.height / 2));
        this.min = pos;
        this.max = Vector.add(pos, new Vector(this.width, this.height));
    }
}