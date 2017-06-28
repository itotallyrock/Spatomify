'use babel'
import disposableEvent from 'disposable-event'
import Song from './Song'
import { CompositeDisposable, Emitter } from 'atom'

const { tooltips: Tooltip } = atom
const SPATOMIFY_URI = 'atom://spatomify/status-bar'

export default class SongElement {
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

    this.details.appendChild(this.artist)
    this.details.appendChild(this.title)
    this.container.appendChild(this.details)

    this.updateView()

    this.container.setAttribute('track-uri', this.song.track.uri)
    this.container.classList.add('inline-block')

    this.disposables.add(Tooltip.add(this.getElement(), {
      title: this.getLongTitle(),
      keyBindingCommand: 'spatomify:toggle',
      keyBindingTarget: this.getElement()
    }))
    this.disposables.add(disposableEvent(this.container, 'click', () => {
      this.emitter.emit('click')
    }))
  }

  setModel (song) {
    this.song = song || new Song({})
    this.updateView()
    this.updateTooltip()
  }

  updateTooltip () {
    Tooltip.findTooltips(this.getElement()).forEach(tooltip => { tooltip.options.title = this.getLongTitle() })
  }

  updateView () {
    this.container.setAttribute('track-uri', this.song.track.uri)
    this.updateTitle()
    this.updateArtist()
  }

  updateTitle () {
    this.container.querySelector('song-title').innerText = this.song.track.name
  }

  updateArtist () {
    this.container.querySelector('song-artist').innerText = this.song.artist.name
  }

  updatePauseState (paused) {
    this.container.classList.toggle('paused', paused)
  }

  // The following methods are required or assist in the creation of the docking pane
  destroy () {
    this.container.remove()
    this.emitter.emit('destroyed')
    this.disposables.dispose()
  }

  onDidDestroy (callback) {
    return this.emitter.on('destroyed', callback)
  }

  onClick (callback) {
    return this.emitter.on('click', callback)
  }

  getElement () {
    return this.container
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
