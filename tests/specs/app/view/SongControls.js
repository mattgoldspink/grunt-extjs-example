describe("Test Pandora.view.SongControls", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.SongControls");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.SongControls).not.toBe(undefined);
    });

});
