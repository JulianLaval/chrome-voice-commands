![Logo](https://raw.githubusercontent.com/JulianLaval/chrome-voice-commands/master/img/icon128.png) 
# Chrome Voice Commands 
For the first time ever, enjoy the full power of voice commands on Google Chrome!

In its current state, Google Chrome only supports "voice searches" from new tabs and the Google.com homepage. Whilst that's already pretty cool, I felt it'd be cooler to build a fully-fledged voice command system, accessible from (almost) any webpage, and allowing for more than simply Googling what you ask it.
                                    
Please note that this Google Chrome extension is in development, and as such may be buggy. If you find any bugs, please report them!

This software is free to use and modify under the MIT license.

## Usage
This is extension is currently only available for Google Chrome, and can be downloaded directly from the [Chrome Web Store](https://chrome.google.com/webstore/category/apps). Additionally, you can also load the unpacked extension in Developer Mode.

Voice commands can be triggered in a number of ways:

- By clicking the ![Browser icon](https://raw.githubusercontent.com/JulianLaval/chrome-voice-commands/master/img/browser-icon19.png) in your Settings bar
- More conveniently, via the `Ctrl`+`Shift`+`F` combination (or equivalent on Mac)
- Finally, if hotwording is enabled, by simply say `"Ok Chrome"` at any time (coming soon!)

## Supported commands

The extension presently supports a number of command, with more in the works. If you have any additional suggestions, please get in touch!

Note: parentheses in voice triggers represent optional words.

E.g. opening a new tab, i.e. `(open) (new) tab` can be triggered by saying `tab`, `open tab`, `new tab`, or `open new tab`.

Command | Voice Trigger
--- | ---
Open website in current tab | Go to [website]
Google search in current tab | (Search for/Google) [query]
Google Image search in current tab | (Search for/Google) pictures/images of [query]
Open a website in a new tab | New tab (go to) [website]
Google search in a new tab | New tab (search for/Google) [query]
Google Image search in a new tab | New tab (search for/Google) pictures/images of [query]
Open a new tab | (Open) (new) tab
Refresh current tab | Refresh/reload (current) (tab)
Duplicate current tab | Duplicate/copy (current) tab
Close current tab | Close/exit (current) tab
Exit all tabs/exit Chrome | Close all tabs/exit (Chrome)/close (Chrome)
Go to Chrome settings/history/bookmarks/extensions/downloads/about | (Open) Chrome [query]
Open extension settings | About (extension)/extension settings/extension options

The `go to website` command supports the following websites:
Facebook, Google, Twitter, Wikipedia, YouTube, Linkedin, StackOverflow, Outlook, Reddit, Gmail,
Slashdot, GitHub, Slack, Amazon, Dribbble, Google Drive, Dropbox, Quora, Tumblr, Soundcloud, Spotify

## FAQ

#### Why do you need to access my microphone?

This being a voice command extension, it only make sense that it be able to listen to your beautiful voice.

#### Why can't I use the extension in a new tab or other `chrome://` URLs?

Google Chrome offers extensions a default popup function which, although neat, unfortunately lacks versatility in how it can be triggered. This extension therefore relies instead on injecting a small amount of JavaScript and CSS directly into the active tab. Due to security concerns, Google Chrome does not allow code to be injected into its system tabs (e.g. new tab), and thus the extension will not work on those. As a rule of thumb, any URL based on `http://` or `https://` will work just fine.

#### How do I know the microphone isn't always on and storing what I say?

That's for me to know, and for you to find out! In all seriousness, however, Google Chrome does not indicate whether extensions are listening to you or not, which is a shame. As such, please feel free to go through the code yourself and make sure everything is ship-shape.

That being said, please be aware that when hotwording is enabled, the extension will listen constantly for the keyphrase `"Ok Chrome"`. Everything else is ignored. Nothing is ever stored. This extension is merely an experiment; if you have any legitimate privacy concerns, please do not use it. If you find any vulnerabilities with the extension, please point them out ASAP.

#### Are you affiliated with the NSA?

No. (Maybe).

#### How can I donate to this awesome project?

A frequently asked question, you say? :) If you feel that this extension is deserving of you hard-earned money and would like me to continue with such shenanigans, please feel free to [donate via PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=45HWRHYS6QZVW)!

## Roadmap

* Finish support of `"Ok Chrome"` hotwording
* Add support for multiple languages
* Add support for more commands
* Build plugins for browsers other than Google Chrome
* Get acquired by Google for $1 trillion

## About

**Chrome Voice Commands** | version 0.1.0

(c) Julian Laval 2015 | [@JulianLaval](https://twitter.com/JulianLaval)

None of this would have been possible without [Annyang](https://github.com/TalAter/annyang), a fantastic JavaScript speech recognition library authored by the awesome [@TalAter](https://twitter.com/TalAter).

## License
This software is free to use under the [MIT](https://github.com/JulianLaval/chrome-voice-commands/blob/master/LICENSE) license.