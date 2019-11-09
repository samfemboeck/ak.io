import {Sprite} from "./Sprite.js";
import {EntityHandler} from "./EntityHandler.js";

export class Bullet extends Sprite
{
    constructor(game, direction, speed, rotation, position)
    {
        super(game);

        this.LAYERS = [EntityHandler.LAYERS.BULLET];

        this.speed = speed;
        this.direction = direction;
        this.rotation = rotation;
        this.position = position;
        this.width = 10;
        this.height = 1;
    }

    update()
    {
        super.update();
    }

    onCollide(other)
    {
        this.game.entityHandler.remove(this);
    }
}