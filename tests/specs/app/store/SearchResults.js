describe("Test Pandora.store.SearchResults", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.store.SearchResults");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.store.SearchResults).not.toBe(undefined);
    });

});
