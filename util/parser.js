module.exports = function() {

    'use strict';

    var xml2js = require('xml2js');
    var logger = require('./logger.js');
    var config = {};

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

    function parserConfig(options) {
        if (!options) {
            config = {
                trim: true,
                normalizeTags: true,
                ignoreAttrs: true,
                tagNameProcessors: [formatTagName]
            };
        } else {
            return options;
        }
    }

    // try {
    //     config = parserConfig();
    // } catch (e) {
    //     logger('error', '');
    // }


    // instantciate parser
    // return function() {
    //     // config = parserConfig()
    //     // new xml2js.Parser(config);
    // }
};
