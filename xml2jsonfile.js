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
// var xml2js = require('xml2js');
var _ = require('underscore');
var logger = require('./util/logger.js')();
var finder = require('./util/finder.js');
var parser = require('./util/parser.js')();

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
            logger('error', 'Error writing ' + ext + ' file', err);
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
    var name = getFileName(fileName);

    // check output directory exists
    // if not create directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, '0777');
    }
    writeFile(dir, name, ext, data);
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
    function parseFile(path) {
        var fileData = fs.readFileSync(path, 'ascii');
        var data = null;

        parser.parseString(fileData.substring(0, fileData.length), function(err, result) {
            // if normal xml
            if (!result['envelope']) {
                data = JSON.stringify(result, null, 2);
            } else {
                var raw = result['envelope'];
                var body = raw['body'][0];
                data = JSON.stringify(body, null, 2);
            }
            createOutputFiles('./json/', path, '.json', data);
        });
    }

    // some defensive checking
    if (filePaths instanceof Array) {
        // iterate over array and
        // pass xml file path to
        // parsing fn
        _.each(filePaths, function(path) {
            try {
                parseFile(path);
            } catch (e) {
                logger('error', 'Unable to read file ' + path);
                logger('error', e);
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
function init() {
    finder('.xml', function(filePathsArr) {
        if (filePathsArr.length === 0) {
            logger('info', 'No xml files have been found.');
            return false;
        }
        filesParser(filePathsArr);
    });
}

module.exports = init;