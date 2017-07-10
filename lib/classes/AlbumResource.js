'use babel'

import SpotifyResource from './SpotifyResource'
import Artwork from './Artwork'

export default class AlbumResource extends SpotifyResource {
  constructor (name, uri, location) {
    super(name, uri, location)
    this.artwork = new Artwork()
  }

  async fetchArtwork () {
    let response = await fetch('https://open.spotify.com/oembed?url=' + this.uri)
    // Throw status text error if request is unsuccessful
    if (response.status >= 400) throw new Error('Request Error: ' + response.statusText)
    let {
      thumbnail_url: thumbnailUrl,
      thumbnail_width: thumbnailWidth,
      thumbnail_height: thumbnailHeight
    } = await response.json()

    this.artwork = new Artwork(thumbnailUrl, thumbnailWidth, thumbnailHeight)
  }
}
