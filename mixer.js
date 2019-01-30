import DomElement from './dom-element'
import AudioPlayer from './audio-player'

export default class Mixer extends DomElement {
  constructor(){
    super()
    this.loaded = false
    this.playing = false
    this.tracks = []
    this.dom = null
  }

  createTrack(){
    this.tracks.push(new AudioPlayer())
    console.log(this.tracks)
  }
}
