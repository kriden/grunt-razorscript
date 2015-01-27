/*
 * grunt-razorscript
 * https://github.com/kriden/grunt-razorscript
 *
 * Copyright (c) 2015 Kristof De Nolf
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
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    razorscript: {
        options: {
          models: 'test/fixtures/models.json'
        },
        build: {
          files: {
            'test/result/result.html': 'test/fixtures/source.html',
            'test/result/result2.html': 'test/fixtures/source2.html'
          }
        }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'razorscript']);

};
