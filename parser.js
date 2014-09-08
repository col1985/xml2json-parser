(function () {

    'use strict';

    var fs = require('fs');
    var xml2js = require('xml2js');
    var finder = require('findit')(process.argv[2] || '.');
    var path = require('path');
    var _ = require('underscore');

    // function recursively searchs for a directory
    // labelled xml, then checks for .xml files
    // and returns array of each file path
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
                callback(xmlFilePaths);
            } else {
                console.log('Oops!! No xml file paths to return.');
            }
        });
    };

    // removes directory and extension
    // from file path and returns name
    var formatFileName = function (filename) {
        var dotIndex = filename.indexOf('.');
        var name = filename.substring(4, dotIndex);
        return name;
    };

    // function writes parsed xml json file
    // to json dir at root of project file tree
    var writeJsonToFile = function (filename, data) {
        var name = formatFileName(filename);

        fs.writeFile('./json/' + name + '.json', data, function (err) {
            if (err) {
                console.log('Error writing json file', err);
            }
            console.log(name + '.json has been saved!\n');
        });
    };

    // function takes array of xml filePaths
    // parses to json and creates file
    var parseFiles = function (filePaths) {

        // processor function for parser
        // to tidy tag names
        function formatTagName(name) {
            var index = name.indexOf(':');
            if (index !== -1) {
                var tagName = name.substr(index + 1, name.length);
                return tagName;
            }
        }

        // some defensive checking
        if (!filePaths instanceof Array) {
            return;
        } else {
            // iterate over array and parse
            // xml file to json
            _.each(filePaths, function (path) {
                try {
                    var fileData = fs.readFileSync(path, 'ascii');
                    var json = null;

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
                        writeJsonToFile(path, json);
                    });

                    console.log('File ' + path + '/ was successfully read, parsed and formated.\n');
                } catch (ex) {
                    console.log('Unable to read file ' + path + '.');
                    console.log(ex);
                }
            });
        }
    };

    var init = function () {
        getXmlFilePaths(function (filePaths) {
            parseFiles(filePaths);
        });
    };

    module.exports = init;
})();