"use strict";

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    browserify: {
      default: {
        files: {
          "../node_modules.js": [
            "./browserify-requires.js"
          ]
        }
      }
    },

    clean: {
      files: ["../knockout-*js", "../lodash.*js", "../node_modules.*js"],
      options: {
        force: true
      }
    },

    "curl-dir": {
      "..": [
        // http://knockoutjs.com/
        "http://knockoutjs.com/downloads/knockout-3.3.0.js",
        "http://knockoutjs.com/downloads/knockout-3.3.0.debug.js",
        // https://lodash.com/
        "https://raw.github.com/lodash/lodash/3.6.0/lodash.min.js",
        "https://raw.github.com/lodash/lodash/3.6.0/lodash.js"
      ]
    },

    eslint: {
      files: [
        "../default.js",
        "../Gruntfile.js"
      ]
    },

    uglify: {
      default: {
        files: {
          "../node_modules.min.js": [
            "../node_modules.js"
          ]
        }
      }
    },

    watch: {
      default: {
        files: [
          "../default.js",
          "../Gruntfile.js"
        ],
        tasks: [
          "eslint"
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-curl");
  grunt.loadNpmTasks("grunt-eslint");

  grunt.registerTask("default", ["browserify", "curl-dir", "uglify", "eslint"]);
};
