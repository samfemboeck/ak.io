import {Sprite} from "./Sprite.js";
import {CollisionHandler} from "./CollisionHandler.js";
import {Polygon} from "./Polygon.js";

// TODO
export class Bullet extends Sprite
{
    constructor(entityHandler, direction, speed, rotation)
    {
        super(entityHandler);

        this.LAYERS = [CollisionHandler.LAYERS.BULLET];
        this.NAME = "Bullet";

        this.speed = speed;
        this.direction = direction;
        this.rotation = rotation;
        this.width = 5;
        this.height = 0.5;
        this.damage = 5;
        this.polygon = new Polygon(Polygon.Bullet);
    }

    update()
    {
        super.update();
    }

    draw(ctx)
    {
        ctx.strokeStyle = '#000';
        let vertices = this.polygon.vertices;
        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);
        ctx.lineTo(vertices[1][0], vertices[1][1]);
        ctx.closePath();
        ctx.stroke();
    }

    onCollide(other)
    {
        this.entityHandler.remove(this);
    }

    shouldBeRemoved(camera)
    {
            return this.position.x < camera.bounds.min.x ||
                this.position.x > camera.bounds.max.x ||
                this.position.y < camera.bounds.min.y ||
                this.position.y > camera.bounds.max.y
    }
}