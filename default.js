"use strict";

(function main() {
  // Private variables
  var _textarea = document.getElementsByTagName("textarea")[0];
  var _text = "";
  var _updating = false;
  var _webkit = /WebKit/.test(navigator.userAgent);

  // View model
  var _model = {
    text: ko.observable(""),
    views: ko.observableArray([ "Original", "Unique words", "HTML/XML content", "JSON content", "JavaScript strings", "Markdown content" ]),
    selectedView: ko.observable(null)
  };
  _model.selectedView.extend({ notify: "always" });

  // Browser-specific workarounds
  function forceSpellCheckViaSelectionWorker(textarea) {
    var selectionStart = textarea.selectionStart;
    document.getSelection().modify("move", "forward", "line");
    if (selectionStart !== textarea.selectionStart) {
      setTimeout(forceSpellCheckViaSelectionWorker.bind(null, textarea), 0);
    }
  }
  function forceSpellCheckViaSelection(textarea) {
    // Move cursor forward over every line
    if (document.getSelection().modify) {
      textarea.setSelectionRange(0, 0);
      forceSpellCheckViaSelectionWorker(textarea);
    }
  }

  // Update display with new text
  function updateText(newValue) {
    _updating = true;
    _model.text(newValue);
    _updating = false;
    // Force spell check of new text
    if (_textarea.forceSpellCheck) {
      _textarea.forceSpellCheck();
    } else if (_webkit) {
      forceSpellCheckViaSelection(_textarea);
    }
  }

  // Load from a string or File object
  function loadText(source) {
    _model.text("");
    document.getElementsByTagName("form")[0].reset(); // input element
    if (typeof source === "string") {
      // Update from string
      _text = source;
      _model.selectedView(_model.selectedView());
    } else {
      // Update from File object
      var reader = new FileReader();
      reader.onload = function readerOnload(evt) {
        _text = evt.target.result;
        _model.selectedView(_model.selectedView());
      };
      reader.readAsText(source);
    }
  }

  // Extract strings from parsed JavaScript
  function visitAllNodes(node, strings) {
    if (!node) {
      // Nothing to do
      return;
    } else if ((node.type === "Literal") && (typeof (node.value) === "string")) {
      // Log string literal
      var trimmed = node.value.trim();
      if (trimmed) {
        strings.push(trimmed);
      }
    } else if (typeof (node) === "object") {
      // For each key/value pair...
      Object.keys(node).forEach(function handleObjectKey(key) {
        var value = node[key];
        if (Array.isArray(value)) {
          // Visit all array elements
          value.forEach(function handleArrayElement(element) {
            visitAllNodes(element, strings);
          });
        } else {
          // Visit value
          visitAllNodes(value, strings);
        }
      });
    }
  }

  // Generate unique words view
  function viewUniqueWords(source) {
    var result = _(source.replace(/[^a-zA-Z-']/g, " ").split(" "))
      .map(function normalize(w) {
        return w.replace(/^[-']+|[-']+$/, "");
      })
      .uniq()
      .sort()
      .valueOf();
    if (!result[0]) {
      // Remove empty 0th element
      result = result.splice(1);
    }
    return result.join(" ");
  }

  // Generate HTML content view
  function viewHtmlContent(source, ignoreIdAttribute) {
    var strings = [];
    function onstring(first, second) {
      var string = first.trim();
      if (second) {
        string = (ignoreIdAttribute && (string === "id")) ? "" : second.trim();
      }
      if (string) {
        strings.push(string);
      }
    }
    // Parse and import
    var parser = new htmlparser2.Parser({
      ontext: onstring,
      oncomment: onstring,
      onattribute: onstring
    });
    parser.write(source);
    parser.end();
    // Return result
    var result = strings.join("\n");
    if (result.trim() === source.trim()) {
      return null;
    }
    return result;
  }

  // Generate JSON content view
  function viewJsonContent(source) {
    try {
      var json = JSON.parse(source);
      // Visit each value
      var values = [];
      _.cloneDeep(json, function extract(value) {
        if (!_.isNumber(value) && !_.isBoolean(value) && !_.isObject(value)) {
          values.push(value);
        }
      });
      // Return result
      return _(values)
        .uniq()
        .sort()
        .valueOf()
        .join("\n");
    } catch (ex) {
      return null;
    }
  }

  // Generate JavaScript content view
  function viewJavaScriptContent(source) {
    try {
      // Parse
      var parse = espree.parse(source, {
        comment: true,
        tolerant: true
      });
      // Visit all nodes and comments
      var strings = [];
      visitAllNodes(parse, strings);
      parse.comments.forEach(function handleComment(comment) {
        strings.push(comment.value.trim());
      });
      return strings.join("\n");
    } catch (ex) {
      return null;
    }
  }

  // Generate Markdown content view
  function viewMarkdownContent(source) {
    var html = marked(source);
    return _.unescape(viewHtmlContent(html, true));
  }

  // Handle file open
  _model.onFileOpen = function onFileOpen(data, evt) {
    if (evt.target && evt.target.files) {
      loadText(evt.target.files[0]);
    }
  };

  // Handle text change
  function onTextChange(newText) {
    if (!_updating) {
      _text = newText;
    }
  }

  // Handle view change
  function onViewChange(newView) {
    var newText = _text;
    switch (_model.views.indexOf(newView)) {
      case 0:
        // No transform
        break;
      case 1:
        newText = viewUniqueWords(_text);
        break;
      case 2:
        newText = viewHtmlContent(_text);
        break;
      case 3:
        newText = viewJsonContent(_text);
        break;
      case 4:
        newText = viewJavaScriptContent(_text);
        break;
      case 5:
        newText = viewMarkdownContent(_text);
        break;
      default:
        throw new Error("Unexpected view index.");
    }
    if (newText === null) {
      newText = "[Content unsupported by current view]";
    }
    updateText(newText.trim() + "\n");
  }

  // Handle drag-and-drop
  _model.onDragover = function onDragover(data, evt) {
    if (evt.dataTransfer && evt.dataTransfer.dropEffect) {
      evt.dataTransfer.dropEffect = "link";
    }
  };
  _model.onDrop = function onDrop(data, evt) {
    if (evt.dataTransfer && evt.dataTransfer.files) {
      loadText(evt.dataTransfer.files[0]);
    }
  };

  // Handle Help/About
  _model.onHelpAbout = function onHelpAbout() {
    var message = [
      "Welcome to Spell\u2714, a simple app that makes it easy to spell-check with a browser!",
      "",
      "To import text:",
      "\u2022 Paste from the clipboard",
      "\u2022 Drag-and-drop from the file system",
      "\u2022 Open a file (via the button at the top right)",
      "",
      "The view selector (lower-left corner) supports:",
      "\u2022 Original text",
      "\u2022 Unique words (sorted)",
      "\u2022 HTML/XML (text, comments, and attributes)",
      "\u2022 JSON (values only)",
      "\u2022 JavaScript (string literals and comments)",
      "\u2022 Markdown (text)",
      "",
      "Notes:",
      "\u2022 Offline use is supported once the app has been cached by the browser",
      "\u2022 Changes are not saved to the original file; copy/paste any edits you want to keep",
      "\u2022 Browsers that support the forceSpellCheck API automatically highlight spelling errors",
      "\u2022 Internet Explorer highlights automatically if you type in the text box before loading",
      "\u2022 Chrome highlights automatically because of a selection hack",
      "\u2022 Firefox highlights automatically"
  ];
    loadText(message.join("\n"));
    return false;
  };

  // Subscriptions
  _model.text.subscribe(function textChange(newText) {
    onTextChange(newText);
  });
  _model.selectedView.subscribe(function viewChange(newView) {
    onViewChange(newView);
  });

  // Apply bindings
  ko.applyBindings(_model, document.getElementsByTagName("body")[0]);
}());
