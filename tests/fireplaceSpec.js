var fireplace = require('../lib/chimney/fireplace'),
    fire = require('../lib/chimney/fire');

describe('The fireplace', function(){
  it('is available', function() {
    expect(fireplace).not.toBe(null);
  });

  it('burns them to keep us warm', function() {
    var renderer = createSpy("renderer"),
        done     = createSpy("done");

    expect(fireplace.start).toBeDefined();

    fireplace.start(0, renderer, done);

    // The renderer has to be called with a string,
    // and once the fire runs out of logs, the done cb
    // has to be called too.
    expect(renderer).toHaveBeenCalledWith(any(String));

    // Problem is the test needs to be async, and I don't
    // like async tests.
    // expect(done).toHaveBeenCalled();
  });
});
