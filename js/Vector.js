export class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static getUnit(pos1, pos2)
    {
        return Vector.substract(pos2, pos1).normalize();
    }

    static substract(v1, v2)
    {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
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

    normalize()
    {
        let mag = this.magnitude;
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    approximateEpsilon()
    {
        let epsilon = 1e-15;

        if (Math.abs(0 - this.x) <= epsilon)
        {
            this.x = 0;
        }

        if (Math.abs(0 - this.y) <= epsilon)
        {
            this.y = 0;
        }

        return this;
    }

    toString()
    {
        return "{x: " + this.x + ", y: " + this.y + "}";
    }
}