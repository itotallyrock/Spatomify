'use babel'

import SpatomifyConfig from './spatomify-config'
import { CompositeDisposable } from 'atom'
import SpotifyWebHelper from 'spotify-web-helper'
import disposableEvent from 'disposable-event'
import Song from './song'
import SongElement from './song-element'
import StatusBarView from './status-bar-view'
import MediaController from 'node-media-controller'

const { notifications: Notifications, commands: Commands, config: Config, workspace: Workspace } = atom

export default {

  config: SpatomifyConfig,
  subscriptions: null,

  async activate (state = {}) {
    this.subscriptions = new CompositeDisposable()
    this.spotify = new SpotifyWebHelper()

    // Register commands
    this.subscriptions.add(
      Commands.add('atom-workspace', {
        'spatomify:togglepause': async () => { await this.togglePause() },
        'spatomify:skip': () => MediaController.executeCommand('skip', (err, result) => {
          if (err) return Notifications.addWarning('Failed to skip')
        }),
        'spatomify:back': () => MediaController.executeCommand('previous', (err, result) => {
          if (err) return Notifications.addWarning('Failed to go back')
        }),
        'spatomify:show': () => this.getDockElementInstance().show(),
        'spatomify:hide': () => this.getDockElementInstance().hide(),
        'spatomify:toggle': () => this.getDockElementInstance().toggle(),
        'spatomify:toggle-focus': () => this.getDockElementInstance().toggleFocus()
      }),
      // Spotify Ready
      disposableEvent(this.spotify.player, 'ready', async () => {
        await this.createOrDestroyDock()
        this.getDockElementInstance().updatePauseState(this.spotify.status.playing)
        await this.handleTrackUpdate(this.spotify.status.track)
      }),
      // Spotify Track Change
      disposableEvent(this.spotify.player, 'track-will-change', async track => {
        await this.handleTrackUpdate(track)
      }),
      // Spotify Pause
      disposableEvent(this.spotify.player, 'pause', () => {
        this.getDockElementInstance().updatePauseState(this.spotify.status.playing)
      }),
      // Spotify Unpause
      disposableEvent(this.spotify.player, 'play', () => {
        this.getDockElementInstance().updatePauseState(this.spotify.status.playing)
      })
    )

    // TODO: Make this method prettier
    this.subscriptions.add(disposableEvent(this.spotify.player, 'error', async spotifyError => {
      let self = this
      // eslint-disable-next-line no-console
      console.error('Spotify Error: ', spotifyError)
      this.spotify.player.removeAllListeners('track-will-change')
      // Ignore error now that we have handled it
      this.spotify.status.error = null

      this.deactivate()
      async function resolveError () {
        console.log('resolveError')
        self.spotify = new SpotifyWebHelper()
        if (self.shouldAttachDock()) {
          console.log('resolved')
          const activationPromise = await self.activate()
          return activationPromise
        }
        const error = await resolveError()
        return error
      }
      const error = await resolveError()
      return error
    }))

    this.subscriptions.add(Config.onDidChange('spatomify.showArt', ({newValue}) => {
      if (newValue == null || typeof newValue !== 'boolean') return
      return this.getDockElementInstance().hideAlbumArt(!newValue)
    }))
    this.subscriptions.add(Config.onDidChange('spatomify.colorize', ({newValue}) => {
      if (newValue == null) return
      return this.getDockElementInstance().colorizeAlbumArt(newValue)
    }))
  },

  statusBarEnabled () {
    return false
  },

  getStatusBarItem () {
    return null
  },

  consumeStatusBar (statusBar) {
    let statusBarItem = statusBar.addRightTile({
      item: new StatusBarView(),
      priority: 100
    })
    this.statusBarEnabled = () => true
    this.getStatusBarItem = () => statusBarItem.item
    this.subscriptions.add(disposableEvent(this.getStatusBarItem().getElement(), 'click', () => {
      this.getDockElementInstance().toggle()
    }))
  },

  getDockElementInstance (state) {
    if (this.dockElement == null) {
      let currentSong
      if (this.spotify && this.spotify.status && this.spotify.status.track) currentSong = this.spotify.status.track
      this.dockElement = new SongElement(state || currentSong)
      this.dockElement.onDidDestroy(() => { this.dockElement = null })
    }
    return this.dockElement
  },

  shouldAttachDock () {
    // Check for errors and if the application is running
    let running = Boolean(this.spotify && this.spotify.status && this.spotify.status.running)
    let online = Boolean(this.spotify && this.spotify.status && this.spotify.status.online)
    let checkForError = this.spotify.checkForError(this.spotify.status || {}) === false
    return running && online && checkForError
  },

  async createOrDestroyDock () {
    if (this.shouldAttachDock()) {
      // Attach if not already
      const dockElement = this.getDockElementInstance()
      if (!atom.workspace.paneForItem(dockElement)) {
        const showOnAttach = !atom.workspace.getActivePaneItem()
        const workspacePane = await Workspace.open(dockElement, {
          activatePane: showOnAttach,
          activateItem: showOnAttach
        })
        // Pause on album art click
        this.subscriptions.add(disposableEvent(dockElement.getAlbumArtElement(), 'click', () => {
          let command = Config.get('spatomify.clickAction') || 'spatomify:togglepause'
          Commands.dispatch(dockElement.getAlbumArtElement(), command, { bubbles: true, cancelable: true })
        }))
        return workspacePane
      }
    } else {
      if (this.dockElement) {
        const pane = atom.workspace.paneForItem(this.dockElement)
        if (pane) pane.removeItem(this.dockElement)
      }
    }
  },

  deactivate () {
    this.subscriptions.dispose()
    if (this.dockElement) this.getDockElementInstance().destroy()
    if (this.statusBarEnabled()) this.getStatusBarItem().destroy()
    this.dockElement = null
    clearInterval(this.activateInterval)
  },

  serialize () {
    return {
      previousSong: this.getDockElementInstance().song
    }
  },

  deserialize (state) {
    console.log('deserialize', state)
  },

  async handleTrackUpdate (track) {
    let song = new Song(track)
    await this.getDockElementInstance().setModel(song)
    if (this.statusBarEnabled()) await this.getStatusBarItem().setModel(song)
  },

  async togglePause () {
    if (this.spotify.status == null) return Notifications.addWarning('Failed to pause')
    try {
      return await this.spotify.player.pause(!this.spotify.status.playing || false)
    } catch (pauseError) {
      // eslint-disable-next-line no-console
      console.warn('Failed to pause', pauseError)
      return Notifications.addWarning('Failed to Pause')
    }
  }

}
