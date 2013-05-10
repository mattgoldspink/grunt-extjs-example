describe("Test Pandora.store.Stations", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.store.Stations");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.store.Stations).not.toBe(undefined);
    });

});
