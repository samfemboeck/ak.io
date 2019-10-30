import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";
import {Map} from "./Map.js";
import {AI} from "./AI.js";

// TODO Health
// TODO AI
// TODO Collision Detection
// TODO Bei Gun Collision beide tot
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
        this.bullets = [];

        this.bindEvents();
    }

    start()
    {
        this.map = new Map(5000, 5000);
        this.map.generate();

        this.player = new Gun(this.ctx, this.bullets);
        this.opponent = new AI(this.ctx, this.bullets);
        this.opponent.position = Vector.add(this.player.position, new Vector(-0.25 * this.canvas.width, -0.25 * this.canvas.height));
        this.opponent.setTarget(this.player);

        this.mainLoop();
    }

    bindEvents()
    {
        $(this.canvas).mousemove($.proxy(this.handleMouse, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKey, this));
    }

    handleMouse(event)
    {
        this.mousePosCanvas.x = event.pageX;
        this.mousePosCanvas.y = event.pageY;
        let transformOffset = new Vector(-this.ctx.getTransform().e, -this.ctx.getTransform().f);
        let mousePosWorld = Vector.add(this.mousePosCanvas, transformOffset);
        this.mouseDirection = Vector.getUnit(this.player.pivot, mousePosWorld);
        this.player.direction = this.mouseDirection;
    }

    handleMouseDown(event)
    {
        this.player.setShooting(this.bullets);
    }

    handleMouseUp(event)
    {
        this.player.unsetShooting();
    }

    handleKey(event)
    {
        if (event.originalEvent.key === "s")
        {
            this.isActive = !this.isActive;
        }
    }

    mainLoop()
    {
        window.requestAnimationFrame(() => this.mainLoop());
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.map.width, this.map.height);
        let translateVector = Vector.invert(this.player.velocity);
        this.ctx.translate(translateVector.x, translateVector.y);
        this.ctx.drawImage(this.map.image, 0, 0);

        this.player.direction = this.mouseDirection;
        this.player.update();

        this.opponent.update();

        for (let i = 0; i < this.bullets.length; i++)
        {
            let bullet = this.bullets[i];
            if (bullet.position.x < 0 ||
                bullet.position.x > this.map.width ||
                bullet.position.y < 0 ||
                bullet.position.y > this.map.height)
            {
                this.bullets.splice(i, 1);
            }
            else
            {
                bullet.update();
            }
        }
    }
}