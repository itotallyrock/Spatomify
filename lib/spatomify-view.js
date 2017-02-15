'use babel'

import {tooltips as ToolTipManager} from 'atom'

let imageDefault = 'atom://spatomify/images/default.png'
let titleDefault = 'Unknown Track'

export default class SpatomifyView {

  constructor (serializedState) {
    this.currentSong = {
      image: imageDefault,
      title: titleDefault
    }
    if (serializedState != null && serializedState.currentSong != null && serializedState.currentSong.imageUrl != null) {
      this.currentSongimage = serializedState.currentSong.imageUrl
    }
    if (serializedState != null && serializedState.currentSong != null && serializedState.currentSong.title != null) {
      this.currentSongtitle = serializedState.currentSong.title
    }
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('spatomify', 'inline-block')

    // Create albumArt element
    const albumArt = document.createElement('div')
    albumArt.style.background = 'url("' + this.currentSong.image + '") 50% 50% no-repeat'
    albumArt.classList.add('album-art')
    if (this.currentSong.image === imageDefault.trim()) albumArt.classList.add('not-found')
    this.element.appendChild(albumArt)

    // Create songTitle element
    const songTitle = document.createElement('a')
    songTitle.textContent = this.currentSong.title
    songTitle.classList.add('song-title')
    this.element.appendChild(songTitle)
  }

  updateTitle (title) {
    this.currentSong.title = (title || titleDefault).trim()
    for (let i = 0; i < this.element.children.length; i++) {
      if (this.element.children[i].classList.contains('song-title')) {
        this.element.children[i].textContent = this.currentSong.title
      }
    }
  }

  updateImage (image) {
    this.currentSong.image = (image || imageDefault).trim()
    for (let i = 0; i < this.element.children.length; i++) {
      if (this.element.children[i].classList.contains('album-art')) {
        this.element.children[i].style.background = 'url("' + this.currentSong.image + '") 50% 50% no-repeat'
        if (this.currentSong.image === imageDefault.trim()) this.element.children[i].classList.add('not-found')
        else this.element.children[i].classList.remove('not-found')
      }
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {
    return {
      currentSong: this.currentSong
    }
  }

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }

}
