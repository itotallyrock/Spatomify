'use babel'

import SpotifyResource from '../lib/classes/SpotifyResource'

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

describe('SpotifyResource', () => {
  let trackResource
  beforeEach(() => {
    trackResource = new SpotifyResource(testSongs[0].track_resource.name, testSongs[0].track_resource.uri, testSongs[0].track_resource.location)
  })
  it('should have a name', () => {
    expect(trackResource.name).toBeDefined('name is not defined')
    expect(typeof trackResource.name).toBe('string', 'name isn\'t a string')
    expect(trackResource.name).toBe(testSongs[0].track_resource.name, 'name doesn\'t match')
  })
  it('should have a uri', () => {
    expect(trackResource.uri).toBeDefined('uri is not defined')
    expect(typeof trackResource.uri).toBe('string', 'uri isn\'t a string')
    expect(trackResource.uri).toBe(testSongs[0].track_resource.uri, 'uri doesn\'t match')
    expect(trackResource.uri.startsWith('spotify:track:')).toBe(true, 'isn\'t a valid uri')
    expect(trackResource.uri).toMatch(/^(spotify):(track|artist|album):([A-z0-9]+$)/g, 'isn\'t a valid uri')
  })
  it('should have a toString', () => {
    expect(trackResource.toString).toBeDefined('doesn\'t have toString property')
    expect(typeof trackResource.toString).toBe('function', 'toString isn\'t a function')
    expect(typeof trackResource.toString()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toString()).toBe(trackResource.name, 'toString doesn\'t return name property')
  })
  it('should have a toURI', () => {
    expect(trackResource.toURI).toBeDefined('doesn\'t have toURI property')
    expect(typeof trackResource.toURI).toBe('function', 'toURI isn\'t a function')
    expect(typeof trackResource.toURI()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toURI()).toBe(trackResource.uri, 'toURI doesn\'t return uri property')
  })
})

describe('Simple SpotifyResource', () => {
  let trackResource
  beforeEach(() => {
    trackResource = new SpotifyResource(testSongs[0].track_resource)
  })
  it('should have a name', () => {
    expect(trackResource.name).toBeDefined('name is not defined')
    expect(typeof trackResource.name).toBe('string', 'name isn\'t a string')
    expect(trackResource.name).toBe(testSongs[0].track_resource.name, 'name doesn\'t match')
  })
  it('should have a uri', () => {
    expect(trackResource.uri).toBeDefined('uri is not defined')
    expect(typeof trackResource.uri).toBe('string', 'uri isn\'t a string')
    expect(trackResource.uri).toBe(testSongs[0].track_resource.uri, 'uri doesn\'t match')
    expect(trackResource.uri.startsWith('spotify:track:')).toBe(true, 'isn\'t a valid uri')
    expect(trackResource.uri).toMatch(/^(spotify):(track|artist|album):([A-z0-9]+$)/g, 'isn\'t a valid uri')
  })
  it('should have a toString', () => {
    expect(trackResource.toString).toBeDefined('doesn\'t have toString property')
    expect(typeof trackResource.toString).toBe('function', 'toString isn\'t a function')
    expect(typeof trackResource.toString()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toString()).toBe(trackResource.name, 'toString doesn\'t return name property')
  })
  it('should have a toURI', () => {
    expect(trackResource.toURI).toBeDefined('doesn\'t have toURI property')
    expect(typeof trackResource.toURI).toBe('function', 'toURI isn\'t a function')
    expect(typeof trackResource.toURI()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toURI()).toBe(trackResource.uri, 'toURI doesn\'t return uri property')
  })
})

describe('Default SpotifyResource', () => {
  let trackResource
  beforeEach(() => {
    trackResource = new SpotifyResource()
  })
  it('should have a name', () => {
    expect(trackResource.name).toBeDefined('name is not defined')
    expect(typeof trackResource.name).toBe('string', 'name isn\'t a string')
    expect(trackResource.name.startsWith('Unknown')).toBe(true, 'name isn\'t unknown')
  })
  it('should have a uri', () => {
    expect(trackResource.uri).toBeDefined('uri is not defined')
    expect(typeof trackResource.uri).toBe('string', 'uri isn\'t a string')
    expect(trackResource.uri.startsWith('spotify:track:0000000000000000000000')).toBe(true, 'isn\'t a valid uri')
    expect(trackResource.uri).toMatch(/^(spotify):(track|artist|album):([A-z0-9]+$)/g, 'isn\'t a valid uri')
  })
  it('should have a toString', () => {
    expect(trackResource.toString).toBeDefined('doesn\'t have toString property')
    expect(typeof trackResource.toString).toBe('function', 'toString isn\'t a function')
    expect(typeof trackResource.toString()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toString()).toBe(trackResource.name, 'toString doesn\'t return name property')
  })
  it('should have a toURI', () => {
    expect(trackResource.toURI).toBeDefined('doesn\'t have toURI property')
    expect(typeof trackResource.toURI).toBe('function', 'toURI isn\'t a function')
    expect(typeof trackResource.toURI()).toBe('string', 'doesn\'t return a string')
    expect(trackResource.toURI()).toBe(trackResource.uri, 'toURI doesn\'t return uri property')
  })
})
