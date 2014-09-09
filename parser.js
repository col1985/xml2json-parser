(function () {

    'use strict';

    var fs = require('fs');
    var xml2js = require('xml2js');
    var finder = require('findit')(process.argv[2] || '.');
    var path = require('path');
    var _ = require('underscore');

    // function recursively searchs for a directory
    // labelled xml, then checks for `.xml` files
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

    // removes directory and suffix
    // from file path and returns name
    var formatFileName = function (filename) {
        var dotIndex = filename.indexOf('.');
        var name = filename.substring(4, dotIndex);
        return name;
    };

    var writeJsonFile = function (dir, name, ext, data) {
        fs.writeFile(dir + name + ext, data, function (err) {
            if (err) {
                console.log('Error writing json file', err);
            }
            console.log(name + '.json has been saved!\n');
        });
    };

    // function writes parsed xml json file
    // to json dir at root of project file tree
    var createOutputFiles = function (filename, dir, ext, data) {
        var name = formatFileName(filename);

        // check output directory exists
        if (fs.existsSync(dir)) {
            writeJsonFile(dir, name, ext, data);
        } else {
            //
            fs.mkdirSync(dir, '0777');

            writeJsonFile(dir, name, ext, data);
        }
    };

    // function takes array of xml filePaths
    // parses to json and creates file
    var parser = function (filePaths) {

        // processor function for parser
        // to tidy tag names
        function formatTagName(name) {
            var index = name.indexOf(':');
            if (index !== -1) {
                var tagName = name.substr(index + 1, name.length);
                return tagName;
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
                createOutputFiles(path, './json/', '.json', json);
                console.log('File ' + path + ' was successfully read, parsed and formated.\n');
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

    // bring it all together
    var init = function () {
        getXmlFilePaths(function (filePaths) {
            parser(filePaths);
        });
    };

    module.exports = init;
})();
