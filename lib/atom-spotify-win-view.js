const request = require('request-promise-native')
const Spotify = require('node-spotify-webhelper').SpotifyWebHelper()

const maxVolume = 1
const minVolume = 0
const volumeSteps = 15
const volIncrement = Math.abs(maxVolume - minVolume) / volumeSteps
console.log('Volume Increment', volIncrement)

class AtomSpotifyWinStatusBarView extends HTMLElement {

  init () {
    this.classList.add('status-bar-spotify', 'inline-block')
    this.activate()
  }

  activate () {
    this.intervalId = setInterval(this.updateAll.bind(this), 100)
  }

  deactivate () {
    return clearInterval(this.intervalId)
  }

  updateAll () {
    this.updateSong()
    this.updateIcon()
  }

  updateIcon () {
    return new Promise((resolve, reject) => {
      this.getStatus().then((status) => {
        if (status.playing) {
          this.classList.add('icon-triangle-right')
        } else {
          this.classList.add('icon-primitive-square')
        }
      }).catch(reject)
    })
  }

  updateSong () {
    let self = this
    return new Promise((resolve, reject) => {
      Spotify.getTrack(track => {
        self.getAlbumArt(track.album_resource.uri.split(':')[2]).then(albumArt => {
          this.textContent = `${track.artist_resource.name} - ${track.track_resource.name}`
          resolve()
        }).catch(reject)
      })
    })
  }

  getTrack () {
    return new Promise((resolve, reject) => {
      this.getStatus().then(status => {
        resolve(status.track)
      }).catch(reject)
    })
  }

  getStatus () {
    return new Promise((resolve, reject) => {
      Spotify.getStatus((httpError, response) => {
        if (httpError) return reject(httpError)
        return resolve(response)
      })
    })
  }

  getAlbumArt (albumId) {
    return new Promise((resolve, reject) => {
      request.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        json: true
      }).then((albumInfo) => {
        return resolve(albumInfo.images)
      }).catch(reject)
    })
  }
}

module.exports = document.registerElement('status-bar-clock', {
  prototype: AtomSpotifyWinStatusBarView.prototype,
  'extends': 'div'
})
