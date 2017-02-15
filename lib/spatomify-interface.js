'use babel'
import request from 'request-promise-native'
import SpotifyWebHelper from 'spotify-web-helper'

const Spotify = SpotifyWebHelper()

module.exports = {
  pause (state) {
    return Spotify.player.pause(state || false)
  },

  getAllAlbumArt (albumId) {
    return new Promise((resolve, reject) => {
      request.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        json: true
      }).then((albumInfo) => {
        return resolve(albumInfo.images)
      }).catch(reject)
    })
  },

  getAlbumArt (albumId) {
    return new Promise((resolve, reject) => {
      this.getAllAlbumArt(albumId).then((images) => {
        let imageUrl = images.filter((image) => {
          // HACK for avoiding null for status bar
          return image.height >= (document.getElementsByTagName('status-bar')[0] || {clientHeight: 0}).clientHeight
        })[0].url
        resolve(imageUrl)
      }).catch(reject)
    })
  }
}
