'use babel'

export default class Artwork {
  constructor (url, width, height) {
    this.url = url || 'atom://spatomify/images/default.svg'
    this.width = width || 226
    this.height = height || 226
  }

  generateCSS () {
    return `url("${this.url}");`
  }

  generateCSSWithSize () {
    return `url("${this.url}") ${this.width}px ${this.height}px;`
  }

  generateHTMLImage () {
    let image = document.createElement('image')
    image.src = this.url
    image.width = this.width
    image.height = this.height
    image.alt = 'Artwork Thumbnail'
    return image
  }
}
