## 2.0.0 - Lots of Upgrades
* Start by prefacing that this update simply improved a lot of things
* Added a lot of new commands
 * `spatomify:skip`
 * `spatomify:back`
 * `spatomify:show`
 * `spatomify:hide`
 * `spatomify:toggle`
 * `spatomify:toggle-focus`
* Added skip/previous feature default keys are `ctrl-alt-shift-left` and `ctrl-alt-shift-right` to go back and forward respectively
* Now uses custom element names instead of *div soup*
* Package now closes gracefully if Spotify is closed
 * It will also try to reopen itself if it can detect Spotify is running again
* Added more error checking to `AlbumArt` fetching
* Removing image fetching from `Song` as it was redundant and unnecessary
* Serialization is now better handled
* Added some serialization error checking for song-element
* Refactored styling to make it more organized using nesting
* Package is now private to prevent accidental publishing to npm
* More methods to handle application state
 * `shouldAttach` `createOrDestroyViewIfNeeded` and `getSongElementInstance`
* Moved some pause handling from `spatomify.js` to `song-element.js` to keep model-view separate
* We are now fully converted to docks
 * This also means we now use a URI which is `atom://spatomify`
 * Hopefully this will be the last major UI change necessary
* More separation for MVVM
 * Handle click events in model instead of view
* Convert or parse old event listeners to fit disposables
* Update SpotifyWebHelper to use the latest versions
 * This was the major slowdown for the package being slow to activate as request has been replaced with got
 * Also cuts back on several unneeded dependencies

## 1.1.2 - Small Bug Fixes
* Album Art was being fetched but not shown due to a variable that wasn't updated
* A simple test would have resolved this before pushing

## 1.1.1 - Album Art Improvements
* Switched from request to native fetch for retrieving artwork information
* Removed unnecessary pluralize library to simply add an 's' to a word
* Optimized by converting album art fetching to `async` `await`s
* General improvements by removing several unneeded dependencies and more asynchronity

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
