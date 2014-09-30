'use strict';

var xml2js = require('xml2js');
var logger = require('./logger.js')();
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

// will return default settings if no
// arg is passed
function parserConfig(options) {
    if (!options) {
        logger('info', 'No args passed, returning default settings..\n');
        return {
            trim: true,
            normalizeTags: true,
            ignoreAttrs: true,
            tagNameProcessors: [formatTagName]
        };
    } else {
        logger('info', 'Received Parser config, setting Parser rules..\n');
        return options;
    }
}

/**
 * Main fn of module, takes object of parser settings
 * returns a new intstantiation of a parser
 */
function initParser(parserOpts) {

    if (!parserOpts) {
        parserOpts = null;
    }

    logger('info', 'Xml Parser has been called..\n');

    config = parserConfig(parserOpts);

    return new xml2js.Parser(config);
}

module.exports = initParser;