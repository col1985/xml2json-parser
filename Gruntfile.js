module.exports = function(grunt) {

    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: {
                src: ['Gruntfile.js', 'index.js', 'xml2jsonfile.js', '!node_modules']
            }
        },

        lintspaces: {
            javascript: {
                options: {
                    trailingspaces: true,
                    indentation: 'spaces', // defaults to 4
                    ignores: ['js-comments']
                },
                src: ['Gruntfile.js', 'index.js', 'xml2jsonfile.js', '!node_modules']
            }
        },

        shell: {
            mocha: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'mocha test'
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-lintspaces');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['shell:mocha']);

    grunt.registerTask('bump', ['bump']);

    grunt.registerTask('format', ['lintspaces', 'jshint']);

    grunt.registerTask('minify', ['lintspaces', 'jshint', 'uglify']);
};
