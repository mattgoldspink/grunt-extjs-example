describe("Test Pandora.model.Station", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.model.Station");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.model.Station).not.toBe(undefined);
    });

});
