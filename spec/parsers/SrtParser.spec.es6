jest.unmock('../../src/parsers/SrtParser.es6');

import SrtParser from '../../src/parsers/SrtParser.es6';

describe('SrtParser', () => {

    describe('#accepts', () => {

        it('should return "true" for supported file types', () => {
            ['srt'].forEach((type) => {
                expect(SrtParser.accepts(type)).toEqual(true);
            });
        });
    });
});
