/**
 * The NodeFileParser is the entry point of this package.
 *
 * @static
 * @class NodeFileParser
 * @module Main
 */
module.exports = (function() {

    /**
     * A list of all parsers.
     *
     * @property parsers
     * @type {Array}
     */
    var parsers = [
        {
            name: 'ini',
            pattern: /\.ini$/i,
            handler: require('./parsers/ini')
        },
        {
            name: 'json',
            pattern: /\.(json)|(js)$/i,
            handler: require('./parsers/json')
        },
        {
            name: 'text',
            pattern: /.*/i,
            handler: require('./parsers/text')
        }
    ];

    /**
     * Links a file to get read and write access to and from that file.
     *
     * @method link
     * @param file {String} The location of the file to link to.
     * @param [type=detected] {String} Force a specific parser for unknown file types.
     * @returns {? extends FileParser} A subclass of FileParser to handle the file if the file's extension is matched,
     * or `null` if the file has an invalid path.
     */
    function link(file, type) {
        if (file == null || file.length === 0 || typeof file !== 'string') {
            return null;
        }

        for (var i = 0; i < parsers.length; i++) {
            var parser = parsers[i];

            if (type ? parser.name === type : parser.pattern.test(file)) {
                var handler = new parser.handler(file);
                handler.name = parser.name;
                return handler;
            }
        }
    }

    return {
        link: link,
        parsers: parsers
    };
}());
