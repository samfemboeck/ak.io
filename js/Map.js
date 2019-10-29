export class Map
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.gridSize = 100;
        this.image = null; // generate on-the-fly
    }

    generate()
    {
        var ctx = document.createElement("canvas").getContext("2d");
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
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");
    }
}
