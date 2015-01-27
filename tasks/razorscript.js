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

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            models: ''
        });

        if (grunt.file.exists(options.models)) {
            modelsUsed = grunt.file.readJSON(options.models);
            grunt.log.ok('Loaded models file');
        } else {
            grunt.log.warn('No models file found, please supply one...');
        }

        this.files.forEach(function (file) {
            var src = file.src;
            var dest = file.dest;

            // fetch model from razor comment
            var contents = grunt.file.read(file.src[0]);
            var matches = modelRegex.exec(contents);
            if (matches !== null) {
                var modelName = matches[2];
                var model = modelsUsed[modelName];
                contents = contents.replace(matches[0], '');
            } else {
                grunt.log.warn('No model definition found in file ' + src);
                var model = {};
            }

            var razor = require('razorscript');
            var viewEngine = new razor.ViewEngine();
            var destContent = viewEngine.renderView(file.src[0], model);

            grunt.file.write(file.dest, destContent);
            grunt.log.ok('Rendered ' + file.dest);
        });
    });

};
