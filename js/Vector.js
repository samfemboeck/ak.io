export class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    plus(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    minus(vector)
    {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
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