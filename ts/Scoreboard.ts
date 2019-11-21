import {Player} from "./Sprite/Player.js";
import {Gun} from "./Sprite/Gun.js";

export class Scoreboard
{
    width: number;
    height: number;
    entryHeight: number;
    guns: Gun[] = [];
    bulletImgSize: number = 25;
    bulletImg: HTMLImageElement;

    constructor(public canvas: HTMLCanvasElement)
    {
        this.width = canvas.width;
        this.height = canvas.height;
        this.entryHeight = this.height / 20;
        this.bulletImg = new Image(this.bulletImgSize, this.bulletImgSize);
        this.bulletImg.src = "img/crosshair-white-alpha.png";
    }

    draw(ctx): void
    {
        this.sort();

        let x = 0;
        let y = 0;

        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#414141";
        ctx.textBaseline = "middle";
        ctx.font = "20px Roboto";

        ctx.fillRect(x, y, this.width, this.height);

        for (let i = 1; i <= this.guns.length; i++, y += this.entryHeight)
        {
            ctx.moveTo(x, y + this.entryHeight);
            ctx.lineTo(x + this.width, y + this.entryHeight);
            ctx.stroke();

            let rank: string = "    " + i + "    ";
            ctx.fillStyle = "#fff";
            ctx.fillText(rank, x, y + this.entryHeight / 2);

            ctx.fillStyle = this.guns[i-1] instanceof Player ? "#0f0" : "#fff";
            ctx.fillText(this.guns[i-1].displayName, x + ctx.measureText(rank).width, y + this.entryHeight / 2);

            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.fillText(this.guns[i-1].kills + "", this.width - this.bulletImgSize - ctx.measureText("    ").width , y + this.entryHeight / 2);
            ctx.textAlign = "start";
        }

        if (this.bulletImg.complete)
        {
            this.drawBulletImages();
        }
        else
        {
            this.bulletImg.onload = this.drawBulletImages.bind(this);
        }
    }

    drawBulletImages(): void
    {
        let ctx = this.canvas.getContext("2d");

        for (let i = 0, y = 0; i < this.guns.length; i++, y += this.entryHeight)
        {
            ctx.drawImage(this.bulletImg, this.width - ctx.measureText("  ").width - this.bulletImgSize, y + (0.5 * this.entryHeight) - (this.bulletImgSize / 2), this.bulletImgSize, this.bulletImgSize);
        }
    }

    sort(): void
    {
        this.guns.sort((a, b) => (a.kills > b.kills) ? -1 : 1);
    }

    addGun(gun: Gun): void
    {
        this.guns.push(gun);
    }
}