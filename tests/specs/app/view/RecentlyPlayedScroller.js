describe("Test Pandora.view.RecentlyPlayedScroller", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.RecentlyPlayedScroller");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.RecentlyPlayedScroller).not.toBe(undefined);
    });

});
