# Spatomify package

[![David](https://img.shields.io/david/itotallyrock/spatomify.svg?style=flat-square)](https://david-dm.org/itotallyrock/spatomify) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![Code Climate](https://img.shields.io/codeclimate/github/itotallyrock/Spatomify.svg?style=flat-square)](https://codeclimate.com/github/itotallyrock/Spatomify) [![license](https://img.shields.io/github/license/itotallyrock/spatomify.svg?style=flat-square)](https://github.com/itotallyrock/Spatomify/blob/master/LICENSE)

![Song in status bar along with tooltip on hover example](http://i.imgur.com/6PwSPaH.gif)

Windows and Mac compatible spotify status bar.  Simply shows the current song and the artwork for the song in the statusbar.

## Installation
This package can be installed through Atom. Alternatively, you can use apm by typing
`apm install spatomify`.

For the latest features can reference the github repository to reflect live changes.  This is optional and will most likely break a lot.  This requires some command line usage `apm install itotallyrock/LSpatomify`

## Features
* Song name in status bar
* Toggleable album art in status bar
* Customizable command to execute when clicking the song
* Tooltip to show long song names that would be cut off
* Fancy colorize option to make the album art change colors

## Potential features
* Progress bar
* Commands to control Spotify
 * Seeking
 * Volume Control
 * Opening Spotify from the Editor

## Settings
##### Show Art
Whether or not to load and display the album artwork next to the song title in the status bar.  If enabled the artwork will be loaded and shown.  If disabled the artwork will still be loaded just hidden.
##### Click Action
What atom command to run on clicking the song title.  So any command for any install package can be used, for example the default is to toggle pause `spatomify:togglepause`, but this could be `application:minimize` if you wanted to minimize atom or anything you want from the command palette.
##### Colorize
Whether or not to do an animated hue-rotation of the album artwork.  This is a simple little css features to add some spice the artwork instead of having an idle picture.
