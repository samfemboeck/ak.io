import {Player} from "./Sprite/Player.js";
import {Map} from "./Map.js";
import {Bot} from "./Sprite/Bot.js";
import {DrawHandler} from "./DrawHandler.js";
import {Camera} from "./Camera.js";
import {SpriteSubject} from "./Sprite/SpriteSubject.js";
import {UISubject} from "./UI/UISubject.js";
import {EventHandler} from "./EventHandler.js";
import {Scoreboard} from "./Scoreboard.js";
import {MessageObject} from "./UI/MessageObject.js";
import {Vector} from "./Vector.js";

export class Game
{
    isActive: boolean = true;
    spriteSubject: SpriteSubject;
    uiSubject: UISubject;
    map: Map;
    drawHandler: DrawHandler;
    eventHandler: EventHandler;
    player: Player;
    camera: Camera;
    scoreBoard: Scoreboard;
    messageObject: MessageObject;

    constructor()
    {
        this.isActive = true;
        this.spriteSubject = new SpriteSubject(this);
        this.uiSubject = new UISubject(this);
        this.map = new Map(5000, 5000);
        this.drawHandler = new DrawHandler(this);
        this.eventHandler = new EventHandler(this);
    }

    start(): void
    {
        this.player = new Player(this.spriteSubject);
        this.player.position = new Vector(this.map.width / 2, this.map.height / 2);
        this.camera = new Camera(this.drawHandler, this.player);
        this.scoreBoard = new Scoreboard(this.drawHandler.canvasScoreboard);
        debugger;
        this.scoreBoard.addGun(this.player);

        for (let i = 0; i < 6; i++)
        {
            let bot = new Bot(this.spriteSubject, this.player);
            bot.setRandomPosition();
            this.scoreBoard.addGun(bot);
        }

        this.drawHandler.drawScoreboard();

        this.messageObject = new MessageObject(this.uiSubject);
        this.messageObject.scheduleMessage("Go!", 1000);

        this.mainLoop();
    }

    mainLoop(): void
    {
        window.requestAnimationFrame(() => this.mainLoop());
        if (!this.isActive) return;

        this.update();
    }

    update(): void
    {
        let sprites = this.spriteSubject.update();
        this.camera.update();
        this.drawHandler.draw(sprites);
        this.drawHandler.drawUI(this.uiSubject.update());
    }

    end(winner): void
    {
        this.messageObject.setMessage(winner.getChatColor() + winner.displayName + " <#fff>wins! <#0ff>'r'<#fff> for" +
            " restart");
        setTimeout(() => this.isActive = false, 50);
    }
}
