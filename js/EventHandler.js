import {Vector} from "./Vector.js";

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
        $(this.game.drawHandler.canvasMain).mousemove($.proxy(this.handleMouseMove, this));
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
            console.log(this.game.camera.bounds);
            console.log(this.mousePosWorld);
        }

        if (key === "i")
        {
            this.game.spriteSubject.reportKill(this.game.bot, 0);
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