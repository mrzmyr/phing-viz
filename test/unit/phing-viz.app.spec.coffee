describe 'Midway: Testing phingVizApp', ->

    describe 'phing-viz Module:', ->

        module = null;

        beforeEach ->
            module = angular.module 'phingVizApp'

        it 'should be registered', ->
            expect(module).not.toBe null