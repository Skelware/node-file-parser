jest.unmock('glob');
jest.unmock('../../src/wrappers/Parser.es6');

import Parser from '../../src/wrappers/Parser.es6';

describe('Parser', () => {

    describe('#constructor', () => {

        it('should throw a TypeError if no source is provided', () => {
            expect(() => {
                return new Parser();
            }).toThrow();
        });
    });

    describe('#getSourceFiles', () => {

        it('should return a promise', () => {
            const parser = new Parser('package.json');
            const promise = parser.getSourceFiles();
            expect(promise instanceof Promise).toEqual(true);
        });

        it('should fetch an array of files if the source is resolved', (done) => {
            const parser = new Parser('package.json');
            const promise = parser.getSourceFiles();

            promise.then((files) => {
                expect(files instanceof Array).toEqual(true);
                expect(typeof files[0]).toEqual('string');
                done();
            }).catch((err) => {
                throw err;
            });
        });

        it('should fetch an empty array of files if the source is not resolved', (done) => {
            const parser = new Parser('_package.json');
            const promise = parser.getSourceFiles();

            promise.then((files) => {
                expect(files instanceof Array).toEqual(true);
                expect(files.length).toEqual(0);
                done();
            }).catch((err) => {
                throw err;
            });
        });
    });

    describe('#accepts', () => {

        it('should throw a SyntaxError', () => {
            expect(Parser.accepts).toThrow();
        });
    });
});
