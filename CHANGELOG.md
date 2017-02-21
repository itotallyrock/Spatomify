## 1.0.0 - Refactor
* Added several subclasses
 * Song subclass for song objects
 * AlbumArt subclass for retrieving images for a Spotify URI
* Made pretty much everything asynchronous
 * Most of it was already, but now it uses `async` and `await` instead of Promises directly
* Reorganized the views class
 * This removed a number of excessive functions
 * Tried to make sure to keep models separate from view
* Settings
 * Added colorize to enable hue rotation on album art

## 0.2.0 - Optimize
* Switched from `node-spotify-webhelper` to `spotify-web-helper`
 * This allows listening for events like song update
 * Keeps an open connection to Spotify's WebHelper for faster interaction
 * This change pretty much reduced the entirety of the apps code to a few interfaces between Atom and `spotify-web-helper`
* Added bind default `ctrl-alt-p` to toggle pause
* Thumbnail album art is will now always be higher quality than the size of the status bar if possible
* Copied License to reduce confusion

## 0.1.1 - Styling
* Made it such that styling will work across themes with different scales

## 0.1.0 - First Release
* Every feature added
* Every bug fixed
