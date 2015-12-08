[![Travis-CI](https://travis-ci.org/Skelware/node-file-parser.svg?branch=master)](https://travis-ci.org/Skelware/node-file-parser) [![Code Climate](https://codeclimate.com/github/Skelware/node-file-parser/badges/gpa.svg)](https://codeclimate.com/github/Skelware/node-file-parser/issues) [![Test Coverage](https://codeclimate.com/github/Skelware/node-file-parser/badges/coverage.svg)](https://codeclimate.com/github/Skelware/node-file-parser/coverage)

[![bitHound Score](https://www.bithound.io/github/Skelware/node-file-parser/badges/score.svg)](https://www.bithound.io/github/Skelware/node-file-parser) [![bitHound Dependencies](https://www.bithound.io/github/Skelware/node-file-parser/badges/dependencies.svg)](https://www.bithound.io/github/Skelware/node-file-parser/master/dependencies/npm) [![codecov.io](https://codecov.io/github/Skelware/node-file-parser/coverage.svg?branch=master)](https://codecov.io/github/Skelware/node-file-parser?branch=master)

# Node File Parser

The Node File Parser package was initially created to support other packages with their configurations.

It can read and write many different file formats. Being written for use with node.js, it can be used asynchronously or synchronously by choice.

This package contains several parsers and formatters by default, but can easily be extended to read and write any file format that you want.

## Table of contents
* Node File Parser
 * [Default file types](#default-file-types)
 * [Custom file types](#custom-file-types)
 * [Contributing](#contributing)
 * [Versioning](#versioning)
 * [Roadmap](#roadmap)

## Default file types
Abbreviation | File Extensions | Description | Limitations
--- | --- | --- | ---
JSON | .json .js| JavaScript Object Notation | Does not preserve comments.
INI | .ini | Initialization files | Does not preserve comments.
SRT | .srt | SubRip Text | Does not preserve comments.
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
We seem to have lost our map, so we don't know where we will end up next... but we do know what we still want to do! The following list is in no particular order and probably also does not contain all of our goals, but a roadmap is cool to have.
* `.csv` support;
* `.xml` (and thus `.html`) support;
* A command-line interface `nfp`;
* Conversion from one file format to any other file format;
* World domination.
