jest.unmock('glob');
jest.unmock('../../src/wrappers/Parser.es6');
jest.unmock('../../src/parsers/IniParser.es6');

import IniParser from '../../src/parsers/IniParser.es6';

describe('IniParser', () => {

    describe('#constructor', () => {

        it('should throw a TypeError if no source is provided', () => {
            expect(() => {
                return new IniParser();
            }).toThrow();
        });
    });

    pit('should fetch an array of supported files', () => {
        const parser = new IniParser('file.json');
        const promise = parser.getSourceFiles();

        return promise.then(files => expect(files.length).toEqual(0));
    });

    describe('#accepts', () => {

        it('should return "true" for supported file types', () => {
            ['ini'].forEach(type => expect(IniParser.accepts(type)).toEqual(true));
        });
    });
});
