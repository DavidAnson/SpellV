# Spell&#x2714; (a.k.a. SpellV)

Welcome to Spell&#x2714;, a simple app that makes it easy to spell-check with a browser!


## Motivation

Misspellings detract from your message.

They're easily avoided with tooling, but that's not always available when and where you need it.
A word processor can be an effective way to spell-check arbitrary content, but some files (e.g., source code) have a lot of noise due to keywords, strange punctuation, and the like.

Spell&#x2714; leverages your browser's built-in support for spell-checking to provide an easy, readily-available means of proofing any content.
With a deeper understanding of the structure of your data, it's able to filter out much of the noise that makes using a word processor challenging.

Spell&#x2714;'s flexible approach stays out of your way and helps avoid unfortunate typos!


## Demonstration

[http://dlaa.me/SpellV/](http://dlaa.me/SpellV/)


## Documentation

To import text:

* Paste from the clipboard
* Drag-and-drop from the file system
* Open a file (via the button at the top right)

The view selector (lower-left corner) supports:

* Original text
* Unique words (sorted)
* HTML/XML (text, comments, and attributes)
* JSON (values only)
* JavaScript (string literals and comments)
* Markdown (text)

Notes:

* Offline use is supported once the app has been cached by the browser
* Changes are not saved to the original file; copy/paste any edits you want to keep
* Browsers that support the [forceSpellCheck](https://html.spec.whatwg.org/multipage/interaction.html#dom-forcespellcheck) API automatically highlight spelling errors
* Internet Explorer highlights automatically if you type in the text box before loading
* Chrome highlights automatically because of a selection hack
* Firefox highlights automatically


## Installation

1. `git clone https://github.com/DavidAnson/SpellV.git`
2. `cd SpellV/Grunt`
3. `npm install`
4. `grunt`
5. Open `default.htm` in a web browser
  * "Allow blocked content" if prompted by Internet Explorer


## Credits

Spell&#x2714; uses the following technologies:

* [Knockout](http://knockoutjs.com/)
* [Lo-Dash](https://lodash.com/)
* [htmlparser2](https://github.com/fb55/htmlparser2)
* [Espree](https://github.com/eslint/espree)
* [marked](https://github.com/chjj/marked)

Spell&#x2714; is built with the following technologies:

* [Grunt](http://gruntjs.com/) (including [clean](https://github.com/gruntjs/grunt-contrib-clean), [watch](https://github.com/gruntjs/grunt-contrib-watch), and [grunt-curl](https://github.com/twolfson/grunt-curl))
* [ESLint](http://eslint.org/) ([via Grunt](https://github.com/sindresorhus/grunt-eslint))
* [browserify](http://browserify.org/) ([via Grunt](https://github.com/jmreidy/grunt-browserify))
* [UglifyJS](http://lisperator.net/uglifyjs/) ([via Grunt](https://github.com/gruntjs/grunt-contrib-uglify))


## License

[MIT](LICENSE)
