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
