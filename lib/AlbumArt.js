'use babel'

export default class AlbumArt {
  constructor (spotifyURI) {
    this.uri = spotifyURI
    this.image = {
      height: 64,
      width: 64,
      url: 'atom://spatomify/images/default.png'
    }
  }

  async fetch () {
    let [ service, type, rawUri ] = encodeURI(this.uri).split(':')
    try {
      let response = await fetch('https://api.' + service.toLowerCase() + '.com/v1/' + type.toLowerCase() + 's/' + rawUri)
      let uriInfo = await response.json()

      if (uriInfo.images[0] == null) {
        throw new Error('ImageNotFound')
      }
      self.image = uriInfo.images[0]
    } catch (imageFetchError) {
      // eslint-disable-next-line no-console
      console.warn('Error Retrieving Album Art', imageFetchError)
    }
    return this
  }

  generateCSS () {
    return 'url("' + this.image.url + '") 50% 50% no-repeat'
  }
}
