/**
 * @module Xml-Parser
 * @author Colúm Bennett
 * @description Module will recursively search through project file tree for `xml` directory. It will then create an array of absolute paths for all
 * `xml` files found in that directory. The module then loops through the path array, reading each xml file associated with the given path, formating
 * the tag names and parsing to `json` using xml2js mode module. This module will then write each json string to a file using same filename as orignial
 * xml, to a default `json` directory at root of project.
 */

(function () {

    'use strict';

    var fs = require('fs');
    var xml2js = require('xml2js');
    var finder = require('findit')(process.argv[2] || '.');
    var path = require('path');
    var _ = require('underscore');

    /**
     * @function getXmlFilePaths
     * @desc function recursively searchs for a directory labelled xml,
     * then checks for `.xml` files and returns array of each file path.
     * @param {method} callback method containing array of path return once criteria has been statisfied.
     * @returns {method} callback returns array of xml file paths.
     */
    var getXmlFilePaths = function (callback) {
        var xmlFilePaths = [];

        // search for directory labeled xml
        finder.on('directory', function (dir, stat, stop) {
            if (dir === 'node_modules' || dir === '.git') {
                stop();
            } else if (dir === 'xml') {
                console.log('Directory :: ' + dir + '/\n');
            }
        });

        // log out file path of xml file
        // and push to return array
        finder.on('file', function (file) {
            if (path.extname(file) == '.xml') {
                console.log('Xml file found :: ' + file + '\n');

                // push file path to
                xmlFilePaths.push(file);
            }
        });

        // on finder end event return
        // array via callback
        finder.on('end', function () {
            if (xmlFilePaths.length > 0) {
                return callback(xmlFilePaths);
            } else {
                console.log('Oops!! No xml file paths to return.');
            }
        });
    };

    /**
     * @function getFileName
     * @desc Removes directory and suffix from file path and returns formated name.
     * @param {String} filePath Path to xml files located in xml directory.
     * @returns {String} fileName formated file name.
     */
    var getFileName = function (filePath) {
        var dotIndex = filePath.indexOf('.');
        var name = filePath.substring(4, dotIndex);
        return name;
    };

    /**
     * @function writeJsonFile
     * @desc Writes data to single file to a specified directory
     * @param {String} dir Name of output directory to write file to.
     * @param {String} name Name of file minus original extension name.
     * @param {String} ext New file extension of output file.
     * @param {String} data Stringified JSON data to write to output file.
     */
    var writeJsonFile = function (dir, name, ext, data) {
        fs.writeFile(dir + name + ext, data, function (err) {
            if (err) {
                console.log('Error writing json file', err);
            }
            console.log(name + '.json has been saved!\n');
        });
    };

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
    var createOutputFiles = function (dir, fileName, ext, data) {
        var name = getFileName(fileName);
        dir = dir || './json';

        // check output directory exists
        if (fs.existsSync(dir)) {
            writeJsonFile(dir, name, ext, data);
        } else {
            // if not create directory
            fs.mkdirSync(dir, '0777');
            writeJsonFile(dir, name, ext, data);
        }
    };

    /**
     * @function parser
     * @desc Main function, takes array of xml filePaths, loops
     * through array and reads each files data parsing from `xml` to
     * `json` string. The passes stringified data to output handler functions.
     * @param {Array} filePaths Array of strings containing absolute file paths.
     */
    var parser = function (filePaths) {

        // processor function for parser
        // to tidy tag names
        function formatTagName(name) {
            var index = name.indexOf(':');

            if (index !== -1) {
                var tagName = name.substr(index + 1, name.length);
                return tagName;
            } else {
                return name;
            }
        }

        // parse a single xml file
        function parseFile(path) {
            var fileData = fs.readFileSync(path, 'ascii');
            var json = null;

            // instantciate parser
            var parser = new xml2js.Parser({
                trim: true,
                normalizeTags: true,
                ignoreAttrs: true,
                tagNameProcessors: [formatTagName],
            });

            parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                var raw = result['envelope'];
                var body = raw['body'][0];

                json = JSON.stringify(body, null, 2);
                createOutputFiles(path, '', '.json', json);
                // console.log('File ' + path + ' was successfully read, parsed and formated.\n');
            });
        }

        // some defensive checking
        if (!filePaths instanceof Array) {
            return false;
        } else {
            // iterate over array and
            // pass xml file path to
            // parsing fn
            _.each(filePaths, function (path) {
                try {
                    parseFile(path);
                } catch (e) {
                    console.log('Unable to read file ' + path);
                    console.log(e);
                }
            });
        }
    };

    /**
     * @function init
     * @desc exported function bringing all functionality together to create output files
     */
    var init = function () {
        getXmlFilePaths(function (filePaths) {
            parser(filePaths);
        });
    };

    module.exports = init;
})();
