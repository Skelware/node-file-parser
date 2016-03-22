import glob from 'glob';

/**
 * @abstract
 */
class Parser {

    constructor(src, options) {
        if (!src) {
            throw new TypeError('Source must be provided');
        }

        this._src = src;
        this._options = Object.assign({}, options);
    }

    getSourceFiles() {
        return new Promise((resolve, reject) => {
            glob(this._src, this._options.glob, (err, files) => {
                err ? reject(err) : resolve(files);
            });
        });
    }

    static accepts(type) {
        throw new SyntaxError(`Abstract function Parser#${name} must be overridden`);
    }
}

export default Parser;
