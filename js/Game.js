import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";
import {Map} from "./Map.js";

// TODO fix slip-through bug
// TODO Bullets löschen wenn außerhalb canvas
// TODO offset von ctx.translate() berechnen
export class Game
{
    constructor()
    {
        this.canvas = $("#canvas")[0];
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;
        this.gun = new Gun(this.canvas);
        this.mousePos = new Vector(0, 0);
        this.mouseDirUnit = new Vector(0, 0);
        this.isActive = true;
        this.shootInterval = null;
        this.map = new Map(5000, 5000);

        $(this.canvas).mousemove($.proxy(this.handleMouse, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKey, this));
    }

    start()
    {
        this.map.generate();
        this.mainLoop();
    }

    handleMouse(event)
    {
        this.mousePos.x = event.pageX;
        this.mousePos.y = event.pageY;
        let canvasOffset = new Vector(-this.ctx.getTransform().e, -this.ctx.getTransform().f);
        let mousePos = Vector.add(this.mousePos, canvasOffset);
        this.mouseDirUnit = Vector.getUnit(this.gun.pivot, mousePos);
        this.gun.rotation = -Math.atan2(this.mouseDirUnit.x, this.mouseDirUnit.y) - 0.5 * Math.PI;
    }

    handleMouseDown(event)
    {
        this.gun.shoot();
        this.shootInterval = setInterval($.proxy(this.gun.shoot, this.gun), 200);
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
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.map.width, this.map.height);
        let translateVector = Vector.invert(this.gun.velocity);
        ctx.translate(translateVector.x, translateVector.y);
        ctx.drawImage(this.map.image, 0, 0);

        this.gun.direction = this.mouseDirUnit;
        this.gun.update();
    }
}