import {Sprite} from "./Sprite.js";
import {CollisionHandler} from "./CollisionHandler.js";

// TODO
export class Bullet extends Sprite
{
    constructor(entityHandler, direction, speed, rotation, position)
    {
        super(entityHandler);

        this.LAYERS = [CollisionHandler.LAYERS.BULLET];

        this.speed = speed;
        this.direction = direction;
        this.rotation = rotation;
        this.position = position;
        this.width = 5;
        this.height = 0.5;
        this.damage = 5;
        this.polygon = [[-4, 0], [-3,1], [3,1], [3,-1], [-3,-1]];
    }

    update()
    {
        super.update();
    }

    draw(ctx)
    {
        ctx.fillStyle = '#000';
        super.draw(ctx);
        ctx.fill();
    }

    onCollide(other)
    {
        this.entityHandler.remove(this);
    }
}