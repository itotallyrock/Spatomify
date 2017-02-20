'use babel'

import request from 'request-promise-native'
import pluralize from 'pluralize'

export default class AlbumArt {
  constructor (spotifyURI) {
    this.uri = spotifyURI
    this.image = 'Please call fetch before retrieving the image url'
  }

  async fetch () {
    let self = this
    let [ service, type, rawUri ] = this.uri.split(':')
    let handleError = function (error) {
      // Happens usually when song doesn't have art or listening to local or offline music
      // eslint-disable-next-line no-console
      console.warn('Error Retrieving Album Art:', error)
      self.image = {
        height: 64,
        width: 64,
        url: 'atom://spatomify/images/default.png'
      }
    }
    try {
      let uriInfo = await request.get('https://api.' + service + '.com/v1/' + pluralize(type) + '/' + rawUri, {
        json: true
      })
      console.log('uriInfo', uriInfo)
      if (uriInfo.images[0] == null) throw new Error('ImageNotFound')
      self.image = uriInfo.images[0]
      return self
    } catch (requestError) {
      handleError(requestError)
      return self
    }
  }

  generateCSS () {
    return 'url("' + this.image.url + '") 50% 50% no-repeat'
  }
}
