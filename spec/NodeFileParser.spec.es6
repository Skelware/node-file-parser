jest.unmock('../src/NodeFileParser.es6');

import NodeFileParser from '../src/NodeFileParser.es6';

describe('NodeFileParser', () => {

    describe('#getConfiguration', () => {

        it('should return an object of the current default options', () => {
            const options = NodeFileParser.getConfiguration();
            expect(typeof options).toEqual('object');
        });
    });

    describe('#setConfiguration', () => {

        afterEach(() => {
            NodeFileParser.setConfiguration();
        });

        it('should reset the default options if used without arguments', () => {
            const previous = NodeFileParser.setConfiguration({
                foo: 'bar'
            });

            const current = NodeFileParser.setConfiguration();

            expect(previous.foo).toEqual('bar');
            expect(current.foo).toBeUndefined();
        });

        it('should merge options into the default options by default', () => {
            const previous = NodeFileParser.setConfiguration({
                foo: 'bar',
                bar: 'foo'
            });

            const current = NodeFileParser.setConfiguration({
                foo: 'oof',
                foobar: 'foobar'
            });

            expect(current.foo).toEqual('oof');
            expect(current.bar).toEqual(previous.bar);
            expect(current.foobar).toEqual('foobar');
        });

        it('should replace the default options if merging is disabled', () => {
            const previous = NodeFileParser.setConfiguration({
                foo: 'bar',
                bar: 'foo'
            });

            const current = NodeFileParser.setConfiguration({
                foo: 'oof',
                foobar: 'foobar'
            }, false);

            expect(current.foo).toEqual('oof');
            expect(current.bar).toBeUndefined();
            expect(current.foobar).toEqual('foobar');
        });
    });
});
