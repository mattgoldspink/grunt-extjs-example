describe("Test Pandora.view.NewStation", function () {

    beforeEach(function () {
        Ext.syncRequire("Pandora.view.NewStation");
    });

    it("loads ok with Ext.syncRequire", function () {
        expect(Pandora.view.NewStation).not.toBe(undefined);
    });

});
