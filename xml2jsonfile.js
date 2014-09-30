/**
 * @module xmlFile2jsonFile
 * @author Colúm Bennett
 * @description Module will recursively search through project file tree for an `xml` directory. It will then create an array of absolute paths for all
 * `.xml` files found in the `xml` directory. The module then loops through the returned path array, reading each `xml` file associated with the given path, formating
 * the tag names if required and parsing to `json` string using xml2js node module. This module will then write each `json` string to a file using same filename as orignial
 * `xml` file, to a default `json` directory at root of project.
 */

'use strict';

var fs = require('fs');
var _ = require('underscore');
var logger = require('./util/logger.js')();
var finder = require('./util/finder.js');
var parser = require('./util/parser.js')();
var EventEmitter = require('events').EventEmitter;

var e = new EventEmitter();
var returnArray = false;
var numOfFiles = 0;
var JSON_ARRAY = {};

/**
 * @function getFileName
 * @desc Removes directory and suffix from file path and returns formated name.
 * @param {String} filePath Path to xml files located in xml directory.
 * @returns {String} fileName formated file name.
 */
function getFileName(filePath) {
    var dotIndex = filePath.indexOf('.');
    var lastSlash = _.lastIndexOf(filePath, '/');
    var name = filePath.substring((lastSlash + 1), dotIndex);
    return name;
}

// add item to dynamic assoc array
function buildAssocArray(key, val, count) {
    JSON_ARRAY[key] = JSON.parse(val);

    // emit event when last parsed
    // file has been added to array
    if (count === numOfFiles) {
        e.emit('Array Ready');
    }
}

/**
 * @function writeJsonFile
 * @desc Writes data to single file to a specified directory
 * @param {String} dir Name of output directory to write file to.
 * @param {String} name Name of file minus original extension name.
 * @param {String} ext New file extension of output file.
 * @param {String} data Stringified JSON data to write to output file.
 */
function writeFile(dir, name, ext, data) {
    fs.writeFile(dir + name + ext, data, function(err) {
        if (err) {
            logger('error', 'Error writing ' + name + ext + ' file.\n');
        }
        logger('info', name + ext + ' has been saved!\n');
    });
}

/**
 * @function createOutputFiles
 * @desc Checks for existence of output directory to write files to.
 * If none creates directory specified. If no directory named fn creates
 * default json at root of project file tree.
 * @param {String} dir Name of output directory to write file to.
 * @param {String} fileName Name of file minus original extension name.
 * @param {String} ext New file extension of output file.
 * @param {String} data Stringified JSON data to write to output file.
 */
function createOutputFiles(dir, fileName, ext, data) {
    // check output directory exists
    // if not create directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, '0777');
    }
    writeFile(dir, fileName, ext, data);
}

/**
 * @function parser
 * @desc Main function, takes array of xml filePaths, loops
 * through array and reads each files data parsing from `xml` to
 * `json` string. The passes stringified data to output handler functions.
 * @param {Array} filePaths Array of strings containing absolute file paths.
 */
function filesParser(filePaths) {

    // // parse a single xml file
    function parseFile(path, counter) {
        var fileName = getFileName(path);
        var fileData = fs.readFileSync(path, 'ascii');
        var parsedData = null;

        parser.parseString(fileData.substring(0, fileData.length), function(err, result) {

            // if normal xml
            if (!result['envelope']) {
                parsedData = JSON.stringify(result, null, 2);
            } else {
                var raw = result['envelope'];
                var body = raw['body'][0];
                parsedData = JSON.stringify(body, null, 2);
            }

            if (returnArray) {
                buildAssocArray(fileName, parsedData, counter);
            } else {
                createOutputFiles('./json/', fileName, '.json', parsedData);
            }
        });
    }

    // some defensive checking
    if (filePaths.length > 1) {
        // iterate over array and
        // pass xml file path to
        // parsing fn
        var count = 0;
        _.each(filePaths, function(path) {
            count++;

            try {
                parseFile(path, count);
            } catch (e) {
                logger('error', 'Unable to read file ' + path + '.\n');
            }
        });
    } else {
        //  parse file passed via CLI
        filesParser(filePaths);
    }
}

/**
 * @function init
 * @desc exported function bringing all functionality together to create output files
 */
function init(extType, callback) {

    // set default extension if
    // not specified
    extType = extType || '.xml';

    // if callback passed return parsed data
    // in form of object of objects
    if (callback && typeof callback === 'function') {
        logger('info', 'callback has been detected, returning Assoc array of results.\n');
        returnArray = true;

        // return array once last file parsed
        e.on('Array Ready', function() {
            return callback(JSON_ARRAY);
        });

        // search for files with extension
        finder(extType, function(filePathsArr) {
            if (filePathsArr.length === 0) {
                logger('error', 'No xml files have been found.\n');
                return false;
            }

            // control var used to emit event
            // when last file parsed
            numOfFiles = filePathsArr.length;

            filesParser(filePathsArr);
        });
    } else {
        // no callback passed
        finder(extType, function(filePathsArr) {
            if (filePathsArr.length === 0) {
                logger('error', 'No xml files have been found.\n');
                return false;
            }

            filesParser(filePathsArr);
        });
    }
}

module.exports = init;