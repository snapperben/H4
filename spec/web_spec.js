describe('Basic request', function () {
    beforeEach(async function() {
      var physicsUtilsResponse = await import('../public/src/PhysicsUtils.js')
      this.physicUtils = physicsUtilsResponse.default;
      this.physicsUtils.setValues(60, 0.1, 0.1, 0, 360, 4, 7);
    });

    it('Test random directtion is between 0 & 360', function () {
        var dir = this.physicUtils.getRandomDir()
        expect(dir).toBeGreaterThanOrEqual(0).and.expect(dir).toBeLessThanOrEqual(360);
    });
});