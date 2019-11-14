import {UIElement} from "./UIElement.js";

export class Scoreboard extends UIElement
{
    constructor(uiSubject)
    {
        super(uiSubject);

        this.camBounds = null;
        this.width = null;
        this.height = null;
        this.guns = [];
    }

    update(camBounds)
    {
        this.camBounds = camBounds;
        this.width = this.camBounds.width / 8;
        this.height = this.camBounds.height / 4;
    }

    draw(ctx)
    {
        let fillStyle;
        let y = 0;
        let entryHeight = this.height / this.guns.length;

        for (let i = 0; i < this.guns.length; i++)
        {
            fillStyle = i % 2 === 0 ? "rgba(61, 61, 61, 0.6)" : "rgba(97, 97, 97, 0.6)";
            this.drawGun(ctx, 0, y, this.width, entryHeight, fillStyle, this.guns[i]);
            y += entryHeight;
        }
    }

    drawGun(ctx, x, y, width, height, fillStyle, gun)
    {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, width, height);
        ctx.font = "20px Raleway";
        ctx.fillStyle = "#fff";
        ctx.fillText(gun.displayName, x + 5, y + 25, this.width - 5);
    }

    addGun(gun)
    {
        this.guns.push(gun);
    }
}