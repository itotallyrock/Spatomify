'use babel'

import SpatomifyView from './spatomify-view'
import SpatomifyConfig from './spatomify-config'
import SpatomifyInterface from './spatomify-interface'
import { CompositeDisposable } from 'atom'

export default {

  spatomifyView: null,
  statusBarTile: null,
  subscriptions: null,
  refreshPeriod: 2500,

  activate (state) {
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
    this.intervalId = setTimeout(this.updateTile.bind(this), 10)
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
    // this.subscriptions.dispose()
    this.spatomifyView.destroy()
    clearTimeout(this.intervalId)
    this.state = false
  },

  serialize () {
    return {
      spatomifyViewState: this.spatomifyView.serialize()
    }
  },

  pauseTrack () {
    SpatomifyInterface.pause().then((response) => {
    }).catch((pauseError) => {
      atom.notifications.addWarning('Failed to Pause', {
        detail: pauseError.stack || ''
      })
    })
  },

  unpauseTrack () {
    SpatomifyInterface.unpause((response) => {
    }).catch((pauseError) => {
      atom.notifications.addWarning('Failed to Pause', {
        detail: pauseError.stack || ''
      })
    })
  },

  togglePause () {
    let self = this
    SpatomifyInterface.getStatus().then((status) => {
      if (status.playing) self.pauseTrack()
      else self.unpauseTrack()
    }).catch(getStatusError => {
      atom.notifications.addWarning('Failed to get pause status', {
        detail: getStatusError.stack || ''
      })
    })
  },

  updateTile () {
    let self = this
    return new Promise((resolve, reject) => {
      SpatomifyInterface.getTrack().then(track => {
        SpatomifyInterface.getAlbumArt(track.album_resource.uri.split(':')[2]).then((images) => {
          let image = images.filter((image) => {
            return image.height <= 64
          })[0]
          self.spatomifyView.updateImage(image.url)
          self.intervalId = setTimeout(self.updateTile.bind(self), self.refreshPeriod)
          return resolve()
        }).catch((getAlbumArtError) => {
          atom.notifications.addWarning('Failed to get album artwork', {
            detail: getAlbumArtError.stack || 'Possibly this is due to a failed internet connection or change in the Spotify API.  If this continues to occur feel free to submit an issue.'
          })
          self.spatomifyView.updateImage()
          self.intervalId = setTimeout(self.updateTile.bind(self), self.refreshPeriod * 10) // On error only refresh 10 times refresh rate
          return resolve()
        })

        let title = track.artist_resource.name + ' - ' + track.track_resource.name
        self.spatomifyView.updateTitle(title)
        let tooltips = atom.tooltips.findTooltips(this.spatomifyView.getElement())
        tooltips.forEach((tooltip) => {
          tooltip.options.title = title
        })
      }).catch((getTrackError) => {
        atom.notifications.addWarning('Failed to get track', {
          detail: getTrackError.stack || 'Possibly this is due to a failed internet connection or change in the Spotify API.  If this continues to occur feel free to submit an issue.'
        })
        self.spatomifyView.updateTitle()
        self.spatomifyView.updateImage()
        self.intervalId = setTimeout(self.updateTile.bind(self), self.refreshPeriod * 10) // On error only refresh 10 times refresh rate
        return resolve()
      })
    })
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
