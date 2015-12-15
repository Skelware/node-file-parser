#! /usr/bin/env node

(function NodeFileParserCLI() {

    var program = require('commander');
    var pkg = require('./../package.json');

    program.version(pkg.version).parse(process.argv);
}());
