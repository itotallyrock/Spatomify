'use babel'

import SpotifyResource from '../lib/classes/SpotifyResource'
import AlbumResource from '../lib/classes/AlbumResource'
import Artwork from '../lib/classes/Artwork'

let testSongs = [
  {
    track_resource: {
      name: 'Whispering Wind',
      uri: 'spotify:track:1OjoBaxYvPKtzuirCbts3x',
      location: {}
    },
    artist_resource: {
      name: 'Moby',
      uri: 'spotify:artist:3OsRAKCvk37zwYcnzRf5XF',
      location: {}
    },
    album_resource: {
      name: 'Play & Play: B Sides',
      uri: 'spotify:album:3wRlU7n3LULfjL0e9RtB5Q',
      location: {}
    },
    length: 362,
    track_type: 'normal'
  }
]

// Async Wrapper for 1.3 to 2.0 by yyx990803
function asyncWrapper (run) {
  return function () {
    var done = false
    waitsFor(function () { return done })
    run(function () { done = true })
  }
}

describe('AlbumResource', () => {
  let albumResource
  beforeEach(() => {
    albumResource = new AlbumResource(testSongs[0].album_resource.name, testSongs[0].album_resource.uri, testSongs[0].album_resource.location)
  })
  it('should be instance of SpotifyResource', () => {
    expect(albumResource instanceof SpotifyResource).toBe(true, 'isn\'t instance of Spotify Resource')
  })
  it('should have artwork', () => {
    expect(albumResource.artwork).toBeDefined('artwork is undefined')
    expect(albumResource.artwork instanceof Artwork).toBe(true, 'artwork isn\'t instance of Artwork')
  })
  it('should have a fetchArtwork', () => {
    expect(albumResource.fetchArtwork).toBeDefined('fetchArtwork is not defined')
    expect(typeof albumResource.fetchArtwork).toBe('function', 'fetchArtwork isn\'t a function')
    expect(albumResource.fetchArtwork() instanceof Promise).toBe(true, 'doesn\'t return a promise')
  })
  it('should fetch artwork', asyncWrapper((done) => {
    albumResource.fetchArtwork().then(() => {
      expect(albumResource.artwork).toBeDefined('artwork is undefined after fetch')
      expect(albumResource.artwork.src).toNotBe('atom://spatomify/images/default.svg')
      done()
    }).catch(() => {
      expect('image').toBe('fetched', 'failed to fetch image')
      done()
    })
  }))
})
