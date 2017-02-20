
module.exports = {
  'showArt': {
    'title': 'Show Album Art',
    'description': 'Whether or not to display a small preview of the album art next to the song name.',
    'type': 'boolean',
    'default': true
  },
  // 'clickAction': {
  //   'title': 'Click Action',
  //   'description': 'What to do when clicking the song title in the status bar.',
  //   'type': 'string',
  //   'default': 'togglePause',
  //   'enum': [
  //     {'value': 'spatomify:togglepause', 'description': 'Toggle Play and Pause'},
  //     {'value': 'spatomify:savesong', 'description': 'Save to songs'},
  //     {'value': 'spatomify:openwindow', 'description': 'Open the Spotify Window (WIP)'},
  //     {'value': '', 'description': 'Don\'t do anything'}
  //   ]
  // },
  clickAction: {
    'title': 'Click Action',
    'description': 'What command to execute when clicking the song title in the status bar.',
    'type': 'string',
    'default': 'spatomify:togglepause'
  },
  colorize: {
    'title': 'Colorize',
    'description': 'Fancy color animation on the album art.',
    'type': 'boolean',
    'default': 'false'
  }
  // 'volumeSteps': {
  //   'title': 'Volume Steps',
  //   'description': 'How many steps between min and max for each keypress.',
  //   'type': 'number',
  //   'minimum': 1,
  //   'default': 15
  // },
  // 'maxVolume': {
  //   'title': 'Maximum Volume',
  //   'description': 'The maximum volume for the volume control.',
  //   'type': 'number',
  //   'minimum': 0,
  //   'maximum': 1,
  //   'default': 1
  // },
  // 'minVolume': {
  //   'title': 'Minimum Volume',
  //   'description': 'The minimum volume for the volume control.',
  //   'type': 'number',
  //   'minimum': 0,
  //   'maximum': 1,
  //   'default': 0
  // }
}
