/**
 * Helper Class for Common Vector problems
 */
export class Vector
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    round(): this
    {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    static fromTuples(tuples: [number, number][]): Vector[]
    {
        let ret = [];
        for (let t of tuples)
        {
            ret.push(new Vector(t[0], t[1]));
        }
        return ret;
    }

    static substract(v1, v2): Vector
    {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static dotProduct(v1, v2): number
    {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static add(v1, v2): Vector
    {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static invert(vector): Vector
    {
        return new Vector(-vector.x, -vector.y);
    }

    static times(vector, factor): Vector
    {
        return new Vector(vector.x * factor, vector.y * factor);
    }

    get magnitude(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalLeft(): Vector
    {
        return new Vector(-this.y, this.x);
    }

    get unitVector(): Vector
    {
        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    get invertedVector(): Vector
    {
        return new Vector(-this.x, -this.y);
    }

    toString(): string
    {
        return "{x: " + this.x + ", y: " + this.y + "}";
    }
}