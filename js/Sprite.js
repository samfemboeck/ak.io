import {Vector} from "./Vector.js";
import {MyMath} from "./MyMath.js";

/**
 * implements basic behaviour for a Sprite
 */
export class Sprite
{
    constructor(entityHandler)
    {
        this.TAG = Sprite.INSTANCES++;
        this.LAYERS = [];
        this.NAME = "Sprite";

        this.entityHandler = entityHandler;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.direction = new Vector(0, 0);
        this.position = new Vector(0, 0);
        this.polygon = null;
        this.scale = 1;

        this.entityHandler.add(this);
    }

    get vertices()
    {
        let ret = [];

        let vertices = this.polygon.vertices;

        for (let vertex of vertices)
        {
            let x = this.scale * vertex[0];
            let y = this.scale * vertex[1];
            let pos = new Vector(this.position.x + x, this.position.y + y);
            ret.push(MyMath.getRotatedPosition(pos, this.rotation, this.position));
        }

        return ret;
    }

    get bounds()
    {
        return Vector.times(this.polygon.bounds, this.scale);
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

    /**
     * just create the polygon path here. Let the Child Class stroke() or fill().
     * @param ctx
     */
    draw(ctx)
    {
        let vertices = this.polygon.vertices;

        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);

        for (let vertex of vertices)
        {
            ctx.lineTo(vertex[0], vertex[1])
        }

        ctx.lineTo(vertices[0][0], vertices[0][1]);
        ctx.closePath();
    }

    onCollide(other)
    {
        // implement in child class
    }

    shouldBeRemoved(camera)
    {
        return false;
    }
}

Sprite.INSTANCES = 0;