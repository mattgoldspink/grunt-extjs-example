describe("Test Pandora.store.RecentSongs", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.store.RecentSongs");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.store.RecentSongs).not.toBe(undefined);
    });

});
