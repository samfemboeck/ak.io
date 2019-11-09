import {Player} from "./Player.js";
import {Vector} from "./Vector.js";
import {Map} from "./Map.js";
import {EntityHandler} from "./EntityHandler.js";
import {AI} from "./AI.js";

// TODO Health
// TODO Bei Gun Collision beide tot
/**
 * Game Loop + Event Delegation
 */
export class Game
{
    constructor()
    {
        this.canvas = $("#canvas")[0];
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;
        this.ctx = this.canvas.getContext("2d");
        this.mousePosCanvas = new Vector(0, 0);
        this.mouseDirection = new Vector(0, 0);
        this.isActive = true;
        this.entityHandler = new EntityHandler(this);

        this.bindEvents();
    }

    start()
    {
        this.map = new Map(this.entityHandler,5000, 5000);

        this.player = new Player(this.entityHandler, this.mouseDirection);
        this.player.position = new Vector(this.ctx.canvas.width / 2 - 0.5 * this.player.width, this.ctx.canvas.height / 2 - 0.5 * this.player.height);

        this.opponent = new AI(this.entityHandler, this.player);

        this.mainLoop();
    }

    bindEvents()
    {
        $(this.canvas).mousemove($.proxy(this.handleMouse, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKeyDown, this));
        $(document).keyup($.proxy(this.handleKeyUp, this));
    }

    handleMouse(event)
    {
        this.mousePosCanvas.x = event.pageX;
        this.mousePosCanvas.y = event.pageY;
        let transformOffset = new Vector(-this.ctx.getTransform().e, -this.ctx.getTransform().f);
        this.mousePosWorld = Vector.add(this.mousePosCanvas, transformOffset);
        this.mouseDirection = Vector.substract(this.mousePosWorld, this.player.position).unitVector;
        this.player.mouseDirection = this.mouseDirection;
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
            // log something
            console.log(this.entityHandler.entities)
        }

        this.player.handleKeyDown(event.originalEvent.key)
    }

    handleKeyUp(event)
    {
        this.player.handleKeyUp(event.originalEvent.key);
    }

    mainLoop()
    {
        window.requestAnimationFrame(() => this.mainLoop());
        if (!this.isActive) return;

        let translateVector = this.player.velocity.invertedVector; // "Camera follow"
        this.ctx.translate(translateVector.x, translateVector.y);

        this.entityHandler.updateEntities();
    }
}