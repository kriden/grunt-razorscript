/*
 * grunt-razorscript
 * https://github.com/kriden/grunt-razorscript
 *
 * Copyright (c) 2015 Kristof De Nolf
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('razorscript', 'Grunt plugin used to render razor templates', function() {
    // modelRegex
    var modelRegex = /(\n?)([ |\t]*)<!--\(\s?razor-model\s+([\w\/.\-]+)\s?([^>]*)\)-->/g;
    var modelsUsed = {};

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      models: ''
    });

    if(grunt.file.exists(options.models)) {
      modelsUsed = grunt.file.readJSON(options.models);
      grunt.log.warn('Loaded used models..');
    } else {
      grunt.log.warn('No models file found, please supply one...');
    }

    this.files.forEach(function(file) {
      var src = file.src;
      var dest = file.dest;

      grunt.log.ok('source: '+src);
      grunt.log.ok('source: '+dest);

      var srcContent = grunt.file.read(file.src);
      var razor = require('razorscript');
      var model = modelsUsed.testNewsItem;
      var viewEngine = new razor.ViewEngine();
      var destContent = viewEngine.renderView(src, model);

      grunt.file.write(dest, destContent);

      // get model from regex
      grunt.log.warn(srcContent);
    });
  });

};
