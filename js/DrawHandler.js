export class DrawHandler
{
    constructor(game)
    {
        this.game = game;
        this.canvasMain = document.getElementById("main");
        this.canvasMain.width = window.innerWidth * (4/5);
        this.canvasMain.height = window.innerHeight;
        this.canvasScoreboard = document.getElementById("scoreboard");
        this.canvasScoreboard.width = window.innerWidth * (1/5);
        this.canvasScoreboard.height = window.innerHeight;
    }

    draw(sprites)
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

    drawUI(uiElements)
    {
        let ctx = this.canvasMain.getContext("2d");
        let camBounds = this.game.camera.bounds;

        for (let elem of uiElements)
        {
            ctx.save();
            ctx.translate(camBounds.min.x, camBounds.min.y);
            elem.draw(ctx);
            ctx.restore();
        }
    }

    drawScoreboard()
    {
        let ctx = this.canvasScoreboard.getContext("2d");
        this.game.scoreBoard.draw(ctx);
    }

    exportImage()
    {
        let url = this.canvasMain.toDataURL();
        window.open(url);
    }
}