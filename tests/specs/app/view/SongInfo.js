describe("Test Pandora.view.SongInfo", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.SongInfo");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.SongInfo).not.toBe(undefined);
    });

});
