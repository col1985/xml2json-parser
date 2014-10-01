   'use strict';

   var exec = require('child_process').exec;
   var path = require('path');
   var fs = require('fs');
   var _ = require('underscore');
   var chai = require('chai');
   var assert = chai.assert;

   describe('xml2jsonfile module ::', function() {

       // we use child process to excute parser via CLI
       it('should start parse sample xml files', function(done) {
           exec('node index.js', function(err, stdout, stderr) {
               if (err) {
                   return done(err);
               } else {
                   done();
               }
           });
       });

       // then check for JSON dir using fs
       it('should check if json directory exists', function(done) {
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
       it('should check if only .json files exist in directory', function(done) {
           var jsonFilePaths = fs.readdirSync('./json');

           _.each(jsonFilePaths, function(file) {
               if (path.extname(file) !== '.json') {
                   var err = new Error('.json file extension cannot be found.');
                   return done(err);
               }
           });

           done();
       });
   });

    // describe('custom finder module', function() {

    //     var result;

    //     beforeEach(function(done) {
    //         var finder = require('./../util/finder.js');
    //         finder('.xml', function(filePaths) {
    //             result = filePaths;
    //             done();
    //         });
    //     });

    //     it('should return empty array', function(done) {

    //         assert.equal(result.length, 0, 'Empty array returned');

    //         // expect(result).to.be.an(Array);
    //         // expect(result).to.be.empty();
    //         // done();

    //     });

    //     // it('should return array of xml filePaths found in project', function(done) {
    //     //     finder('.xml', function(result) {
    //     //         if (result instanceof Array && result.length > 0) {
    //     //             done();
    //     //         }
    //     //     });
    //     // });
    // });

    // describe('parser.js module :: ', function() {

    //     var testParser = require('./../util/parser.js')();

    //     it('instanceof parser.js module is defined.', function(done) {
    //         assert.isDefined(testParser, 'Parser is defined');
    //         done();
    //     });

    //     it('should parse xml file to json', function(done) {

    //         done();
    //     });

    //     // it('', function(done) {

    //     // });

    //     // it('', function(done) {});
    // });