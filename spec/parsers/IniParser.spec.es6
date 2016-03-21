jest.unmock('../../src/parsers/IniParser.es6');

import IniParser from '../../src/parsers/IniParser.es6';

describe('IniParser', () => {

    describe('#accepts', () => {

        it('should return "true" for supported file types', () => {
            ['ini'].forEach((type) => {
                expect(IniParser.accepts(type)).toEqual(true);
            });
        });
    });
});
