#! /usr/bin/env node

import path from 'path';
import program from 'commander';
import NodeFileParser from './NodeFileParser';

const pkg = require('./../package.json');

program
    .version(pkg.version)
    .option('-v, --verbose', 'Enable verbose logging to debug', () => {
        NodeFileParser.setConfiguration({verbose: true});
    })
    .option('-c, --config <path>', 'A path to a configuration file', (relative) => {
        const absolute_path = path.resolve(process.cwd(), relative);
        const config = require(absolute_path);
        NodeFileParser.setConfiguration(config);
    }).parse(process.argv);

program
    .command('validate <src>')
    .description('Validate a file against conventional rules')
    .action((src, options) => {
        const result = NodeFileParser.validate(src, options);
    }).parse(process.argv);
