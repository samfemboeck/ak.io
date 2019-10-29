import {Sprite} from "./Sprite.js";

export class Bullet extends Sprite
{
    constructor(ctx, direction, speed, rotation, position)
    {
        super(ctx);
        this.speed = speed;
        this.direction = direction;
        this.rotation = rotation;
        this.position = position;
        this.width = 5;
        this.height = 5;
    }
}