describe("Test Pandora.view.Viewport", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.Viewport");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.Viewport).not.toBe(undefined);
    });

});
