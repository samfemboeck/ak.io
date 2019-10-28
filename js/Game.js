import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";

// TODO fix slip-through bug
// TODO Bullets löschen wenn außerhalb canvas
// TODO offset von ctx.translate() berechnen
export class Game
{
    constructor()
    {
        this.canvas = $("#canvas")[0];
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 10;
        this.gun = new Gun(this.canvas);
        this.mousePos = new Vector(0, 0);
        this.mouseDirUnit = new Vector(0, 0);
        this.isActive = true;
        this.shootInterval = null;

        $(this.canvas).mousemove($.proxy(this.handleMouse, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKey, this));
    }

    start()
    {
        this.main();
    }

    handleMouse(event)
    {
        this.mousePos.x = event.pageX;
        this.mousePos.y = event.pageY;
        this.mouseDirUnit = Vector.getUnit(this.gun.pivot, this.mousePos);
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

    main()
    {
        window.requestAnimationFrame(() => this.main());
        if (!this.isActive) return;

        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mousePos.isApproximately(this.gun.pivot))
        {
            this.gun.velocity = new Vector(0, 0);
        }
        else
        {
            this.gun.velocity = this.mouseDirUnit;
        }

        this.gun.update();
    }
}