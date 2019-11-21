import {Game} from "./Game.js";

window.onload = function(){
    (document as any).fonts.load("20px Roboto").then(() => new Game().start());
};