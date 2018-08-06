import DomElement from './dom-element';
import Stage from './stage';

export default class MasterController extends DomElement {
    constructor(seq) {
        super();
        if (!Array.isArray(seq)){
            throw 'Master controller needs an array of song sequences';
        }

        this.stage = new Stage();

        window.masterController = this;

        this.sequences = seq;

        this.init();
    }

    init(){
        this.currentSequence = 0;
        this.addEvent('next', this.next.bind(this));
        new this.sequences[this.currentSequence]();
    }

    next(){
        if (typeof this.sequences[this.currentSequence + 1] === 'undefined') {
            throw 'Cannot find next song sequence.';
        }
        this.currentSequence += 1;
        this.stage.clear();
        new this.sequences[this.currentSequence];
    }
}
