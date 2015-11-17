/**
 * The FileParer class is an abstract class that need to be extended.
 * If this class is used directly, it will return the contents of a file without parsing them.
 *
 * @class FileParser
 * @module Main
 */
module.exports = (function() {

    var fs = require('fs');

    /**
     * Creates a new FileParser.
     *
     * @method FileParser
     * @param file {String} The location of the file.
     * @constructor
     */
    function FileParser(file) {
        this._file = file;
    }

    FileParser.prototype = Object.create(Object.prototype);
    FileParser.prototype.constructor = FileParser;

    /**
     * Gets the file, but not the content.
     *
     * @method getFile
     * @returns {String} The file location that was supplied to the constructor.
     */
    FileParser.prototype.getFile = function() {
        return this._file;
    };

    /**
     * Gets the (cached) parsed content of the file, when it was last read.
     *
     * @method getContent
     * @returns {String|Object} The content of the file, after being parsed by the subclass.
     */
    FileParser.prototype.getContent = function() {
        return this._content;
    };

    /**
     * Gets the (cached) raw content of the file, when it was last read.
     *
     * @method getRawContent
     * @returns {String} The content of the file, without being parsed.
     */
    FileParser.prototype.getRawContent = function() {
        return this._raw;
    };

    /**
     * Sets the content of this file, but does not yet write to the file.
     *
     * @method setContent
     * @param [content] {Object}
     * @chainable
     */
    FileParser.prototype.setContent = function(content) {
        this._content = content;
        return this;
    };

    /**
     * Reads the file into the current raw content and then parses it.
     *
     * @method read
     * @param callback
     * @chainable
     */
    FileParser.prototype.read = function(callback) {
        if (callback) {
            var listener = function(error, data) {
                this._raw = data || '';
                var response = callback(this.decode(this._raw));

                if (response !== false) {
                    this._content = response || data;
                }
            }.bind(this);

            fs.readFile(this._file, 'utf8', listener);
        } else {
            this._raw = fs.readFileSync(this._file, 'utf8') || '';
            this._content = this.decode(this._raw);
        }
        return this;
    };

    /**
     * Writes or updates the file with the current parsed content.
     *
     * @method write
     * @chainable
     */
    FileParser.prototype.write = function() {
        var output = this.encode(this._content);
        fs.writeFileSync(this._file, output, 'utf-8');
        return this;
    };

    /**
     * Adds a callback function to the parser, so that each entry can be modified to tailor specific needs.
     * Only one callback can be active at any given time.
     *
     * @method modify
     * @param [watcher] {Function} The callback that should be called by the parser,
     * or `undefined` if the callback should be cleared.
     * @chainable
     */
    FileParser.prototype.modify = function(watcher) {
        this._watcher = watcher;
        return this;
    };

    /**
     * Encodes the data, turning an Object into a String that can be written to a file.
     *
     * @method encode
     * @param [data] {Object|String}
     * @returns {String}
     */
    FileParser.prototype.encode = function(data) {
        return data;
    };

    /**
     * Decodes the data, turning a String that is read from a file to an Object usable by JavaScript.
     *
     * @method decode
     * @param [data] {String}
     * @returns {Object|String}
     */
    FileParser.prototype.decode = function(data) {
        return this._watcher ? this._watcher(data) : data;
    };

    return FileParser;
}());
