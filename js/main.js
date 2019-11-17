import {Game} from "./Game.js";

$(function(){
    document.fonts.load("20px Roboto").then(() => new Game().start());
});