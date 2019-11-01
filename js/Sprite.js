import {Vector} from "./Vector.js";
import {EntityHandler} from "./EntityHandler.js";

export class Sprite
{
    constructor(game)
    {
        this.TAG = EntityHandler.TAGS.NONE;

        this.game = game;
        this.ctx = game.ctx;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = Math.PI;
        this.direction = new Vector(0, 0);
        this.position = new Vector(0, 0);
    }

    get leftTop()
    {
       return null // TODO
    }

    get rightBottom()
    {
        return null // TODO
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
        this.rotation = -Math.atan2(dir.x, dir.y);
    }

    onCollide(other)
    {
        // implement in child class
    }

    overlaps(other)
    {
        debugger;

        if (this.leftTop.x > other.rightBottom.x || other.leftTop.x > this.rightBottom.x)
            return false;

        if (this.leftTop.y < other.rightBottom.y || other.leftTop.y < this.rightBottom.y)
            return false;

        return true;
    }
}