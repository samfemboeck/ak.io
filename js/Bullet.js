import {Sprite} from "./Sprite.js";
import {EntityHandler} from "./EntityHandler.js";

export class Bullet extends Sprite
{
    constructor(game, direction, speed, rotation, position)
    {
        super(game);

        this.TAG = EntityHandler.TAGS.BULLET;

        this.speed = speed;
        this.direction = direction;
        this.rotation = rotation;
        this.position = position;
        this.width = 5;
        this.height = 5;
    }

    update()
    {
        super.update();
    }

    onCollide(other)
    {
        console.log("BULLET COLLISION");
    }
}