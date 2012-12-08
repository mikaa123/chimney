var ansiHelper = require('../lib/chimney/ansiHelper');

describe('Ansi Helper module', function(){
  it('is available', function() {
    expect(ansiHelper).not.toBe(null);
  });

  it('can color a text', function() {
    expect(ansiHelper.color).toBeDefined();
    expect(
      ansiHelper.color(2, 'foo')
    ).toEqual('\033[32mfoo');
  });

  it('can add a background color to a text', function() {
    expect(ansiHelper.bgColor).toBeDefined();
    expect(
      ansiHelper.bgColor(2, 'foo')
    ).toEqual('\033[0m\033[48;5;2mfoo\033[0m');
  });

  it('can write a new animation frame', function() {
    expect(ansiHelper.writeFrame).toBeDefined();
    expect(
      ansiHelper.writeFrame('foo')
    ).toEqual('\033[H\033[Jfoo\033[0m');
  });

});
