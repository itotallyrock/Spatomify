
module.exports = {
  'showArt': {
    'title': 'Show Album Art',
    'description': 'Whether or not to display a small preview of the album art next to the song name.',
    'type': 'boolean',
    'default': true
  },
  'volumeSteps': {
    'title': 'Volume Steps',
    'description': 'How many steps between min and max for each keypress.',
    'type': 'number',
    'minimum': 1,
    'default': 15
  },
  'maxVolume': {
    'title': 'Maximum Volume',
    'description': 'The maximum volume for the volume control.',
    'type': 'number',
    'minimum': 0,
    'maximum': 1,
    'default': 1
  },
  'minVolume': {
    'title': 'Minimum Volume',
    'description': 'The minimum volume for the volume control.',
    'type': 'number',
    'minimum': 0,
    'maximum': 1,
    'default': 0
  }
}
