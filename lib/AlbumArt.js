'use babel'

export default class AlbumArt {
  constructor (spotifyURI) {
    this.uri = spotifyURI
    this.image = AlbumArt.getDefaultImage()
  }

  async fetch () {
    try {
      let response = await fetch('https://open.spotify.com/oembed?url=' + this.uri)
      let uriInfo = await response.json()
      console.log('uriInfo', uriInfo)
      if (uriInfo && typeof uriInfo.thumbnail_url === 'string') {
        this.image = uriInfo.thumbnail_url
        console.log('this.image', this.image)
      } else {
        throw new Error('ImageNotFound')
      }
    } catch (imageFetchError) {
      // eslint-disable-next-line no-console
      console.warn('Error Retrieving Album Art', imageFetchError)
    }
  }

  generateCSS () {
    return 'url("' + this.image + '")'
  }

  static getDefaultImage () {
    return 'atom://spatomify/images/default.svg'
  }
}
