// #!/usr/bin/env node

// var logger = require('./util/logger.js')();s

// function commandHandler() {
//     var cmd = process.argv;
//     cmd.shift();
//     cmd.shift();

//     logger('debug', 'cmd: ', cmd);
// }

// commandHandler();
// logger('info', 'current dir: ', __dirname);
// logger('info', 'current file: ', __filename);


// // var program = require('commander');
var init = require('./xml2jsonfile.js');

init();
// init('.xml', function(dataArr) {
//     logger('info', 'Hello from index');
//     logger('debug', JSON.stringify(dataArr, null, 2));
// });

// // program
// //     .version('0.0.5')
// //     .usage('<keywords>')
// //     .parse(process.argv);

// // if (!program.args.length) {
// //     program.help();
// // } else {
// // var filePath = process.cwd() + '/' + process.argv[2];

// // console.log('Keywords: ' + program.args);
// // console.log('\npath: ' + filePath.toString());
// xml2jsonfile();

// // }