'use babel'

export default class SpatomifyView {

  constructor (serializedState) {
    this.imageDefault = 'atom://spatomify/images/default.png'
    this.titleDefault = 'Unknown Track'
    this.currentSong = {
      image: this.imageDefault,
      title: this.titleDefault
    }
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('spatomify', 'inline-block')
    this.deserialize(serializedState)

    // Create albumArt element
    const albumArt = document.createElement('div')
    albumArt.style.background = 'url("' + this.currentSong.image + '") 50% 50% no-repeat'
    albumArt.classList.add('album-art')
    if (this.currentSong.image === this.imageDefault.trim()) albumArt.classList.add('not-found')
    this.showAlbumArt(atom.config.get('spatomify.showArt'), albumArt)
    this.element.appendChild(albumArt)

    // Create songTitle element
    const songTitle = document.createElement('a')
    songTitle.textContent = this.currentSong.title
    songTitle.classList.add('song-title')
    this.element.appendChild(songTitle)
  }

  // Changes the text of the title element
  updateTitle (title) {
    let self = this
    let element = document.getElementsByClassName('song-title')[0]
    let tooltips = atom.tooltips.findTooltips(self.getElement())
    this.currentSong.title = (title || this.titleDefault).trim()

    if (element == null) return
    element.textContent = this.currentSong.title
    tooltips.forEach((tooltip) => {
      tooltip.options.title = this.currentSong.title
    })
  }

  // Changes the image URL of the albumArt element
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

  // Toggles showing the albumArt element
  showAlbumArt (status, element) {
    element = element || document.getElementsByClassName('album-art')[0]
    if (element == null) return
    element.style.display = (status === true ? 'inline-block' : 'none')
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {
    return {
      currentSong: this.currentSong
    }
  }

  deserialize (serializedState) {
    if (serializedState != null && serializedState.currentSong != null && serializedState.currentSong.imageUrl != null) {
      this.currentSong.image = serializedState.currentSong.imageUrl
    }
    if (serializedState != null && serializedState.currentSong != null && serializedState.currentSong.title != null) {
      this.currentSong.title = serializedState.currentSong.title
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
