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
            Handler: require('./parsers/ini')
        },
        {
            name: 'json',
            pattern: /\.(json)|(js)$/i,
            Handler: require('./parsers/json')
        },
        {
            name: 'srt',
            pattern: /\.srt$/i,
            Handler: require('./parsers/srt')
        },
        {
            name: 'csv',
            pattern: /\.csv$/i,
            Handler: require('./parsers/csv')
        },
        {
            name: 'text',
            pattern: /.*/i,
            Handler: require('./parsers/text')
        }
    ];

    /**
     * Links a file to get read and write access to and from that file.
     *
     * @method link
     * @param file {String} The location of the file to link to.
     * @param [type=detected] {String} Force a specific parser for unknown file types.
     * @param [options=default] {Object} The options to pass to the FileParser that will be created.
     * @returns {? extends FileParser} A subclass of FileParser to handle the file if the file's extension is matched,
     * or `null` if the file has an invalid path.
     */
    function link(file, type, options) {
        if (file == null || file.length === 0 || typeof file !== 'string') {
            return null;
        }

        if (type && typeof type !== 'string') {
            options = type;
            type = undefined;
        }

        for (var i = 0; i < parsers.length; i++) {
            var parser = parsers[i];

            if (type ? parser.name === type : parser.pattern.test(file)) {
                var Handler = new parser.Handler(file, options);
                Handler.name = parser.name;
                return Handler;
            }
        }
    }

    return {
        link: link,
        parsers: parsers
    };
}());
