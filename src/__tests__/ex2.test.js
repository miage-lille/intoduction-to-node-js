const filterIntegers = require('../ex2');

describe('Return a list filtered with only interger values', () => {
  test('[1,"foo"] should returns [1]', () => {
    expect(filterIntegers([1, 'foo'])).toEqual([1]);
  });

  test('[2.7, 1, "foo", 15, { bar: 1 }, 9, false, 42] should returns [1, 15, 9, 42]', () => {
    expect(
      filterIntegers([2.7, 1, 'foo', 15, { bar: 1 }, 9, false, 42])
    ).toEqual([1, 15, 9, 42]);
  });

  test('["foo", false] should returns []', () => {
    expect(filterIntegers(['foo', false])).toEqual([]);
  });

  test('[] should returns []', () => {
    expect(filterIntegers([])).toEqual([]);
  });
});
