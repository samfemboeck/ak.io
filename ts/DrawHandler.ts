import {Game} from "./Game.js"
import {Sprite} from "./Sprite/Sprite.js"
import {UIElement} from "./UI/UIElement.js"
import {Bounds} from "./Bounds.js";

export class DrawHandler
{
    game: Game;
    canvasMain: HTMLCanvasElement;
    canvasScoreboard: HTMLCanvasElement;

    constructor(game)
    {
        this.game = game;
        this.canvasMain = <HTMLCanvasElement> document.getElementById("main");
        this.canvasMain.width = window.innerWidth * (4/5);
        this.canvasMain.height = window.innerHeight;
        this.canvasScoreboard = <HTMLCanvasElement> document.getElementById("scoreboard");
        this.canvasScoreboard.width = window.innerWidth * (1/5);
        this.canvasScoreboard.height = window.innerHeight;
    }

    draw(sprites: Sprite[]): void
    {
        let ctx = this.canvasMain.getContext("2d");

        ctx.clearRect(0, 0, this.game.map.width, this.game.map.height);
        ctx.drawImage(this.game.map.image, 0, 0);

        for (let sprite of sprites)
        {
            ctx.save();
            ctx.translate(sprite.position.x, sprite.position.y);
            ctx.rotate(sprite.rotation);
            ctx.scale(sprite.scale, sprite.scale);
            sprite.draw(ctx);
            ctx.restore();
        }
    }

    drawUI(uiElements: UIElement[]): void
    {
        let ctx = this.canvasMain.getContext("2d");
        let camBounds: Bounds = this.game.camera.bounds;

        for (let elem of uiElements)
        {
            ctx.save();
            ctx.translate(camBounds.min.x, camBounds.min.y);
            elem.draw(ctx);
            ctx.restore();
        }
    }

    drawScoreboard(): void
    {
        let ctx = this.canvasScoreboard.getContext("2d");
        this.game.scoreBoard.draw(ctx);
    }

    exportImage(): void
    {
        let url = this.canvasMain.toDataURL();
        window.open(url);
    }
}