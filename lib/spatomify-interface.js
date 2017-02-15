'use babel'
import request from 'request-promise-native'
import spotifyWebHelper from 'node-spotify-webhelper'

const Spotify = spotifyWebHelper.SpotifyWebHelper()

module.exports = {
  pause () {
    return new Promise((resolve, reject) => {
      Spotify.pause((err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  },

  unpause () {
    return new Promise((resolve, reject) => {
      Spotify.unpause((err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  },

  getTitle () {
    let self = this
    return new Promise((resolve, reject) => {
      Spotify.getTrack(track => {
        self.getAlbumArt(track.album_resource.uri.split(':')[2]).then(albumArt => {
          resolve(this.textContent = `${track.artist_resource.name} - ${track.track_resource.name}`)
        }).catch(reject)
      })
    })
  },

  getTrack () {
    return new Promise((resolve, reject) => {
      this.getStatus().then(status => {
        resolve(status.track)
      }).catch(reject)
    })
  },

  getStatus () {
    return new Promise((resolve, reject) => {
      Spotify.getStatus((httpError, response) => {
        if (httpError) return reject(httpError)
        return resolve(response)
      })
    })
  },

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
