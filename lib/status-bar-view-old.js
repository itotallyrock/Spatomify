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
    const songTitleWrapper = document.createElement('div')
    songTitleWrapper.classList.add('spatomify', 'song-title-wrapper', 'inline-block')

    const songTitle = document.createElement('a')
    songTitle.classList.add('song-title', 'inline-block')
    songTitle.onclick = () => {
      let command = Config.get('spatomify.clickAction') || 'spatomify:togglepause'
      Commands.dispatch(songTitle, command, { bubbles: true, cancelable: true })
    }
    songTitleWrapper.appendChild(songTitle)

    this.songTitleElement = songTitle
    this.songTitleWrapperElement = songTitleWrapper
  }

  async setSong (song) {
    // NOTE: We may want to only get song image if the setting is enabled
    await song.artwork.fetch()
    let image = await song.artwork.generateCSS()
    let title = song.toString()

    // Update Title
    this.songTitleElement.textContent = title
    Tooltips.findTooltips(this.songTitleElement).forEach((tooltip) => {
      tooltip.options.title = title
    })

    // Update Image
    this.albumArtElement.style.background = image

    // Update current song
    this.song = song
  }

  hideAlbumArt (state) {
    this.albumArtElement.classList[state ? 'add' : 'remove']('hide')
  }

  colorize (state) {
    this.spatomifyView.albumArtElement.classList[state ? 'add' : 'remove']('colorize')
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {
    console.log('serialize', {song: this.song})
    return {
      song: this.song
    }
  }

  // Tear down any state and detach
  destroy () {
    this.albumArtElement.remove()
    this.songTitleElement.remove()
    this.songTitleWrapperElement.remove()
  }
}
