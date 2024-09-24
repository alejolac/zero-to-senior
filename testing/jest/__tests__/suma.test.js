const suma = require('../src/suma');

const equalTest = (val1, val2, expected) => () => {
    expect(suma(val1, val2)).toBe(expected);
}

test("Suma de 2 y 3 debe ser 5", equalTest(2, 3, 5));

test("Suma de -1 y 1 debe ser 0", equalTest(-1, 1, 0));

test("Suma de 0 y 0 debe ser 0", equalTest(0, 0, 0));
