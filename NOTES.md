
## Notes
A simple notes file where I will keep any future ideas potentially or generic notes related to the project.
### Get current progress
The following line gives a percent of the current song progress 0 - 1
This means the previous notion of this not being possible is still unlikely but it now has a means.  Like said before it will be choppy and add to the event loop by creating an interval to check song progress.
``` javascript
  let currentPosition = this.spotify.status.playing_position
  let songLength = this.spotify.status.track.length

  return currentPosition / songLength
```

#### An Extra Note
When I said it was unlikely due the inability to make it css animatible I was wrong.  It is just really complicated and a lot of work.  If we listen for play and pause events then we can pause and unpause the animation.
```css
  .progress-bar {
    animate: songProgress @song-length;
  }
  .progress-bar.paused {
    animation-play-state: paused;
  }
```
Meaning it will likely be a feature I will toy with, give up on, then toy with more until I figure it out.  So eventually you may be seeing a progress bar for your music.

*BTW: I stumbled upon this when I simply was trying to pause the colorize animation on the album art when playback was paused.  Its honestly a really easy concept with a lot of complex implementations.*

### Configuration in Settings Panel is Broke
The settings aren't recognized by the settings panel.  They exist and can be referenced and modified manually but not through the user interface.

*Fixed by modifying atom config.  Changing the name in package.json created a dupicate spatomify config entry, and with settings-view being case-insensitive it resulted in a mismatch messup.*

