'use babel'

import AlbumArt from './AlbumArt'

export default class Song {
  constructor (track) {
    function unknown (type) {
      return {
        name: 'Unknown ' + type,
        uri: 'spotify:' + type + ':0000000000000000000000',
        location: {
          og: 'https://open.spotify.com/' + type.toLowerCase() + '/0000000000000000000000'
        }
      }
    }
    this.album = track.album_resource || unknown('Album')
    this.artist = track.artist_resource || unknown('Artist')
    this.track = track.track_resource || unknown('Track')
    this.trackType = track.track_type || 'undefined'
    this.length = track.length
    this.artwork = new AlbumArt(this.album.uri)
  }

  toString () {
    return `${this.artist.name} - ${this.track.name}`
  }
}
