import {Player} from "./Player.js";
import {Vector} from "./Vector.js";
import {Map} from "./Map.js";
import {EntityHandler} from "./EntityHandler.js";
import {AI} from "./AI.js";
import {CollisionHandler} from "./CollisionHandler.js";
import {DrawHandler} from "./DrawHandler.js";
import {Camera} from "./Camera.js";

/**
 * Game Loop + Event Delegation
 */

// TODO setter umschreiben auf ECMA6
// TODO Event Handler
export class Game
{
    constructor()
    {
        this.isActive = true;
        this.entityHandler = new EntityHandler(this);
        this.collisionHandler = new CollisionHandler(this);
        this.map = new Map(5000, 5000);
        this.drawHandler = new DrawHandler(this);

        this.bindEvents();
    }

    start()
    {
        this.player = new Player(this.entityHandler);
        this.setRandomPosition(this.player);
        this.camera = new Camera(this.drawHandler, this.player); // follow player
        this.opponent = new AI(this.entityHandler, this.player);
        this.mainLoop();
    }

    mainLoop()
    {
        window.requestAnimationFrame(() => this.mainLoop());
        if (!this.isActive) return;

        this.update();
    }

    update()
    {
        let sprites = this.entityHandler.update();
        this.collisionHandler.checkCollisions(sprites);
        this.drawHandler.draw(sprites);
        this.camera.update();
    }

    bindEvents()
    {
        $(this.drawHandler.canvas).mousemove($.proxy(this.handleMouseMove, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKeyDown, this));
        $(document).keyup($.proxy(this.handleKeyUp, this));
    }

    handleMouseMove(event)
    {
        let mousePosCanvas = new Vector(event.pageX, event.pageY);
        let mousePosWorld = this.camera.canvasToWorldPosition(mousePosCanvas);
        this.player.mouseDirection = Vector.substract(mousePosWorld, this.player.position).unitVector;
    }

    handleMouseDown()
    {
        this.player.setShooting();
    }

    handleMouseUp()
    {
        this.player.unsetShooting();
    }

    handleKeyDown(event)
    {
        let key = event.originalEvent.key;

        if (key === "p")
        {
            this.isActive = !this.isActive;
        }

        if (key === "l")
        {
            console.log(this.entityHandler.entities)
            console.log(this.camera.position)
            console.log(this.camera.ctxTransform)
        }

        if (key === "i")
        {
            this.camera.setScale(this.camera.scale - 0.05);
            this.player.scale += 1;
        }

        if (key === "o")
        {
            this.camera.moveTo(Vector.add(this.camera.position, new Vector(2, 0)))
        }

        this.player.handleKeyDown(event.originalEvent.key)
    }

    handleKeyUp(event)
    {
        this.player.handleKeyUp(event.originalEvent.key);
    }

    setRandomPosition(sprite)
    {
        let rndX = Math.random() * (this.map.width - sprite.width);
        let rndY = Math.random() * (this.map.height - sprite.height);
        sprite.position = new Vector(rndX, rndY);
    }
}
