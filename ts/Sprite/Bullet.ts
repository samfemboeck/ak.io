import {Sprite} from "./Sprite.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {Polygon} from "./Polygon.js";
import {Vector} from "../Vector.js";
import {SpriteSubject} from "./SpriteSubject.js";

export class Bullet extends Sprite
{
    damage: number = 5;

    constructor(subj: SpriteSubject, dir: Vector, rot: number)
    {
        super(subj);

        this.addLayer(CollisionHandler.LAYER.BULLET);
        this.direction = dir;
        this.rotation = rot;
        this.polygon = Polygon.BULLET;
    }

    draw(ctx): void
    {
        super.draw(ctx);
        ctx.stroke();
    }

    onCollide(other: Sprite): void
    {
        this.subject.remove(this);
    }

    onPostUpdate(camera, map)
    {
        if (!camera.containsPosition(this.position) || !map.containsPosition(this.position))
        {
            this.subject.remove(this);
        }
    }
}