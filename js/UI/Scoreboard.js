export class Scoreboard
{
    constructor(camBounds)
    {
        this.ENTRIES = 5;

        this.camBounds = camBounds;
        this.width = this.camBounds.width / 8;
        this.height = this.camBounds.height / 4;
    }

    draw(ctx)
    {
        let fillStyle;
        let x = 0;
        let y = 0;
        let entryHeight = this.height / this.ENTRIES;

        for (let i = 0; i < this.ENTRIES; i++)
        {
            fillStyle = i % 2 === 0 ? "rgba(61, 61, 61, 0.6)" : "rgba(97, 97, 97, 0.6)";
            this.drawPlayer(ctx, x, y, this.width, entryHeight, fillStyle);
            y += entryHeight;
        }
    }

    drawPlayer(ctx, x, y, width, height, fillStyle)
    {
        ctx.fillStyle = fillStyle;
        ctx.rect(x, y, width, height);
        ctx.fill();
    }
}