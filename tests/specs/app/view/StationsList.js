describe("Test Pandora.view.StationsList", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.StationsList");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.StationsList).not.toBe(undefined);
    });

});
