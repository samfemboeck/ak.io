/**
 * Helper Class for Common Vector problems
 */
export class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    round()
    {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    static substract(v1, v2)
    {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static dotProduct(v1, v2)
    {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static add(v1, v2)
    {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static invert(vector)
    {
        return new Vector(-vector.x, -vector.y);
    }

    static times(vector, factor)
    {
        return new Vector(vector.x * factor, vector.y * factor);
    }

    static equals(v1, v2)
    {
        return v1.x === v2.x && v1.y === v2.y
    }

    get magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalLeft()
    {
        return new Vector(-this.y, this.x);
    }

    get unitVector()
    {
        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    get invertedVector()
    {
        return new Vector(-this.x, -this.y);
    }

    toString()
    {
        return "{x: " + this.x + ", y: " + this.y + "}";
    }
}