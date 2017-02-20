'use babel'

import { openExternal } from 'shell'
import SpatomifyView from './spatomify-view'
import SpatomifyConfig from './spatomify-config'
import { CompositeDisposable } from 'atom'
import SpotifyWebHelper from 'spotify-web-helper'
import Song from './song'
import { bugs as issues } from '../package.json'

const { notifications: Notifications, packages: Packages, commands: Commands, tooltips: Tooltips, config: Config } = atom

export default {

  spatomifyView: null,
  statusBarTile: null,
  subscriptions: null,
  spotify: new SpotifyWebHelper(),

  activate () {
    let self = this
    this.spatomifyView = new SpatomifyView()
    this.subscriptions = new CompositeDisposable()

    // Register tooltip
    this.subscriptions.add(Tooltips.add(this.spatomifyView.songTitleElement, {title: 'Tooltip'}))
    // Register commands
    this.subscriptions.add(Commands.add('atom-workspace', {
      'spatomify:toggle': () => this.toggle(),
      'spatomify:togglepause': () => this.togglePause()
    }))

    Packages.onDidActivateInitialPackages(() => {
      // TODO: Create element from view here
    })

    self.spotify.player.on('ready', () => {
      console.log('READY')
      self.handleTrackUpdate.bind(self).call(self, self.spotify.status.track)
      self.spotify.player.on('track-will-change', track => {
        self.handleTrackUpdate.bind(self).call(self, track)
      })
    })

    self.spotify.player.on('error', spotifyError => {
      // eslint-disable-next-line no-console
      console.error('Spotify Error: ', spotifyError)
      self.previousError = spotifyError
      self.spotify.player.removeAllListeners('track-will-change')
      // Handle any non critical errors then create notification if not
      if (spotifyError.message.match(/No user logged in/g)) return false
      Notifications.addError('Spotify Error', {
        detail: 'spotify-web-helper API has emitted an error.',
        stack: spotifyError.stack,
        description: 'This error is most likely a result of a loss of internet connectivity; however, if it continues to occur you may consider submitting an issue.',
        dismissable: true,
        buttons: [{
          text: 'Create Issue',
          className: 'btn-issue',
          onDidClick: function () {
            console.log('clicked', this)
            let issueUrl = issues.url
            let body = ''
            let title = ''
            openExternal(issueUrl + `?title=${encodeURI(title)}&body=${encodeURI(body)}`)
          }
        }]
      })
    })

    Config.onDidChange('spatomify.showArt', ({newValue}) => {
      this.handleTrackUpdate.bind(this).call(this, this.spotify.status.track)
      // TODO: Reimplement
      // this.spatomifyView.showAlbumArt(newValue)
    })
    Config.onDidChange('spatomify.colorize', ({newValue}) => {
      this.spatomifyView.albumArtElement.classList[newValue ? 'add' : 'remove']('colorize')
    })
  },

  consumeStatusBar (statusBar) {
    this.statusBarTitle = statusBar.addRightTile({
      item: this.spatomifyView.songTitleElement,
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
    this.spatomifyView.setSong(song)
  },

  async togglePause () {
    let failed = (pauseError) => Notifications.addWarning('Failed to Pause')
    if (this.spotify.status == null) return failed(new Error('Spotify is not available.'))
    try {
      let paused = await this.spotify.player.pause(!this.spotify.status.playing || false)
      return paused
    } catch (pauseError) {
      failed(pauseError)
      return pauseError
    }
  },

  toggle () {
    // TODO: Implement
    console.warn('Toggle is not implemented currently.')
    return 'WIP'
  },

  config: SpatomifyConfig

}
