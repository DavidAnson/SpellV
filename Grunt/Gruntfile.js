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
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-eslint");

  grunt.registerTask("default", ["browserify", "uglify", "eslint", "watch"]);
};
