const multiply = require('../src/ex3');

describe('Return the product of 2 integers', () => {
  test('multiply(1,2) should return 2', () => {});

  test('multiply(42,27) should return 1134', () => {});

  test('multiply(0,762) should return 0', () => {});

  test('multiply(-5,9) should return -45', () => {});

  test('multiply(0.1,762) should throw a TypeError', () => {
    expect(() => {
      multiply(0.1, 762);
    }).toThrowError(TypeError);
  });
});
