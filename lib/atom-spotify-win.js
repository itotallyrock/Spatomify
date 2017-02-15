const SpotifyWinView = require('./atom-spotify-win-view')
const atom = require('atom')
const CompositeDisposable = require('atom').CompositeDisposable

module.exports = {
  // config: {
  //   activateOnStart: {
  //     type: 'string',
  //     'default': 'Remember last setting',
  //     'enum': ['Remember last setting', 'Show on start', 'Don\'t show on start']
  //   }
  // },
  active: false,
  activate: function (state) {
    this.state = state
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-spotify-win:toggle': (function (_this) {
        return function () {
          return _this.toggle()
        }
      })(this)
    }))
    this.SpotifyWinView = new SpotifyWinView()
    return this.SpotifyWinView.init()
  },
  deactivate: function () {
    var ref
    console.log('Spotify was deactivated')
    this.subscriptions.dispose()
    this.SpotifyWinView.destroy()
    return (ref = this.statusBarTile) != null ? ref.destroy() : void 0
  },
  serialize: function () {
    return {
      activateOnStart: atom.config.get('status-bar-clock.activateOnStart'),
      active: this.active
    }
  },
  toggle: function (active) {
    var ref, ref1
    if (active == null) {
      active = void 0
    }
    if (active == null) {
      active = !this.active
    }
    if (active) {
      console.log('Spotify was toggled on')
      this.SpotifyWinView.activate()
      this.statusBarTile = this.statusBar.addRightTile({
        item: this.SpotifyWinView,
        priority: -1
      })
    } else {
      if ((ref = this.statusBarTile) != null) {
        ref.destroy()
      }
      if ((ref1 = this.SpotifyWinView) != null) {
        ref1.deactivate()
      }
    }
    this.active = active
    return this.active
  },
  consumeStatusBar: function (statusBar) {
    this.statusBar = statusBar
    return this.activateOnStart(this.state)
  },
  activateOnStart: function (state) {
    switch (state.activateOnStart) {
      case 'Remember last setting':
        return this.toggle(state.active)
      case 'Show on start':
        return this.toggle(true)
      default:
        return this.toggle(false)
    }
  }
}
