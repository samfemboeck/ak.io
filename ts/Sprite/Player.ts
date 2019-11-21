import {Gun} from "./Gun.js";
import {Vector} from "../Vector.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {MyMath} from "../MyMath.js";
import {SpriteSubject} from "./SpriteSubject.js";
import {Bullet} from "./Bullet.js";

/**
 * Handles Player Input
 */
export class Player extends Gun
{
    public mouseDirection = new Vector(0, 0);
    private moveRight = 0;
    private moveLeft = 0;
    private moveUp = 0;
    private moveDown = 0;

    constructor(subj: SpriteSubject)
    {
        super(subj);
        this.addLayer(CollisionHandler.LAYER.PLAYER);
        this.displayName = "player1";
    }

    handleKeyDown(key): void
    {
        if (key === "d")
            this.moveRight = 1;
        if (key === "a")
            this.moveLeft = 1;
        if (key === "w")
            this.moveUp = 1;
        if (key === "s")
            this.moveDown = 1;
    }

    handleKeyUp(key): void
    {
        if (key === "d")
            this.moveRight = 0;
        if (key === "a")
            this.moveLeft = 0;
        if (key === "w")
            this.moveUp = 0;
        if (key === "s")
            this.moveDown = 0;
    }

    update(): this
    {
        let ret = super.update();
        let moveX: number = this.moveRight - this.moveLeft;
        let moveY: number = this.moveDown - this.moveUp;
        this.direction = new Vector(moveX, moveY);
        this.rotation = MyMath.getRotationForDirection(this.mouseDirection) - 0.5 * Math.PI;
        return ret;
    }

    shootBullet(): Bullet
    {
        let bullet = super.shootBullet();
        bullet.direction = this.mouseDirection;
        bullet.strokeStyle = "#25ad00";
        bullet.addLayer(CollisionHandler.LAYER.PLAYER);
        new Audio("wav/shot.wav").play();
        return bullet;
    }
}