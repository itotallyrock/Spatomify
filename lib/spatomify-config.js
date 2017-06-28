'use babel'

export default {
  'showArt': {
    'title': 'Show Album Art',
    'description': 'Whether or not to display a small preview of the album art next to the song name.',
    'type': 'boolean',
    'default': true
  },
  'clickAction': {
    'title': 'Click Action',
    'description': 'What command to execute when clicking the song title in the status bar.',
    'type': 'string',
    'default': 'spatomify:togglepause'
  },
  'colorize': {
    'title': 'Colorize',
    'description': 'Fancy color animation on the album art.',
    'type': 'boolean',
    'default': false
  },
  'safeForWork': {
    'title': 'Safe for Work',
    'description': 'Hide album artwork for explicit songs',
    'type': 'boolean',
    'default': true,
    'disabled': true
  }
}
