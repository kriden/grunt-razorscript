/*
 * grunt-razorscript
 * https://github.com/kriden/grunt-razorscript
 *
 * Copyright (c) 2015 Kristof De Nolf
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('razorscript', 'Grunt plugin used to render razor templates', function () {
        // modelRegex
        var modelRegex = /\@\*(.*)model=([a-zA-Z]+)(.*)\*\@/
        var modelsUsed = {};        // model objects listed in models.json
        var defaults,helpers;

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            models: '',
            defaults: 'assets/template_defaults.html',
            helpers: 'assets/helpers.html'
        });

        // Load all optional files (models, defaults, helpers)
        if (grunt.file.exists(options.models)) {
            modelsUsed = grunt.file.readJSON(options.models);
            grunt.log.ok('Loaded models file');
        } else {
            grunt.log.warn('No models file found, please supply one...');
        }

        if(grunt.file.exists(options.defaults)) {
            defaults = grunt.file.read(options.defaults);
        }

        if(grunt.file.exists(options.helpers)) {
            helpers = grunt.file.read(options.helpers);
        }

        // Process files
        this.files.forEach(function (file) {
            var src = file.src;
            grunt.log.ok('Processing '+src[0]);

            // Fetch model from razor comment
            var contents = grunt.file.read(file.src[0]);
            var matches = modelRegex.exec(contents);
            if (matches !== null) {
                var modelName = matches[2];
                var model = modelsUsed[modelName];
            } else {
                grunt.log.warn('No model definition found in file ' + src);
                var model = {};
            }

            // Merge all into one file for processing
            var tmpContent = defaults+contents+helpers;
            var tmpFile = 'tmp/'+file.src
            grunt.file.write(tmpFile, tmpContent);

            // Rendering razor template
            grunt.log.ok('Rendering '+tmpFile);
            var razor = require('razorscript');
            var viewEngine = new razor.ViewEngine();
            var destContent = viewEngine.renderView(tmpFile, model);

            grunt.file.write(file.dest, destContent);
            grunt.log.ok('Rendered ' + file.dest);
        });
    });

};
