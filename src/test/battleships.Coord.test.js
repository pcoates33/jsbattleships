const battleships = require("../battleships.js")

test("construct coord for 'B5'", () => {
    const coord = new battleships.Coord("B5")
    expect(coord.getValue()).toBe("B5");
});

test("construct coord for min (A1)", () => {
    const coord = new battleships.Coord("A1")
    expect(coord.getValue()).toBe("A1");
});

test("construct coord for max (J10)", () => {
    const coord = new battleships.Coord("J10")
    expect(coord.getValue()).toBe("J10");
});

test("construct coord with lowercase 'b5'", () => {
    const coord = new battleships.Coord("b5")
    expect(coord.getValue()).toBe("B5");
});

test("construct coord trims spaces ' B5 '", () => {
    const coord = new battleships.Coord(" B5 ")
    expect(coord.getValue()).toBe("B5");
});

test("column outside range 'Z5'", () => {
    function createCoordOutOfRange() {
        new battleships.Coord("Z5");
    }
    expect(createCoordOutOfRange).toThrowError(RangeError);
});

test("row outside range, too high 'B12'", () => {
    function createCoordOutOfRange() {
        new battleships.Coord("B12");
    }
    expect(createCoordOutOfRange).toThrowError(RangeError);
});

test("row outside range, too low 'B0'", () => {
    function createCoordOutOfRange() {
        new battleships.Coord("B0");
    }
    expect(createCoordOutOfRange).toThrowError(RangeError);
});

test("no input value", () => {
    function createCoord() {
        new battleships.Coord();
    }
    expect(createCoord).toThrowError();
});

test("empty string", () => {
    function createCoord() {
        new battleships.Coord('');
    }
    expect(createCoord).toThrowError();
});

test("row not a number", () => {
    function createCoord() {
        new battleships.Coord('Cr');
    }
    expect(createCoord).toThrowError();
});

test("next horizontal from 'B5'", () => {
    const coord = new battleships.Coord("B5").next(battleships.constants.HORIZONTAL);
    expect(coord.getValue()).toBe("C5");
});

test("next vertical from 'B5'", () => {
	const coord = new battleships.Coord("B5").next(battleships.constants.VERTICAL);
	expect(coord.getValue()).toBe("B6");
});

test("next horizontal from 'J10'", () => {
    function createCoordOutOfRange() {
        new battleships.Coord("J10").next(battleships.constants.HORIZONTAL);
    }
    expect(createCoordOutOfRange).toThrowError(RangeError);
});

test("next vertical from 'J10'", () => {
    function createCoordOutOfRange() {
        new battleships.Coord("J10").next(battleships.constants.VERTICAL);
    }
    expect(createCoordOutOfRange).toThrowError(RangeError);
});