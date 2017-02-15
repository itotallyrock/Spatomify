'use babel'

import SpatomifyView from './spatomify-view'
import SpatomifyConfig from './spatomify-config'
import SpatomifyInterface from './spatomify-interface'
import { CompositeDisposable } from 'atom'
import SpotifyWebHelper from 'spotify-web-helper'

const spotify = SpotifyWebHelper()

export default {

  spatomifyView: null,
  statusBarTile: null,
  subscriptions: null,
  refreshPeriod: 2500,

  activate (state) {
    let self = this
    this.spatomifyView = new SpatomifyView(state.spatomifyViewState)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.tooltips.add(this.spatomifyView.getElement(), {title: 'Tooltip'}))

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spatomify:toggle': () => this.toggle(),
      'spatomify:pause': () => this.pauseTrack(),
      'spatomify:unpause': () => this.unpauseTrack(),
      'spatomify:togglepause': () => this.togglePause()
    }))

    spotify.player.on('error', spotifyError => {
      // TODO: Handle this with hibernate and wake potentially
      // eslint-disable-next-line no-console
      console.error('Spotify Error: ', spotifyError)
    })

    spotify.player.on('ready', () => {
      self.handleTrackUpdate.bind(self).call(self, spotify.status.track)
      spotify.player.on('track-will-change', track => {
        self.handleTrackUpdate.bind(self).call(self, track)
      })
    })
    this.state = true
  },

  consumeStatusBar (statusBar) {
    this.statusBarTile = statusBar.addRightTile({
      item: this.spatomifyView.getElement(),
      priority: 250
    })
  },

  deactivate (state) {
    this.statusBarTile.destroy != null
      ? this.statusBarTile.destroy()
      : this.statusBarTile = null
    this.subscriptions.dispose()
    this.spatomifyView.destroy()
    this.state = false
  },

  hibernate () {
    // TODO: Hide thing and only listen for events pertaining to the starting of Spotify
  },

  wake () {
    // TODO: Essentially reactivate the package when Spotify starts up
  },

  serialize () {
    return {
      spatomifyViewState: this.spatomifyView.serialize()
    }
  },

  handleTrackUpdate (track) {
    let self = this
    let title = this.formatTitle(track)
    let albumId = track.album_resource.uri.split(':')[2]

    this.spatomifyView.updateTitle(title)
    SpatomifyInterface.getAlbumArt(albumId).then(albumArt => {
      self.spatomifyView.updateImage(albumArt)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.warn('Error Retrieving Album Art', error)
      self.spatomifyView.updateImage()
    })
  },

  pauseTrack () {
    SpatomifyInterface.pause().catch((pauseError) => {
      atom.notifications.addWarning('Failed to Pause', {
        detail: pauseError.stack || ''
      })
    })
  },

  unpauseTrack () {
    SpatomifyInterface.pause(true).catch((pauseError) => {
      atom.notifications.addWarning('Failed to Pause', {
        detail: pauseError.stack || ''
      })
    })
  },

  togglePause () {
    let paused = !spotify.status.playing
    SpatomifyInterface.pause(paused).catch((pauseError) => {
      atom.notifications.addWarning('Failed to Pause', {
        detail: pauseError.stack || ''
      })
    })
  },

  formatTitle (track) {
    if (track == null) {
      return this.spatomifyView.titleDefault.trim()
    }
    return track.artist_resource.name.trim() + ' - ' + track.track_resource.name.trim()
  },

  toggle () {
    return (
      this.state == null || !this.state
      ? this.activate(this.state)
      : this.deactivate(this.state)
    )
  },

  config: SpatomifyConfig

}
