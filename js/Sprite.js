import {Vector} from "./Vector.js";

export class Sprite
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = Math.PI;
        this.direction = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
    }

    get pivot()
    {
        let x = this.x + 0.5 * this.width;
        let y = this.y - 0.5 * this.height;
        return new Vector(x, y);
    }

    update()
    {
        this.velocity = Vector.times(this.direction, this.speed);
        this.move();
        this.draw();
    }

    move()
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw()
    {
        // implement in child class
    }
}