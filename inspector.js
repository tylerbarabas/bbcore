import DomElement from './dom-element';

export default class Inspector extends DomElement {
    constructor(sequence) {
        if (typeof sequence === 'undefined') {
            throw "Pass sequence in to inspector!";
        }
        super();
        this.sequence = sequence;
        this.dom.id = 'inspector';
        this.dom.innerText = "0";
        this.style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '30px',
            backgroundColor: 'pink',
            zIndex: 9999
        });
        this.onClick = this.onClick.bind(this);
        this.addEvent('click', this.onClick);
        this.appendTo(document.body);
    }

    updateTime(time){
        this.dom.innerText = time;
    }

    onClick(){
        if (window.AP.playing) {
            this.sequence.pause();
        } else {
            this.sequence.play();
        }
    }
}
