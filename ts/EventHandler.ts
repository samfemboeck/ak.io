import {Vector} from "./Vector.js";
import {Game} from "./Game.js";

export class EventHandler
{
    game: Game;
    mousePosWorld: Vector = null;

    constructor(game: Game)
    {
        this.game = game;
        this.bindEvents();
    }

    bindEvents(): void
    {
        this.game.drawHandler.canvasMain.addEventListener("mousemove", this.handleMouseMove.bind(this));
        document.addEventListener("mousedown", this.handleMouseDown.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleMouseMove(event): void
    {
        let mousePosCanvas = new Vector(event.pageX, event.pageY);
        this.mousePosWorld = this.game.camera.canvasToWorldPosition(mousePosCanvas);
        this.game.player.mouseDirection = Vector.substract(this.mousePosWorld, this.game.player.position).unitVector;
    }

    handleMouseDown(): void
    {
        this.game.player.setShooting();
    }

    handleMouseUp(): void
    {
        this.game.player.unsetShooting();
    }

    handleKeyDown(event): void
    {
        let key: string = event.key;

        if (key === "p")
        {
            if (this.game.isActive)
            {
                this.game.messageObject.setMessage("Paused");
                setTimeout(() => this.game.isActive = !this.game.isActive, 50);
            }
            else
            {
                this.game.messageObject.unsetMessage();
                this.game.isActive = true;
            }
        }

        if (key === "f")
        {
            this.game.drawHandler.exportImage();
        }

        if (key === "e")
        {
            this.game.end(this.game.player);
        }

        if (key === "r")
        {
            window.location.reload();
        }

        this.game.player.handleKeyDown(event.key)
    }

    handleKeyUp(event): void
    {
        this.game.player.handleKeyUp(event.key);
    }
}