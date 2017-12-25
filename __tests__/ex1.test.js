const findNextSquare = require('../src/ex1');

// an integral perfect square is an integer n such that sqrt(n) is also an integer
describe('Finds the next integral perfect square after the one passed as a parameter', () => {
  test('findNextSquare of 121 should returns 144', () => {
    expect(findNextSquare(121)).toBe(144);
  });

  test('findNextSquare of 625 should returns 676', () => {
    expect(findNextSquare(625)).toBe(676);
  });

  test('should return -1 if the parameter is itself not a perfect square', () => {
    expect(findNextSquare(114)).toBe(-1);
  });
});
