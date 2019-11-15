import {UIElement} from "./UIElement.js";
import {Player} from "../Sprite/Player.js";

export class Scoreboard extends UIElement
{
    constructor(uiSubject)
    {
        super(uiSubject);

        this.width = null;
        this.height = null;
        this.guns = [];
    }

    update(camera)
    {
        super.update(camera);
        this.width = this.camBounds.width / 4;
        this.height = this.camBounds.height / 4;
    }

    draw(ctx)
    {
        let y = 0;
        let entryHeight = this.height / this.guns.length;

        for (let i = 1; i <= this.guns.length; i++)
        {
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, y, this.width, entryHeight);

            let rankTxt = "  " + i + "  ";
            let fontSize = 20 * (1 / this.camera.scale);
            ctx.textBaseline = "middle";
            ctx.font = fontSize + "px Roboto";
            ctx.fillStyle = "#fff";
            ctx.fillText(rankTxt, 0, y + entryHeight / 2);
            ctx.fillStyle = this.guns[i-1] instanceof Player ? "#00FFEE" : "#fff";
            ctx.fillText(this.guns[i-1].displayName, ctx.measureText(rankTxt).width, y + entryHeight / 2);

            let imageSize = 30 * (1 / this.camera.scale);
            let img = new Image();
            img.src = "img/crosshair-white-alpha.png";
            let marginRight = ctx.measureText("  ").width;
            let imgX = this.width - imageSize - marginRight;
            ctx.drawImage(img, imgX, y + (0.5 * entryHeight) - (imageSize / 2), imageSize, imageSize);

            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.fillText(this.guns[i-1].kills, imgX - ctx.measureText("  ").width, y + 0.5 * entryHeight);
            ctx.restore();

            y += entryHeight;
        }
    }

    sort()
    {
        this.guns.sort((a, b) => (a.kills > b.kills) ? -1 : 1);
    }

    addGun(gun)
    {
        this.guns.push(gun);
    }
}