### Long Load Times
My own time keeping shows the activation method takes ~75ms but TimeCop registers the package at ~3500ms.  Quite a large difference, definitely worth inspecting.
![3825ms package activation](http://image.prntscr.com/image/412d0ecc0a784f63a7cb6b82c67333d2.png)

As you can see in the screenshot above over half of my total package activation is spatomify.  This is going to require some work if this is really the case.  I'm no professional and I have no idea why the load time is what it is.  Perhaps publishing the package to get some publicity to perhaps have someone more experienced resolve the issue.

After some profiling I've come to the conclusion the bulk of the load time is due to the `rng` module which uses blocking random bytes from crypto which requires lots of cycles to build up entropy.  This module is used by `uuid` which is used by `request` which is then used by `spotify-web-helper`.  Unless we forward the issue to anyone along the chain our only option is to fork and modify spotify-web-helper to use fetch. 

#### Some Notes
* This load time was after a `ctrl + r` versus a startup from nothing.
* These times may not include the entirety of what time cop is including
 * For example, we create several event listeners and if timecop registers us as waiting for those to respond we could have a large hang
* All other packages for comparison are sub 300ms so this is 10 times as long to load.

### Work On Creating a Draggable/Dockable Pane than changes based on size.
Similar the tree-view package a draggable docking panel that could either dock to the bottom of the page and act similar to the status bar, or dock to the side panels and act similar to the Spotify application itself.  Where it could easily display the following underneath the tree view or just be on its own in a panel.

![Screenshot of Spotify album art](http://image.prntscr.com/image/416214b59fed4cf3b7403a8d649e731f.png)
![Screenshot of actual implementation](http://image.prntscr.com/image/d6c22c10cf12490d907a17c8db6e451b.png)

Above we have the original idea and the second picture is an actual implementation of the idea.  Docking is very nice and simplifies a lot of things.  It took a lot of Googling and random luck to stumble upon actual code or documentation on how to use docks however they were simpler than any atom panel alternative I would have used.

#### Hover Pause
Prior to the dock design simply clicking the song title would toggle pause playback.  However now how to pause it is more obscure.  Eventually you might just click the image and then that would pause it, but to ensure there is clarity on how to pause we should add a hover to show pause/play icons.

The first image is a trial attempt I made using responsive css.  The second example used by a rainmeter module called Monstercat Visualizer.  Both are prime options for the controls.

<img width="150" alt="Screenshot of Play Hover" src="http://image.prntscr.com/image/93dc504babaf492fa3c4badc6184d90e.png">
<img width="150" alt="Monstercat Visualizer" src="http://image.prntscr.com/image/3b4eecfefa794b14b3820ac788841b8a.png">

### Activate Should Only Enable Essentials
If activate only enables an event listener on Spotify then only when it is either running or constantly checked that it is running will we handle it and create/render/update the view.  Important for performance and keeping sure to separate model and view.  Which so far has been successful but with further improvements and features could lead to more and more crossover between the two.

### Some Spec Testing
We have no testing at this point, just the generated specs for creating a new package.  Any dignified application would have some form of unit testing.  To begin testing there are several types of testing necessary.  The best way to at least start working on testing would be to use some of `tree-view`'s code since `song-element` and `tree-view` files both are very similar.  Another kickstarting point would simply be to test the status of the application with and without spotify running (This is a little more complicated).  CI testing for the latter would seem impossible as pre-launching Spotify will most likely not be possible.

Should we attempt to allow Spotify testing we would most likely rely on a `before_install` script to install Spotify.  Also another note on testing, we would have to use AppVeyor for Windows testing, something I personally haven't done.

To attempt to install Spotify on windows via the command line we may need to look into https://github.com/RoboticCheese/spotify-chef

### Better Controls
I've spent some time to create a C# interface to control Spotify.  Still needs to be implemented but I created a function to interface with the interface.
Some features added.
```javascript
  // Toggle Pause
  SpotifyController.exec(SpotifyController.PAUSE_COMMAND)
  // Skip Current Song
  SpotifyController.exec(SpotifyController.NEXT_COMMAND)
  // Go Back a Song
  SpotifyController.exec(SpotifyController.PREVIOUS_COMMAND)
```
I opted out of controlling volume as this would simply control system volume and wasn't desirable.  Althought I did expirment with a potential solution using the built in keyboard shortcuts in Spotify; however, to implement requires a lot of things to go right.  You had to have Spotify open, not minimized to tray.  Have keyboard shortcuts enabled.  Not be doing any other key combination during the volume changing.  And the Spotify client was opened during the process.
The last issue itself could be a feature, open Spotify from atom, however like I said it requires it not to be minimized to tray.  More research may be done into potential solutions for this.  For now I'm very happy with the interface and controls implemented.  Skipping songs was a major feature I really wanted implemented.

### UI Update
#### Status Bar Revival
Since adding the dock item its been nice but it takes a lot of space up, but a combination of the old status-bar item and this would be great.  One example of this is the linter-ui which shows the number of errors in a file but upon clicking that item in the status bar it opens a dock item with details and hides the status-bar item.

This way anyone who simply wants a small little song title to look at or perhaps also including the artwork just like before, they can.
#### Responsive Design
The large dock module on its own is nice but when resizing the bar we may want to have it be responsive.  For example when scaling the width very high the song content gets pushed down a very large amount.  If a max width and min width could be set and then have the text flow to either the left or right of the image instead of under it, then it would look supremely better.

Perhaps at large sizes hide text and show it on hover alongside the controls to not have a small amount of text near a large image.  And for small sizes maybe remove the image entirely, this has more overhead as the controls are enabled by hovering over the image.  This means we either need to implement plain old controls or just allow pausing with the clicking of the title/artist

Most likely unless we use an external library or javascript we will have to turn to `margin`s and `calc` to counter act the size issues.
##### An Attempt
*Note: After quite some fiddling I've come to the conclusion that it might be possible.*
This is literally 2-3 hours to just css finaglin' and between `calc`, `height`, `margin`, `padding`, `position`, `max-width`, `max-height`, `vw`, and `vh` I was able to accomplish the too big and smalls widths partially.  I failed in two senses though; first, I didn't make it fulfill the requirements listed by rather made it responsive; second, I could only get it to be responsive in one direction.  That meaning I could only get it to respond to being too small or too big, but not both at the same time.

This saddened me a lot.  I was able to get both results of what I wanted, only to not be able to implement them alongside each other.  Along the way though I did think of some alternatives.  I've yet to try any of these at the time of writing this, but they outlook ~~should be promising~~ is dire.
Using javascript will definitely work.  The functionality of javascript will make this impossible to not implement and work.  The issue is concept along with code complexity, if I can avoid using any of the own javascript the better.  That being said there are some controls in place with atom already.  There is a style attribute on the dock container meaning a query such as `.atom-dock-content-wrapper[style$="#px"]` would allow styling specific widths.  Which we could implement for every reasonable value of pixel widths; however, this seems super hacky and bad practice as well as a good way to ramp up the file size with 1000s of css selectors for arbitrary width values.
I'm also thinking of resorting to attempting to simply ask about this to an expert or submit it to a forum for people to have their own go at.  This would open my own options vastly as many people would try the infinite combinations of css rules I don't know or that I haven't tried yet.  This idea is very tempting but the very premise behind this is somewhat of a metaphor for conquering a challenge.  If I can overcome this issue, then future issues would seem easier.

##### Requirements
* If width is too small
 * [ ] Only show image
 * [ ] Title and artist are shown in a tooltip
* If height is too small
 * [ ] Single line title
 * [ ] Controls remapped to the title
* If width is too big
 * [ ] Put title to the left or right of image depending on dock side
 * [ ] Potentially show controls under if enough space
* If height is too big
 * [ ] Hide title or only show it on top of image
* If album art is in the same row as the details
 * [ ] It must be padded
 * [ ] It should have moderately rounded edges (perhaps inherited from theme)
