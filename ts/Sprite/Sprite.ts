import {Vector} from "../Vector.js";
import {MyMath} from "../MyMath.js";
import {Bounds} from "../Bounds.js";
import {Scalable} from "../Interface/Scalable.js";
import {SpriteSubject} from "./SpriteSubject.js";
import {Polygon} from "./Polygon.js";
import {Camera} from "../Camera.js";
import {Map} from "../Map.js";
import {LAYER} from "../CollisionHandler.js";
import {Observer} from "../Interface/Observer.js";

/**
 * implements basic behaviour for a Sprite
 */
export abstract class Sprite implements Scalable, Observer
{
    static INSTANCES: number = 0;
    tag: number = Sprite.INSTANCES++;
    layers: number[] = [];
    speed: number = 0;
    rotation: number = 0;
    direction = new Vector(0, 0);
    position = new Vector(0, 0);
    polygon: Polygon = null;
    scale: number = 1;
    fillStyle: string = "#000";
    strokeStyle: string = "#000";

    protected constructor(public subject: SpriteSubject)
    {
        this.subject.add(this);
    }

    abstract onCollide(other: Sprite): void;

    abstract onPostUpdate(camera: Camera, map: Map): any;

    get vertices(): Vector[]
    {
        let ret = [];
        for (let vertex of this.polygon.coordinates)
        {
            let x = this.scale * vertex[0];
            let y = this.scale * vertex[1];
            let pos = new Vector(this.position.x + x, this.position.y + y);
            ret.push(MyMath.getRotatedPosition(pos, this.rotation, this.position));
        }
        return ret;
    }

    get bounds(): Bounds
    {
        return new Bounds(this.position, this.polygon.bounds.width * this.scale, this.polygon.bounds.height * this.scale);
    }

    get velocity(): Vector
    {
        return Vector.times(this.direction, this.speed);
    }

    update(): this
    {
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
        this.position.round();
        return this;
    }

    // just create the polygon path here. Let the Child Class stroke() or fill().
    draw(ctx: CanvasRenderingContext2D): void
    {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        let coords = this.polygon.coordinates;
        ctx.beginPath();
        ctx.moveTo(coords[0][0], coords[0][1]);
        for (let c of coords)
        {
            ctx.lineTo(c[0], c[1])
        }
        ctx.lineTo(coords[0][0], coords[0][1]);
        ctx.closePath();
    }

    setRandomPosition(): void
    {
        let map: Map = this.subject.game.map;
        let rndX: number = Math.random() * (map.width - 2 * this.bounds.width);
        let rndY: number = Math.random() * (map.height - 2 * this.bounds.height);
        this.position = new Vector(rndX, rndY).round();
    }

    setScale(scale: number): void
    {
        this.scale = scale;
    }

    addLayer(layer: LAYER): void
    {
        this.layers.push(layer);
    }
}