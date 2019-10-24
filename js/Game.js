import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";

export class Game
{
    constructor()
    {
        this.canvas = $("#canvas")[0];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.getContext("2d").translate(this.canvas.width / 2, this.canvas.height / 2);

        this.gun = new Gun(this.canvas);
    }

    start()
    {
        this.main();
    }

    main()
    {
        window.requestAnimationFrame(() => this.main());
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.translate
        this.gun.draw();
    }
}