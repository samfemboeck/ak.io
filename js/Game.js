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
        this.map = new Map(5000, 5000);
        this.map.generate();

        this.player = new Player(this);

        this.opponent = new AI(this, this.player);
        this.opponent.position = Vector.add(this.player.position, new Vector(-0.25 * this.canvas.width, -0.25 * this.canvas.height));
        this.opponent.setTarget(this.player);

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
        this.player.rotate(this.mouseDirection);
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
            console.log(this.player.rotation)
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

        this.ctx.clearRect(0, 0, this.map.width, this.map.height);
        let translateVector = this.player.velocity.invertedVector; // "Camera follow"
        this.ctx.translate(translateVector.x, translateVector.y);
        this.ctx.drawImage(this.map.image, 0, 0);

        this.entityHandler.updateEntities();
    }
}