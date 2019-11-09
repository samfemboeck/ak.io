import {Vector} from "./Vector.js";
import {EntityHandler} from "./EntityHandler.js";
import {MyMath} from "./MyMath.js";

/**
 * implements basic behaviour for a Rectangle Sprite
 */
export class Sprite
{
    constructor(game)
    {
        this.TAG = EntityHandler.TAGS.NONE;
        this.LAYERS = [];

        this.game = game;
        this.ctx = game.ctx;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.direction = new Vector(0, 0);
        this.position = new Vector(0, 0);

        game.entityHandler.add(this);
    }

    get vertices()
    {
        let vertices = [];

        let leftTop = new Vector(this.position.x - 0.5 * this.width, this.position.y - 0.5 * this.height);
        vertices.push(MyMath.getRotatedPosition(leftTop, this.rotation, this.position));

        let rightTop = new Vector(this.position.x + 0.5 * this.width, this.position.y - 0.5 * this.height);
        vertices.push(MyMath.getRotatedPosition(rightTop, this.rotation, this.position));

        let rightBottom = new Vector(this.position.x + 0.5 * this.width, this.position.y + 0.5 * this.height);
        vertices.push(MyMath.getRotatedPosition(rightBottom, this.rotation, this.position));

        let leftBottom = new Vector(this.position.x - 0.5 * this.width, this.position.y + 0.5 * this.height);
        vertices.push(MyMath.getRotatedPosition(leftBottom, this.rotation, this.position));

        return vertices;
    }

    get velocity()
    {
        return Vector.times(this.direction, this.speed);
    }

    update()
    {
        this.move();
        this.draw();
    }

    move()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw()
    {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        this.ctx.restore();
    }

    rotate(direction)
    {
        let dir = direction ? direction : this.direction;
        this.rotation = -Math.atan2(dir.x, dir.y) - 0.5 * Math.PI;
    }

    onCollide(other)
    {
        // implement in child class
    }
}