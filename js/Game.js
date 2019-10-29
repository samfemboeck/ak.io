import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";
import {Map} from "./Map.js";

// TODO Health
// TODO AI
// TODO Collision Detection
export class Game
{
    constructor()
    {
        this.canvas = $("#canvas")[0];
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;
        this.ctx = this.canvas.getContext("2d");

        this.gun = new Gun(this.ctx);
        this.map = new Map(5000, 5000);

        this.mousePosCanvas = new Vector(0, 0);
        this.mouseDirection = new Vector(0, 0);
        this.isActive = true;
        this.shootInterval = null;
        this.bullets = [];

        this.bindEvents();
    }

    start()
    {
        this.map.generate();
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
        this.mouseDirection = Vector.getUnit(this.gun.pivot, mousePosWorld);
        this.gun.rotation = -Math.atan2(this.mouseDirection.x, this.mouseDirection.y) - 0.5 * Math.PI;
    }

    handleMouseDown(event)
    {
        this.bullets.push(this.gun.shoot());
        this.shootInterval = setInterval($.proxy(() => this.bullets.push(this.gun.shoot()), this.gun), 200);
    }

    handleMouseUp(event)
    {
        clearInterval(this.shootInterval);
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
        let translateVector = Vector.invert(this.gun.velocity);
        this.ctx.translate(translateVector.x, translateVector.y);
        this.ctx.drawImage(this.map.image, 0, 0);

        this.gun.direction = this.mouseDirection;
        this.gun.update();

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