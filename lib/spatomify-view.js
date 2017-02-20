'use babel'

const { commands: Commands, tooltips: Tooltips, config: Config } = atom

export default class SpatomifyView {

  constructor () {
    // Create albumArt element
    const albumArt = document.createElement('div')
    albumArt.classList.add('spatomify', 'album-art', 'inline-block')
    if (Config.get('spatomify.colorize') === true) albumArt.classList.add('colorize')
    // TODO: Show and hide of album art based on config
    this.albumArtElement = albumArt

    // Create songTitle element
    const songTitle = document.createElement('a')
    songTitle.classList.add('spatomify', 'song-title', 'inline-block')
    songTitle.onclick = () => {
      let command = Config.get('spatomify.clickAction') || 'spatomify:togglepause'
      Commands.dispatch(songTitle, command, { bubbles: true, cancelable: true })
    }
    this.songTitleElement = songTitle
  }

  async setSong (song) {
    let image = await song.getImage()
    let title = song.toString()

    // Update Title
    this.songTitleElement.textContent = title
    Tooltips.findTooltips(this.songTitleElement).forEach((tooltip) => {
      tooltip.options.title = title
    })

    // Update Image
    this.albumArtElement.style.background = image

    // Animate Progress bar
    this.progressBarElement.style.animate = 'songProgress ' + song.length + 's linear'

    // Update current song
    this.song = song
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {
    return {
      song: this.song
    }
  }

  // Tear down any state and detach
  destroy () {
    this.albumArtElement.remove()
    this.songTitleElement.remove()
  }

}
