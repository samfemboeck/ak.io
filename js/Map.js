import {Sprite} from "./Sprite.js";
import {CollisionHandler} from "./CollisionHandler.js";

export class Map extends Sprite
{
    constructor(entityHandler, width, height)
    {
        super(entityHandler);

        this.LAYERS = [CollisionHandler.LAYERS.NON_COLLIDABLE];

        this.width = width;
        this.height = height;
        this.gridSize = 100;
        this.image = this.generate();
    }

    generate()
    {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        ctx.strokeStyle = "gray";

        let columnSize = this.width / this.gridSize;

        for (let y = 0; y < this.height; y += columnSize)
        {
            for (let x = 0; x < this.width; x += columnSize)
            {
                ctx.strokeRect(x, y, columnSize, columnSize);
            }
        }

        // store the generate map as this image texture
        let image = new Image();
        image.src = ctx.canvas.toDataURL("image/png");
        return image;
    }

    draw(ctx)
    {
        ctx.drawImage(this.image, 0, 0);
    }
}
