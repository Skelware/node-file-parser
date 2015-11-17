module.exports = function(grunt) {
    'use strict';

    var fse = require('fs-extra');
    var pkgJson = grunt.file.readJSON('package.json');

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        init: true,
        data: {
            pkg: pkgJson
        },
        loadGruntTasks: {
            config: pkgJson,
            scope: 'devDependencies'
        }
    });

    /**
     * Asserts the codestyle of the source code.
     *
     * @task lint
     * @runs eslint
     */
    grunt.registerTask('lint', ['eslint']);

    /**
     * Generates documentation for the source code.
     *
     * @task doc
     * @runs yuidoc
     */
    grunt.registerTask('doc', ['yuidoc']);

    /**
     * Runs all unit tests defined by the specification.
     *
     * @task unit
     * @runs jasmine_node
     */
    grunt.registerTask('unit', function() {
        fse.copySync('fixtures/', 'data/', {
            clobber: true
        });

        grunt.task.run(['jasmine_node']);
    });

    /**
     * Combines the lint and unit tasks to create a full test suite.
     *
     * @task test
     * @runs lint
     * @runs unit
     */
    grunt.registerTask('test', ['lint', 'unit']);

    /**
     * The default Grunt operation combines the test and doc tasks.
     *
     * @task default
     * @runs test
     * @runs doc
     */
    grunt.registerTask('default', ['test', 'doc']);
};
