import {Vector} from "./Vector.js"

export class Map
{
    width: number;
    height: number;
    gridSize: number;
    image: HTMLImageElement;

    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.gridSize = 100;
        this.image = this.generate();
    }

    generate(): HTMLImageElement
    {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        ctx.strokeStyle = "gray";

        let columnSize: number = this.width / this.gridSize;

        for (let y = 0; y < this.height; y += columnSize)
        {
            for (let x = 0; x < this.width; x += columnSize)
            {
                ctx.strokeRect(x, y, columnSize, columnSize);
            }
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#f00";
        ctx.strokeRect(0,0,this.width, this.height);

        // store the generate map as this image texture
        let image = new Image();
        image.src = ctx.canvas.toDataURL("image/png");
        return image;
    }

    containsPosition(position: Vector): boolean
    {
        return !(position.x < 0 ||
            position.x > this.width ||
            position.y < 0 ||
            position.y > this.height);
    }
}

