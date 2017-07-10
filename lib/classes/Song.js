'use babel'

import SpotifyResource from './SpotifyResource'
import AlbumResource from './AlbumResource'

export default class Song {
  constructor (track = {}, album = {}, artist = {}) {
    if (track.album_resource != null && track.track_resource != null && track.artist_resource != null && album.name == null && artist.name == null) {
      album = track.album_resource
      artist = track.artist_resource
      track = track.track_resource
    }
    this.track = new SpotifyResource(track.name, track.uri, track.location)
    this.album = new AlbumResource(album.name, album.uri, album.location)
    this.artist = new SpotifyResource(artist.name, artist.uri, artist.location)
  }

  toString () {
    return this.artist + ' - ' + this.track
  }

  toURI () {
    return this.track.toURI()
  }
}
