'use babel'

import SpotifyResource from '../lib/classes/SpotifyResource'
import AlbumResource from '../lib/classes/AlbumResource'
import Artwork from '../lib/classes/Artwork'

let testArtworks = [
  {
    thumbnail_width: 300,
    thumbnail_height: 300,
    thumbnail_url: 'https://i.scdn.co/image/f90898a1a5b8f30fd109a2cdc54a2f705175f7be'
  }
]

describe('Artwork', () => {
  let artwork
  beforeEach(() => {
    artwork = new Artwork(testArtworks[0].thumbnail_url, testArtworks[0].thumbnail_width, testArtworks[0].thumbnail_height)
  })
  it('should have url', () => {
    expect(artwork.url).toBeDefined('url is undefined')
    expect(typeof artwork.url).toBe('string', 'url isn\'t a string')
    expect(artwork.url).toMatch(/([A-z]+):\/\/(([A-z0-9]+)(\.|\/))+/g, 'url isn\'t a valid url')
    expect(artwork.url).toNotBe('atom://spatomify/images/default.svg')
    expect(artwork.url).toBe(testArtworks[0].thumbnail_url, 'doesn\'t match original url')
  })
  it('should have a width', () => {
    expect(artwork.width).toBeDefined('width is undefined')
    expect(typeof artwork.width).toBe('number', 'width isn\'t a number')
    expect(artwork.width).toBe(testArtworks[0].thumbnail_width, 'doesn\'t match original width')
  })
  it('should have a height', () => {
    expect(artwork.height).toBeDefined('height is undefined')
    expect(typeof artwork.height).toBe('number', 'height isn\'t a number')
    expect(artwork.height).toBe(testArtworks[0].thumbnail_height, 'doesn\'t match original height')
  })
  it('should have a generateCSS', () => {
    expect(artwork.generateCSS).toBeDefined('generateCSS is undefined')
    expect(typeof artwork.generateCSS).toBe('function', 'generateCSS isn\'t a function')
    expect(typeof artwork.generateCSS()).toBe('string', 'generateCSS doesn\'t return a string')
    expect(artwork.generateCSS()).toMatch(/^url\(("|')(.*)("|')\)( \d+px \d+px)?;?$/g, 'isn\'t a proper css attribute')
    expect(artwork.generateCSS()).toBe(`url("${artwork.url}") ${artwork.width}px ${artwork.height}px;`)
  })
  it('should have a generateHTMLImage', () => {
    expect(artwork.generateHTMLImage).toBeDefined('generateHTMLImage is undefined')
    expect(typeof artwork.generateHTMLImage).toBe('function', 'generateHTMLImage isn\'t a function')
    expect(typeof artwork.generateHTMLImage()).toBe('object', 'generateHTMLImage doesn\'t return an object')
    expect(artwork.generateHTMLImage() instanceof HTMLElement).toBe(true, 'generateHTMLImage doesn\'t return an HTMLElement')
    expect(artwork.generateHTMLImage().nodeName).toBe('IMAGE', 'generateHTMLImage doesn\'t return an imageElement')

    // src attribute
    expect(artwork.generateHTMLImage().src).toBeDefined('image source is undefined')
    expect(artwork.generateHTMLImage().src).toBe(artwork.url, 'image source doesn\'t match')

    // width attribute
    expect(artwork.generateHTMLImage().width).toBeDefined('image width is undefined')
    expect(artwork.generateHTMLImage().width).toBe(artwork.width, 'image width doesn\'t match')

    // height attribute
    expect(artwork.generateHTMLImage().height).toBeDefined('image height is undefined')
    expect(artwork.generateHTMLImage().height).toBe(artwork.height, 'image height doesn\'t match')

    // alt attribute
    expect(artwork.generateHTMLImage().alt).toBeDefined('image alt is undefined')
    expect(artwork.generateHTMLImage().alt).toBe('Artwork Thumbnail', 'image alt isn\'t default')
  })
})

describe('DefaultArtwork', () => {
  let artwork
  beforeEach(() => {
    artwork = new Artwork()
  })
  it('should have url', () => {
    expect(artwork.url).toBeDefined('url is undefined')
    expect(typeof artwork.url).toBe('string', 'url isn\'t a string')
    expect(artwork.url).toMatch(/([A-z]+):\/\/(([A-z0-9]+)(\.|\/))+/g, 'url isn\'t a valid url')
    expect(artwork.url).toBe('atom://spatomify/images/default.svg')
  })
  it('should have a width', () => {
    expect(artwork.width).toBeDefined('width is undefined')
    expect(typeof artwork.width).toBe('number', 'width isn\'t a number')
    expect(artwork.width).toBe(226, 'doesn\'t match original width')
  })
  it('should have a height', () => {
    expect(artwork.height).toBeDefined('height is undefined')
    expect(typeof artwork.height).toBe('number', 'height isn\'t a number')
    expect(artwork.height).toBe(226, 'doesn\'t match original height')
  })
  it('should have a generateCSS', () => {
    expect(artwork.generateCSS).toBeDefined('generateCSS is undefined')
    expect(typeof artwork.generateCSS).toBe('function', 'generateCSS isn\'t a function')
    expect(typeof artwork.generateCSS()).toBe('string', 'generateCSS doesn\'t return a string')
    expect(artwork.generateCSS()).toMatch(/^url\(("|')(.*)("|')\)( \d+px \d+px)?;?$/g, 'isn\'t a proper css attribute')
    expect(artwork.generateCSS()).toBe(`url("${artwork.url}") ${artwork.width}px ${artwork.height}px;`)
  })
  it('should have a generateHTMLImage', () => {
    expect(artwork.generateHTMLImage).toBeDefined('generateHTMLImage is undefined')
    expect(typeof artwork.generateHTMLImage).toBe('function', 'generateHTMLImage isn\'t a function')
    expect(typeof artwork.generateHTMLImage()).toBe('object', 'generateHTMLImage doesn\'t return an object')
    expect(artwork.generateHTMLImage() instanceof HTMLElement).toBe(true, 'generateHTMLImage doesn\'t return an HTMLElement')
    expect(artwork.generateHTMLImage().nodeName).toBe('IMAGE', 'generateHTMLImage doesn\'t return an imageElement')

    // src attribute
    expect(artwork.generateHTMLImage().src).toBeDefined('image source is undefined')
    expect(artwork.generateHTMLImage().src).toBe(artwork.url, 'image source doesn\'t match')

    // width attribute
    expect(artwork.generateHTMLImage().width).toBeDefined('image width is undefined')
    expect(artwork.generateHTMLImage().width).toBe(artwork.width, 'image width doesn\'t match')

    // height attribute
    expect(artwork.generateHTMLImage().height).toBeDefined('image height is undefined')
    expect(artwork.generateHTMLImage().height).toBe(artwork.height, 'image height doesn\'t match')

    // alt attribute
    expect(artwork.generateHTMLImage().alt).toBeDefined('image alt is undefined')
    expect(artwork.generateHTMLImage().alt).toBe('Artwork Thumbnail', 'image alt isn\'t default')
  })
})
