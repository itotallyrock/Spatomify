'use babel'

import SpatomifyView from './spatomify-view'
import SpatomifyConfig from './spatomify-config'
import { CompositeDisposable } from 'atom'
import SpotifyWebHelper from 'spotify-web-helper'
import Song from './song'

const { notifications: Notifications, commands: Commands, tooltips: Tooltips, config: Config } = atom

export default {

  config: SpatomifyConfig,
  spatomifyView: new SpatomifyView(),
  statusBarTile: null,
  subscriptions: new CompositeDisposable(),
  SpotifyWebHelper: SpotifyWebHelper,
  spotify: new SpotifyWebHelper(),

  activate () {
    // Register commands
    this.subscriptions.add(Commands.add('atom-workspace', {
      'spatomify:toggle': () => this.toggle(),
      'spatomify:togglepause': async () => await this.togglePause()
    }))

    // Register tooltip
    this.subscriptions.add(Tooltips.add(this.spatomifyView.songTitleElement, {title: 'Tooltip'}))
    // Added spotify event emitter to subscriptions
    // TODO: Add spotify player to subscriptions or at least remove the listeners on disable/
    // this.subscriptions.add(this.spotify.player)

    this.spotify.player.on('ready', async () => {
      await this.handleTrackUpdate(this.spotify.status.track)
      this.spotify.player.on('track-will-change', async track => {
        await this.handleTrackUpdate(track)
      })
    })

    this.spotify.player.on('error', spotifyError => {
      // eslint-disable-next-line no-console
      console.error('Spotify Error: ', spotifyError)
      this.previousError = spotifyError
      this.spotify.player.removeAllListeners('track-will-change')
      // TODO: Handle the error and only close if not handled
      return this.deactivate()
    })

    Config.onDidChange('spatomify.showArt', ({newValue}) => {
      if (newValue == null) return
      return this.spatomifyView.hideAlbumArt(!newValue)
    })
    Config.onDidChange('spatomify.colorize', ({newValue}) => {
      if (newValue == null) return
      return this.spatomifyView.colorize(newValue)
    })
  },

  consumeStatusBar (statusBar) {
    this.statusBarTitle = statusBar.addRightTile({
      item: this.spatomifyView.songTitleWrapperElement,
      priority: 250
    })
    this.statusBarAlbumArt = statusBar.addRightTile({
      item: this.spatomifyView.albumArtElement,
      priority: 251
    })
  },

  deactivate () {
    this.subscriptions.dispose()
    this.spatomifyView.destroy()
  },

  serialize () {
    return {
      spatomifyViewState: this.spatomifyView.serialize()
    }
  },

  async handleTrackUpdate (track) {
    let song = new Song(track)
    await this.spatomifyView.setSong(song)
  },

  async togglePause () {
    if (this.spotify.status == null) return Notifications.addWarning('Failed to Pause')
    try {
      return await this.spotify.player.pause(!this.spotify.status.playing || false)
    } catch (pauseError) {
      return Notifications.addWarning('Failed to Pause')
    }
  },

  // TODO: Implement
  toggle () {
    // eslint-disable-next-line no-console
    console.warn('Toggle is not implemented currently.')
    return new Error('Currently Work in Progress')
  }

}
