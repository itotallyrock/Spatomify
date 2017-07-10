'use babel'

import Song from '../lib/classes/Song'
import SpotifyResource from '../lib/classes/SpotifyResource'
import AlbumResource from '../lib/classes/AlbumResource'

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

describe('Song', () => {
  let song
  beforeEach(() => {
    song = new Song(testSongs[0])
  })
  it('should have a track', () => {
    expect(song.track).toBeDefined('track is undefined')
    expect(song.hasOwnProperty('track')).toBe(true, 'doesn\'t have property track')
    expect(song.track instanceof SpotifyResource).toBe(true, 'track isn\'t a SpotifyResource')
  })
  it('should have an artist', () => {
    expect(song.artist).toBeDefined('artist is undefined')
    expect(song.hasOwnProperty('artist')).toBe(true, 'doesn\'t have property artist')
    expect(song.artist instanceof SpotifyResource).toBe(true, 'artist isn\'t a SpotifyResource')
  })
  it('should have an album', () => {
    expect(song.album).toBeDefined('album is undefined')
    expect(song.hasOwnProperty('album')).toBe(true, 'doesn\'t have property album')
    expect(song.album instanceof SpotifyResource).toBe(true, 'album isn\'t a SpotifyResource')
    expect(song.album instanceof AlbumResource).toBe(true, 'album isn\'t an AlbumResource')
  })
  it('should have a toString', () => {
    expect(song.toString).toBeDefined('toString doesn\'t exist')
    expect(typeof song.toString).toBe('function', 'toString is not a method')
    expect(typeof song.toString()).toBe('string', 'toString doesn\'t return a string')
  })
  it('should have a toURI', () => {
    expect(song.toURI).toBeDefined('toURI doesn\'t exist')
    expect(typeof song.toURI).toBe('function', 'toURI is not a method')
    expect(typeof song.toURI()).toBe('string', 'toURI doesn\'t return a string')
    expect(song.toURI().split(':').length).toBe(3, 'isn\'t a valid uri')
    expect(song.toURI().startsWith('spotify:')).toBe(true, 'isn\'t a valid uri')
    expect(song.toURI()).toNotBe('spotify:track:0000000000000000000000', 'is default uri')
  })
})

describe('DefaultSong', () => {
  let song
  beforeEach(() => {
    song = new Song()
  })
  it('should have a track', () => {
    expect(song.track).toBeDefined('track is undefined')
    expect(song.hasOwnProperty('track')).toBe(true, 'doesn\'t have property track')
    expect(song.track instanceof SpotifyResource).toBe(true, 'track isn\'t a SpotifyResource')
  })
  it('should have a toString', () => {
    expect(song.toString).toBeDefined('toString doesn\'t exist')
    expect(typeof song.toString).toBe('function', 'toString is not a method')
    expect(typeof song.toString()).toBe('string', 'toString doesn\'t return a string')
  })
  it('should have a toURI', () => {
    expect(song.toURI).toBeDefined('toURI doesn\'t exist')
    expect(typeof song.toURI).toBe('function', 'toURI is not a method')
    expect(typeof song.toURI()).toBe('string', 'toURI doesn\'t return a string')
    expect(song.toURI().split(':').length).toBe(3, 'isn\'t a valid uri')
    expect(song.toURI().startsWith('spotify:')).toBe(true, 'isn\'t a valid uri')
    expect(song.toURI()).toBe('spotify:track:0000000000000000000000', 'isn\'t default uri')
  })
})
