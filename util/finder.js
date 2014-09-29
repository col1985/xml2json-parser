'use strict';

var finder = require('findit')(process.argv[2] || '.');
var path = require('path');
var logger = require('./logger.js');

/**
 * [getFilePaths function recursively searchs through directory tree for extension
 * param passed. If successful returns an array of file paths. Otherwise, returns an
 * empty array]
 * @param  {String}   ext  file extension to search directory tree for
 * @param  {Function} callback return file path array
 */
function getFilePaths(ext, callback) {

    var filePaths = [];

    // set default extension
    ext = ext || '.xml';

    // ensure callback is a function
    // if (typeof callback() !== typeof Function) {
    // throw new Error('callback must be a function');
    // }

    // search for directory labeled xml
    finder.on('directory', function(dir, stat, stop) {
        if (dir === 'node_modules' || dir === '.git') {
            stop();
        }
    });

    // log out file path of xml file
    // and push to return array
    finder.on('file', function(file) {
        if (path.extname(file) === ext) {
            logger('info', ext + ' file path has been found :: ' + file + '\n');

            // push file path to
            filePaths.push(file);
        }
    });

    // on finder end event return
    // array via callback
    finder.on('end', function() {
        if (filePaths.length > 0) {
            logger('info', 'Returning array of filePaths...');
            return callback(filePaths);
        } else {
            logger('error', 'Oops!! No xml file paths to return...');
            return callback(filePaths);
        }
    });
}

module.exports = getFilePaths;