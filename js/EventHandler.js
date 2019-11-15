import {Vector} from "./Vector.js";
import {ScaleInterpolator} from "./ScaleInterpolator.js";

export class EventHandler
{
    constructor(game)
    {
        this.game = game;
        this.mousePosWorld = null;
        this.bindEvents();
    }

    bindEvents()
    {
        $(this.game.drawHandler.canvas).mousemove($.proxy(this.handleMouseMove, this));
        $(document).mousedown($.proxy(this.handleMouseDown, this));
        $(document).mouseup($.proxy(this.handleMouseUp, this));
        $(document).keydown($.proxy(this.handleKeyDown, this));
        $(document).keyup($.proxy(this.handleKeyUp, this));
    }

    handleMouseMove(event)
    {
        let mousePosCanvas = new Vector(event.pageX, event.pageY);
        this.mousePosWorld = this.game.camera.canvasToWorldPosition(mousePosCanvas);
        this.game.player.mouseDirection = Vector.substract(this.mousePosWorld, this.game.player.position).unitVector;
    }

    handleMouseDown()
    {
        this.game.player.setShooting();
    }

    handleMouseUp()
    {
        this.game.player.unsetShooting();
    }

    handleKeyDown(event)
    {
        let key = event.originalEvent.key;

        if (key === "p")
        {
            this.game.isActive = !this.game.isActive;
        }

        if (key === "f")
        {
            this.game.drawHandler.exportImage();
        }

        if (key === "l")
        {
        }

        if (key === "i")
        {
            new ScaleInterpolator(this.game.player, this.game.player.scale + 3, 1000);
        }

        if (key === "o")
        {
            this.game.camera.moveTo(Vector.add(this.game.camera.position, new Vector(2, 0)))
        }

        if (key === "e")
            this.game.end();

        this.game.player.handleKeyDown(event.originalEvent.key)
    }

    handleKeyUp(event)
    {
        this.game.player.handleKeyUp(event.originalEvent.key);
    }
}