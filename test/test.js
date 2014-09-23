var mocha = require('mocha');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var finder = require('findit')(process.argv[2] || '.');

describe('xml2jsonfile module', function () {

    // we use child process to excute parser via CLI
    it('should start parse sample xml files', function (done) {
        exec('node index.js', function (err, stdout, stderr) {
            if (err) {
                return done(err);
            } else {
                done();
            }
        });
    });

    // then check for JSON dir using fs
    it('should check if json directory exists', function (done) {
        var stats = fs.lstatSync('./json');

        if (stats.isDirectory()) {
            // Yes it does exist
            done();
        } else {
            var err = new Error('JSON directory does not exist');
            return done(err);
        }
    });

    // then check for JSON dir using fs
    it('should check if only .json files exist in directory', function (done) {
        var jsonFilePaths = fs.readdirSync('./json');

        _.each(jsonFilePaths, function (file) {
            if (path.extname(file) !== '.json') {
                var err = new Error('.json file extension cannot be found.');
                return done(err);
            }
        });

        done();
    });
});
