export class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static getUnit(pos1, pos2)
    {
        return pos2.minus(pos1).normalize();
    }

    isApproximately(vector)
    {
        let diff = vector.minus(this);
        return Math.abs(diff.x) < 2 && Math.abs(diff.y) < 2;
    }

    plus(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    minus(vector)
    {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    equals(vector)
    {
        return this.x === vector.x && this.y === vector.y;
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