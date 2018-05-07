import DomElement from './dom-element';

window.AudioContext = window.AudioContext||window.webkitAudioContext;

export default class AudioPlayer extends DomElement {

    constructor(){
        if (typeof window.AP !== 'undefined') {
            throw 'Cannot instantiate another Audio Player.';
        }
        super();
        this.loaded = false;
        this.playing = false;
        this.currentAudio = {
            path: null,
            title: null
        };
        this.dom = null;
        window.AP = this;
    }

    init() {
        this.dom = document.createElement('AUDIO');
        this.dom.id = 'audio-player';
        document.body.appendChild(this.dom);
    }

    loadFile(audioPath){
        this.currentAudio.path = audioPath;
        this.dom.addEventListener( 'loadeddata', this.onFileLoad.bind(this) );
        this.dom.src = audioPath;
    }

    onFileLoad(){
        this.loaded = true;
        this.dispatchEvent( 'song-loaded' );
    }

    play(){
        if (!this.loaded || this.playing) return;
        this.playing = true;
        this.dom.play();
    }

    pause(){
        this.playing = false;
        this.dom.pause();
    }

    stop(){
        this.playing = false;
        this.pause();
        this.setPosition(0);
    }

    getPosition(){
        return this.dom.currentTime;
    }

    setPosition(pos){
        this.dom.currentTime = pos;
    }
}
