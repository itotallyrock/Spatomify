## 1.1.0 - Major Fixer Upper
* Been a while since the last update so this one had some major fixes to be implemented
* Finished some unfinished changes from 1.0.1
* Several bug fixes
* Updated `spotify-web-helper` to latest
 * This is required as Spotify updated their end such that this change was necessary
* Temporarily removed all error handling and simply kill the package when Spotify is closed
 * The previous method kept spamming the logs and would build up an immense amount of memory
* You can now toggle album art, and colorize
* Messed around with a progress bar which ultimately ended with it not being possible
 * The implementation isn't there yet, at least not without clogging up the event loop with checking the song constantly
 * This would result in a choppy progress bar at the least so I decided not to pursue it
* This update as a whole created or destroyed or updated many features that will need a follow up update to ensure they fully function, so more will be coming soon.

## 1.0.1 - Cleanup and Organize
* Rushed out, the previous release let a lot of issue go by.  So this update prettied up the release
* Removed unused dependency
* Updated changelog
* Converted `self` calls to `this` calls
* Removed a bunch of console logs used during testing
* Added some more comments
* Removed unused commands

## 1.0.0 - Refactor
* Added subclasses
 * Song subclass for song objects
 * AlbumArt subclass for retrieving images for a Spotify URI
* Made pretty much everything asynchronous
 * Now it uses `async` and `await` instead of Promises directly
* Reorganized the views class
 * This removed excessive functions
 * Tried to make sure to keep models separate from view
* Settings
 * Added colorize to enable hue rotation on album art

## 0.2.0 - Optimize
* Switched from `node-spotify-webhelper` to `spotify-web-helper`
 * This allows listening for events like song update
 * Keeps an open connection to Spotify's Web-Helper for faster interaction
 * This change pretty much reduced the entirety of the apps code to an interfaces between Atom and `spotify-web-helper`
* Added bind default `ctrl-alt-p` to toggle pause
* Thumbnail album art is will now always be higher quality than the size of the status bar if possible
* Copied License to reduce confusion

## 0.1.1 - Styling
* Made it such that styling will work across themes with different scales

## 0.1.0 - First Release
* Every feature added
* Every bug fixed
