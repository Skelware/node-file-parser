jest.unmock('../../src/parsers/JsonParser.es6');

import JsonParser from '../../src/parsers/JsonParser.es6';

describe('JsonParser', () => {

    describe('#accepts', () => {

        it('should return "true" for supported file types', () => {
            ['json', 'js'].forEach((type) => {
                expect(JsonParser.accepts(type)).toEqual(true);
            });
        });
    });
});
