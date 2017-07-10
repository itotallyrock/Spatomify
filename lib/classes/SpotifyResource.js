'use babel'

export default class SpotifyResource {
  constructor (name, uri, location) {
    if (arguments.length === 1) {
      uri = name.uri
      location = name.location
      name = name.name
    }
    let type = typeof uri === 'string' ? uri.split(':')[1] : undefined || 'track'
    this.name = name || 'Unknown ' + type
    this.uri = uri || 'spotify:' + type + ':0000000000000000000000'
    this.location = location || {
      og: 'https://open.spotify.com/' + type.toLowerCase() + '/0000000000000000000000'
    }
  }

  toString () {
    return this.name
  }

  toURI () {
    return this.uri
  }
}
