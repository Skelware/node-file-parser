module.exports = (function() {

    var fs = require('fs');
    var NodeFileParser = require('../NodeFileParser');

    function FileParser(file) {
        this._file = file;
    }

    FileParser.prototype = Object.create(Object.prototype);
    FileParser.prototype.constructor = FileParser;

    FileParser.prototype.getFile = function() {
        return this._file;
    };

    FileParser.prototype.getContent = function() {
        return this._content;
    };

    FileParser.prototype.getRawContent = function() {
        return this._raw;
    };

    FileParser.prototype.setContent = function(content) {
        this._content = content;
        return this;
    };

    FileParser.prototype.read = function(callback) {
        if (callback) {
            var listener = function(error, data) {
                this._raw = data;
                var response = callback(this.decode(this._raw));

                if (response !== false) {
                    this._content = response || data;
                }
            }.bind(this)

            fs.readFile(this._file, 'utf8', listener);
        } else {
            this._raw = fs.readFileSync(this._file, 'utf8');
            this._content = this.decode(this._raw);
        }
        return this;
    };

    FileParser.prototype.write = function() {
        var output = this.encode(this._content);
        fs.writeFileSync(this._file, output, 'utf-8');
        return this;
    };

    FileParser.prototype.modify = function(watcher) {
        this._watcher = watcher;
        return this;
    };

    FileParser.prototype.encode = function(data) {
        return data;
    };

    FileParser.prototype.decode = function(data) {
        return data;
    };

    return FileParser;
}());
