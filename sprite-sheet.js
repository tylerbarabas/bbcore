import 'latest-createjs';
import DomElement from './dom-element';
const createjs = window.createjs;

export default class SpriteSheet extends DomElement {
    constructor(){
        super();
        this.dom = document.createElement('canvas');
        this.json = null;
    }

    init(){
        if (typeof this.json !== 'object') {
            console.error('Cannot init sprite sheet. No JSON present.');
            return;
        }

        this.spritesheet = new createjs.SpriteSheet(this.json);
        this.stage = new createjs.Stage(this.dom);

        this.dom.height = this.json.frames.height || this.json.frames[0][3];
        this.dom.width = this.json.frames.width || this.json.frames[0][2];

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', this.stage);

        this.appendTo();
    }

    changeSprite(seq){
        if (typeof seq != 'string') return;
        if (this.currentAnim == seq) return;

        if (this.stage !== null) this.stage.removeChild(this.animation);

        this.currentAnim = seq;
        this.animation = new createjs.Sprite(this.spritesheet, this.currentAnim);

        this.stage.addChild(this.animation);
    }
}
