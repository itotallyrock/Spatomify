'use babel'

export default class SpatomifyView {

  constructor (serializedState) {
    this.imageDefault = 'atom://spatomify/images/default.png'
    this.titleDefault = 'Unknown Track'
    this.currentSong = {
      image: this.imageDefault,
      title: this.titleDefault
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
    if (this.currentSong.image === this.imageDefault.trim()) albumArt.classList.add('not-found')
    this.element.appendChild(albumArt)

    // Create songTitle element
    const songTitle = document.createElement('a')
    songTitle.textContent = this.currentSong.title
    songTitle.classList.add('song-title')
    this.element.appendChild(songTitle)
  }

  updateTitle (title) {
    let self = this
    this.currentSong.title = (title || this.titleDefault).trim()
    for (let i = 0; i < this.element.children.length; i++) {
      if (this.element.children[i].classList.contains('song-title')) {
        this.element.children[i].textContent = this.currentSong.title
      }
    }
    let tooltips = atom.tooltips.findTooltips(self.getElement())
    tooltips.forEach((tooltip) => {
      tooltip.options.title = this.currentSong.title
    })
  }

  updateImage (imageUrl) {
    let element = document.getElementsByClassName('album-art')[0]
    if (element == null) return
    this.currentSong.image = (imageUrl || this.imageDefault).trim()
    element.style.background = 'url("' + this.currentSong.image + '") 50% 50% no-repeat'
    if (this.currentSong.image === this.imageDefault.trim()) {
      element.classList.add('not-found')
    } else {
      element.classList.remove('not-found')
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
