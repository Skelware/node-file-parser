[![Travis-CI](https://travis-ci.org/Skelware/node-file-parser.svg?branch=master)](https://travis-ci.org/Skelware/node-file-parser) [![Code Climate](https://codeclimate.com/github/Skelware/node-file-parser/badges/gpa.svg)](https://codeclimate.com/github/Skelware/node-file-parser/issues) [![Test Coverage](https://codeclimate.com/github/Skelware/node-file-parser/badges/coverage.svg)](https://codeclimate.com/github/Skelware/node-file-parser/coverage)

[![bitHound Score](https://www.bithound.io/github/Skelware/node-file-parser/badges/score.svg)](https://www.bithound.io/github/Skelware/node-file-parser) [![bitHound Code](https://www.bithound.io/github/Skelware/node-file-parser/badges/code.svg)](https://www.bithound.io/github/Skelware/node-file-parser) [![bitHound Dependencies](https://www.bithound.io/github/Skelware/node-file-parser/badges/dependencies.svg)](https://www.bithound.io/github/Skelware/node-file-parser/master/dependencies/npm)

# Node File Parser

The Node File Parser package was initially created to support other packages with their configurations.

It can read and write many different file formats. Being written for use with node.js, it can be used asynchronously or synchronously by choice.

This package contains several parsers and formatters by default, but can easily be extended to read and write any file format that you want.

## Table of contents
* Node File Parser
 * [Documentation](#documentation)
 * [Default file types](#default-file-types)
 * [Custom file types](#custom-file-types)
 * [Contributing](#contributing)
 * [Versioning](#versioning)
 * [Roadmap](#roadmap)

## Documentation
Documentation is automatically regenerated and deployed for all version changes, including patches. View the documentation online [here](http://skelware.github.io/node-file-parser/), or generate it locally by running `grunt doc`.

## Default file types
Abbreviation | File Extensions | Description | Limitations
--- | --- | --- | ---
JSON | .json .js| JavaScript Object Notation | Does not preserve comments.
INI | .ini | Initialization files | Does not preserve comments.
SRT | .srt | SubRip Text | Does not preserve comments.
CSV | .csv | Comma-separated values | Does not preserve comments; <br />Does not support headers and multi-line records.
TXT | .txt | Plaintext | None!

Any file type that is not directly supported will be parsed as text. You could modify this text in your own application, or register a pluggable parser to streamline the process.

## Custom file types
Adding support for a new or custom file type is easy! Let's give an example for a file type called `Swag`, which has the extension `.swg`.

* Create a new FileParser implementation:
```javascript
/**
 * @class swag
 * @module Parsers
 */
var SwagParser = (function() {

    //Note: you will probably have to change the filepath
    var FileParser = require('../interfaces/FileParser');

    /**
     * @method Parser
     * @constructor
     */
    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    /**
     * Encodes any JavaScript object into a Swag string that can be written to a file.
     *
     * @method encode
     * @param [data] {Object} Any JavaScript object to be encoded.
     * @return {String} A valid Swag representation of the data.
     */
    Parser.prototype.encode = function(data) {
        return Swagger.swaggify(data);
    };

    /**
     * Decodes a Swag string to a JavaScript object.
     *
     * @method decode
     * @param [data] The Swag string to be decoded.
     * @returns {Object} An Object with the decoded data, or an empty object if something went wrong.
     */
    Parser.prototype.decode = function(data) {
        var result;
        try {
            var temp = Swagger.parse(data);
            result = temp;
        } catch (exception) {
            result = {};
        }
        return result;
    };

    return Parser;
}());
```

* Register the extension:
```javascript
var swag = {
    name: 'swag',
    pattern: /\.swg$/i,
    Handler: SwagParser
};
NodeFileParser.parsers.push(swag);
```

* Use the extension:
```javascript
var file = NodeFileParser.link('./data/glasses.swg');
var content = file.read().getContent();
```

## Contributing
Whether you're a programmer or not, all contributions are very welcome! You could add features, improve existing features or request new features. Assuming the unit tests cover all worst-case scenarios, you will not be able to report bugs because there will be no bugs.

If you want to make changes to the source, you should fork this repository and create a pull-request to our master branch. Make sure that each individual commit does not break the functionality, and contains new unit tests for the changes you make.

To test your changes locally, run `npm install` followed by `npm test`. All files that you added or changed must score 100% coverage in its statements, branches, functions and lines. You will also have to [sign](https://www.clahub.com/agreements/Skelware/node-file-parser) the [Contributor License Agreement](https://www.clahub.com/pages/why_cla), which will take a minute of your time but ensures that neither of us will sue the other.

## Versioning
As much as we want everyone to always use the latest version, we know that this is a utopia. Therefore, we adhere to a strict versioning system that is widely accepted: `major.minor.patch`. This is also known as the [SemVer](http://semver.org/spec/v2.0.0.html) method.

## Roadmap
Our roadmap is only a map, which is open to interpretation. However, the following features and/or tasks are in the pipeline:
* v3.0.0 A complete overhaul of the way files are parsed;
* v3.0.1 A complete overhaul of the way unit tests are created;
* v3.1.0 A command-line interface (CLI) to allow easy automation of tasks;
* v3.2.0 Support for the conversion of a file's format to another format;
* v3.3.0 Support for internationalization files such as `.po` and `.pot`;
* v3.4.0 Generalized support for XML-based file formats such as `.xml`, `.html`, and `.xlsx`;
* v3.5.0 Dedicated support for OOXML-based file formats such as `.xlsx` and `.xltx`;
* v3.6.0 Dedicated support for HTML-based file formats such as `.html` and `.shtml`;
* v6.6.6 Wereldheerschappij, Weltherrschaft, мировое господство.
