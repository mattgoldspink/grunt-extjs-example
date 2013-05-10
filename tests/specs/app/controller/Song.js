describe("Test Pandora.controller.Song", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.controller.Song");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.controller.Song).not.toBe(undefined);
    });

});
