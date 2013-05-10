describe("Test Pandora.controller.Station", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.controller.Station");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.controller.Station).not.toBe(undefined);
    });

});
