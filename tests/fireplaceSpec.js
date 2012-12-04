var fireplace = require('../fireplace'),
	fire = require('../fire');

describe('The fireplace', function(){
	it('is available', function() {
		expect(fireplace).not.toBe(null);
	});

	it('takes logs', function() {
	});

	it('burns them to keep us warm', function() {
		var renderer = createSpy("renderer");

		expect(fireplace.burnLogs).toBeDefined();

		// fireplace.setRenderer(renderer);
		fireplace.burnLogs(4, renderer);

		// The renderer has to be called with a string
		expect(renderer).toHaveBeenCalledWith(any(String));
	});

	// it('lets us decide how to render it', function() {
	// 	expect(fireplace.setRenderer).toBeDefined();

	// 	spyOn(fire, 'setIterationCb');
		
	// 	fireplace.setRenderer(function() {});

	// 	expect(fire.setIterationCb).toHaveBeenCalled();
	// });
});
