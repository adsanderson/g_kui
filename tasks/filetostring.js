/*
 * File To JavaScript String
 * 
 *
 * Copyright (c) 2013 Adam Sanderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('filetostring', 'Your task description goes here.', function() {
    var path = require('path');
 
    var options = this.options({
      namespace: '',
      trim: true
    });
    var namespaceLn;
    var header;
 
    if (options.namespace !== '') {
      namespaceLn = options.namespace + '.';
      header = 'var ' + options.namespace + ' = ' + options.namespace + ' || {};' + grunt.util.linefeed;
    } else {
      namespaceLn = 'var ';
      header = '';
    }
 
    this.files.forEach(function(f) {
      // Concat namespace + specified files.
      var src = header + f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var file = grunt.file.read(filepath);
        var filename = path.basename(filepath, '.html');
        
        if (options.trim) {
          var regExpLineFeed = new RegExp('\\r|' + grunt.util.linefeed, 'gm');
          var regExpSpaceStart = new RegExp('^\\s+|\\^t+', 'gm');
          var regExpSpaceEnd = new RegExp('\\s+$|\\t+$', 'gm'); 
          // clear white space from the begining of each line, the end and remove any carriage returns or linefeeds
          file = file.replace(regExpSpaceStart, '').replace(regExpSpaceEnd, '').replace(regExpLineFeed, '');
        }
        var src = namespaceLn + filename + ' = ' + JSON.stringify(file) + ';';
 
        return src;
      }).join(grunt.util.normalizelf(grunt.util.linefeed));
 
      // Write the destination file.
      grunt.file.write(f.dest, src);
 
      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
 
    });
  });
  //   // Merge task-specific and/or target-specific options with these defaults.
  //   var options = this.options({
  //     punctuation: '.',
  //     separator: ', '
  //   });

  //   // Iterate over all specified file groups.
  //   this.files.forEach(function(f) {
  //     // Concat specified files.
  //     var src = f.src.filter(function(filepath) {
  //       // Warn on and remove invalid source files (if nonull was set).
  //       if (!grunt.file.exists(filepath)) {
  //         grunt.log.warn('Source file "' + filepath + '" not found.');
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }).map(function(filepath) {
  //       // Read file source.
  //       return grunt.file.read(filepath);
  //     }).join(grunt.util.normalizelf(options.separator));

  //     // Handle options.
  //     src += options.punctuation;

  //     // Write the destination file.
  //     grunt.file.write(f.dest, src);

  //     // Print a success message.
  //     grunt.log.writeln('File "' + f.dest + '" created.');
  //   });
  // });

};
