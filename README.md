# Spell&#x2714; (a.k.a. SpellV)

Welcome to Spell&#x2714;, a simple app that makes it easy to spell-check with a browser!


## Motivation

Misspellings detract from your message.

They're easily avoided with tooling, but that's not always available when and where you need it.
A word processor can be an effective way to spell-check arbitrary content, but some files (e.g., source code) have a lot of noise due to keywords, strange punctuation, and the like.

Spell&#x2714; leverages your browser's built-in support for spell-checking to provide an easy, readily-available means of proofing any content.
With a deeper understanding of the structure of your data, it's able to filter out much of the noise that makes using a word processor challenging.

Spell&#x2714;'s flexible approach stays out of your way and helps avoid unfortunate typos!


## Documentation

> To import text:
> &bull; Paste from the clipboard
> &bull; Drag-and-drop from the file system
> &bull; Open a file (via the button in the top-right corner)
>
> The view selector (lower-left corner) supports:
> &bull; Original text
> &bull; Unique words (sorted)
> &bull; HTML/XML (text, comments, and attributes)
> &bull; JSON (values only)
> &bull; JavaScript (string literals and comments)
>
> Notes:
> &bull; Offline use is supported once the app has been cached by the browser
> &bull; Changes are not saved to the original file; copy/paste any edits you want to keep
> &bull; Browsers that support the [forceSpellCheck](https://html.spec.whatwg.org/multipage/interaction.html#dom-forcespellcheck) API automatically highlight spelling errors
> &bull; Internet Explorer highlights automatically if you type in the text box before loading
> &bull; Chrome highlights automatically because of a selection hack
> &bull; Firefox highlights automatically


## Credits

Spell&#x2714; uses the following technologies:

* [Knockout](http://knockoutjs.com/)
* [Lo-Dash](https://lodash.com/)
* [htmlparser2](https://github.com/fb55/htmlparser2)
* [Esprima](http://esprima.org/)

Spell&#x2714; is built with the following technologies:

* [Grunt](http://gruntjs.com/) (including [watch](https://github.com/gruntjs/grunt-contrib-watch))
* [ESLint](http://eslint.org/) ([via Grunt](https://github.com/sindresorhus/grunt-eslint))
* [browserify](http://browserify.org/) ([via Grunt](https://github.com/jmreidy/grunt-browserify))
* [UglifyJS](http://lisperator.net/uglifyjs/) ([via Grunt](https://github.com/gruntjs/grunt-contrib-uglify))


## License

[MIT](LICENSE)
