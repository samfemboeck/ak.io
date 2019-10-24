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
        this.draw();
        this.move();
    }

    move()
    {
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }

    draw()
    {
        // implement in child class
    }
}