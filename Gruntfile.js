/*
 * Kendo-UI-Template
 * 
 *
 * Copyright (c) 2013 Adam Sanderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },
    // Configuration to be run (and then tested).
    filetostring: {      
      trim_options: {
        options: {
          trim: true
        },
        files: {
           'tmp/trim_options': ['test/fixtures/whitespace']
        }
      },
      notrim_options: {
        options: {
          trim: false
        },
        files: {
           'tmp/notrim_options': ['test/fixtures/whitespace']
        }
      },
      no_options: {        
        files: {
           'tmp/no_options': ['test/fixtures/multiline']
        }
      },
      seperator_options: {  
        options: {
          seperator: ', '
        },      
        files: {
           'tmp/seperator_options': ['test/fixtures/multiline']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'filetostring', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
