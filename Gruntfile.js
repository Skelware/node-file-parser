module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    var fse = require('fs-extra');

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

        jasmine_node: {
            src: ['src/**/*.js'],
            options: {
                match: '.',
                extensions: 'js',
                specNameMatcher: 'spec',
                matchAll: false,
                isVerbose: true,
                forceExit: true,
                showColors: true,
                includeStackTrace: true,
                captureExceptions: true,
                specFolders: ['spec'],

                junitreport: {
                    report: false,
                    consolidate: true,
                    useDotNotation: true,
                    savePath: './build/reports/jasmine/'
                },

                coverage: {
                    relativize: true,
                    print: 'both', // none, summary, detail, both
                    reportDir: 'coverage',
                    reportFile: 'coverage.json',
                    excludes: [],
                    report: ['lcov'],
                    collect: ['*coverage.json'],
                    thresholds: {
                        statements: 0,
                        branches: 0,
                        lines: 0,
                        functions: 0
                    }
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
    grunt.registerTask('doc', ['yuidoc']);
    grunt.registerTask('unit', ['jasmine_node']);
    grunt.registerTask('default', ['test', 'doc']);
    grunt.registerTask('test', function() {
        fse.copySync('fixtures/', 'data/', {
            clobber: true
        });
        grunt.task.run(['lint', 'unit']);
    });
};
