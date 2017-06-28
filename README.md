# Spatomify package

[![David](https://img.shields.io/david/itotallyrock/spatomify.svg?style=flat-square)](https://david-dm.org/itotallyrock/spatomify) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![Code Climate](https://img.shields.io/codeclimate/github/itotallyrock/Spatomify.svg?style=flat-square)](https://codeclimate.com/github/itotallyrock/Spatomify) [![license](https://img.shields.io/github/license/itotallyrock/spatomify.svg?style=flat-square)](https://github.com/itotallyrock/Spatomify/blob/master/LICENSE)


![Docking Pane Preview](http://image.prntscr.com/image/be8a3aa517cc421f9c89adcb9441f51a.png)

Windows compatible Spotify informational pane.  Allows you to see the current song's album art, artist, and name along with the ability to control some Spotify features in Atom.

## Installation
This package can be installed through Atom. Alternatively, you can use apm by typing
`apm install spatomify`.

For the latest features can reference the github repository to reflect live changes.  This is optional and will most likely break a lot.  This requires some command line usage `apm install itotallyrock/LSpatomify`

## Features
* Song name in ~~status bar~~ docking pane
* Toggleable album art in ~~status bar~~ docking pane
* Customizable command to execute when clicking the song
* ~~Tooltip to show long song names that would be cut off~~
* Fancy colorize option to make the album art change colors

## Potential features
* Progress bar
* Commands to control Spotify
 * Seeking
 * Volume Control
 * Opening Spotify from the Editor
* Safe for Work Mode
 * See Safe for work setting below

## Settings
#### Show Art
Whether or not to load and display the album artwork next to the song title.  If enabled the artwork will be loaded and shown.  If disabled the artwork will still be loaded just hidden.
#### Click Action
What atom command to run on clicking the image.  So any command for any install package can be used, for example the default is to toggle pause `spatomify:togglepause`, but this could be `application:minimize` if you wanted to minimize atom or anything you want from the command palette.

*This feature may be removed to match the GUI should a play/pause button is displayed*
#### Colorize
Whether or not to do an animated hue-rotation of the album artwork.  This is a simple little css features to add some spice the artwork instead of having an idle picture.
#### Safe for Work
Hide album artwork for explicit songs.  This isn't a guarantee because not all inappropriate album artwork is for explicit songs.
**This Feature is Currently Not Implemented**
