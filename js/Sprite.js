import {Vector} from "./Vector.js";
import {MyMath} from "./MyMath.js";

/**
 * implements basic behaviour for a Sprite
 */
export class Sprite
{
    constructor(entityHandler)
    {
        this.TAG = Sprite.instances++;
        this.LAYERS = [];

        this.entityHandler = entityHandler;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.direction = new Vector(0, 0);
        this.position = new Vector(0, 0);
        this.polygon = [];
        this.scale = 1;

        this.entityHandler.add(this);
    }

    get vertices()
    {
        let ret = [];

        for (let i in this.polygon)
        {
            let x = this.scale * this.polygon[i][0];
            let y = this.scale * this.polygon[i][1];
            let pos = new Vector(this.position.x + x, this.position.y + y);
            ret.push(MyMath.getRotatedPosition(pos, this.rotation, this.position));
        }

        return ret;
    }

    get velocity()
    {
        return Vector.times(this.direction, this.speed);
    }

    update()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx)
    {
        // just create the polygon path here
        ctx.beginPath();
        ctx.moveTo(this.polygon[0][0], this.polygon[0][1]);

        for (let i = 1; i < this.polygon.length; i++)
        {
            ctx.lineTo(this.polygon[i][0], this.polygon[i][1])
        }

        ctx.lineTo(this.polygon[0][0], this.polygon[0][1]);
        ctx.closePath();
    }

    onCollide(other)
    {
        // implement in child class
    }
}

Sprite.instances = 0;