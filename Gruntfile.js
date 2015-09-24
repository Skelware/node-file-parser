module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-exec');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                config: '.eslintrc'
            },
            target: ['src/', 'spec/']
        },

        yuidoc: {
            compile: {
                options: {
                    paths: 'src/',
                    outdir: 'docs/'
                }
            }
        },

        exec: {
            jasmine: {
                cmd: 'npm test'
            }
        }
    });

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('test', ['exec:jasmine']);
    grunt.registerTask('doc', ['yuidoc']);

    grunt.registerTask('default', ['test', 'lint', 'doc']);
};
