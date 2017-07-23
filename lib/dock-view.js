'use babel'
import disposableEvent from 'disposable-event'
import Song from './classes/Song'
import { CompositeDisposable, Emitter } from 'atom'

const { config: Config, notifications: NotificationManager } = atom

const SPATOMIFY_URI = 'atom://spatomify'

export default class DockView {
  constructor (previousSong) {
    this.song = previousSong
      ? previousSong instanceof Song
        ? previousSong
        : new Song(previousSong)
      : new Song({})
    this.emitter = new Emitter()
    this.disposables = new CompositeDisposable()

    this.container = document.createElement('spatomify')
    this.details = document.createElement('song-details')
    this.title = document.createElement('song-title')
    this.artist = document.createElement('song-artist')
    this.albumArt = document.createElement('song-artwork')
    // NOTE: For album we may want to display a loading icon since the css would definitly load faster than the image and at least give a hint rather than a blank space

    this.container.appendChild(this.albumArt)
    this.details.appendChild(this.title)
    this.details.appendChild(this.artist)
    this.container.appendChild(this.details)

    this.updateView()

    this.container.setAttribute('track-uri', this.song.track.uri)
    this.colorizeAlbumArt(Config.get('spatomify.colorize'))

    this.disposables.add(disposableEvent(this.albumArt, 'click', (event) => {
      this.emitter.emit('click', event)
    }))
  }

  async setModel (song) {
    this.song = song || new Song()
    await this.updateView()
  }

  async updateView () {
    this.getElement().setAttribute('track-uri', this.song.track.uri)
    this.updateTitle()
    this.updateArtist()
    await this.updateArtwork()
  }

  async updateArtwork () {
    try {
      let artwork = await this.song.fetchArtwork()
      this.getAlbumArtElement().setAttribute('style', 'background-image: ' + artwork.generateCSS())
    } catch (albumArtFetchError) {
      NotificationManager.addWarning('Failed to fetch artwork', {
        description: albumArtFetchError.message
      })
      this.getAlbumArtElement().setAttribute('style', 'background-image: ' + this.song.album.artwork.generateCSS())
    }
  }

  updateTitle () {
    this.getTitleElement().innerText = this.song.track.toString()
  }

  updateArtist () {
    this.getArtistElement().innerText = this.song.artist.toString()
  }

  updatePauseState (paused) {
    this.getElement().classList.toggle('paused', paused)
  }

  hideAlbumArt (state) {
    state = state == null ? true : state
    this.getAlbumArtElement().classList[state ? 'add' : 'remove']('hide')
  }

  colorizeAlbumArt (state) {
    state = state == null ? false : state
    this.getAlbumArtElement().classList[state ? 'add' : 'remove']('colorize')
  }

  // The following methods are required or assist in the creation of the docking pane
  destroy () {
    this.getElement().remove()
    this.emitter.emit('destroyed')
    this.disposables.dispose()
  }

  onDidDestroy (callback) {
    return this.emitter.on('destroyed', callback)
  }

  getElement () {
    return this.container
  }

  getAlbumArtElement () {
    return this.getElement().querySelector('song-artwork')
  }

  getArtistElement () {
    return this.getElement().querySelector('song-artist')
  }

  getTitleElement () {
    return this.getElement().querySelector('song-title')
  }

  getTitle () {
    return 'Spatomify'
  }

  getURI () {
    return SPATOMIFY_URI
  }

  getLongTitle () {
    return this.song.toString()
  }

  isPermanentDockItem () {
    return false
  }

  getDefaultLocation () {
    return 'right'
  }

  getPreferredLocation () {
    return atom.config.get('tree-view.showOnRightSide') ? 'right' : 'left'
  }

  getPreferredWidth () {
    return 300
  }

  getAllowedLocations () {
    return [
      'left',
      'right'
    ]
  }

  toggle () {
    return atom.workspace.toggle(this)
  }

  async show (options) {
    try {
      // NOTE: Potentially add option of `split: 'down'` to force it to split down, but this loses location persistance
      let textEditor = await atom.workspace.open(this, { searchAllPanes: true })
      if (options != null && options.focus !== false) return this.focus()
      return textEditor
    } catch (error) {
      return error
    }
  }

  hide () {
    return atom.workspace.hide(this)
  }

  focus () {
    return this.getElement().focus()
  }

  unfocus () {
    return atom.workspace.getCenter().activate()
  }

  hasFocus () {
    return document.activeElement === this.getElement()
  }

  async toggleFocus () {
    if (this.hasFocus) return this.unfocus()
    const showPromise = await this.show()
    return showPromise
  }
}
