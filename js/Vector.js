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
}