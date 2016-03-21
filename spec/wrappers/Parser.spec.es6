jest.unmock('../../src/wrappers/Parser.es6');

import Parser from '../../src/wrappers/Parser.es6';

describe('Parser', () => {

    describe('#accepts', () => {

        it('should throw a SyntaxError', () => {
            expect(Parser.accepts).toThrow();
        });
    });
});
