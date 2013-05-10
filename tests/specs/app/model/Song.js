describe("Test Pandora.model.Song", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.model.Song");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.model.Song).not.toBe(undefined);
    });

});
