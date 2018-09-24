const battleships = require("../battleships.js")

test("shoot ship along row", () => {
    const ship = new battleships.Ship({length: 2}, battleships.constants.HORIZONTAL, new battleships.Coord("B5"));
    
    expect(ship.shotAt(new battleships.Coord("A5"))).toBe(battleships.constants.MISS);
    expect(ship.shotAt(new battleships.Coord("B5"))).toBe(battleships.constants.HIT);
    expect(ship.shotAt(new battleships.Coord("C5"))).toBe(battleships.constants.SUNK);
    expect(ship.shotAt(new battleships.Coord("D5"))).toBe(battleships.constants.MISS);
    
});

test("shoot ship down column", () => {
    const ship = new battleships.Ship({length: 3}, battleships.constants.VERTICAL, new battleships.Coord("B5"));
    
    expect(ship.shotAt(new battleships.Coord("B4"))).toBe(battleships.constants.MISS);
    expect(ship.shotAt(new battleships.Coord("B5"))).toBe(battleships.constants.HIT);
    expect(ship.shotAt(new battleships.Coord("B6"))).toBe(battleships.constants.HIT);
    expect(ship.shotAt(new battleships.Coord("B7"))).toBe(battleships.constants.SUNK);
    expect(ship.shotAt(new battleships.Coord("B8"))).toBe(battleships.constants.MISS);
    
});

test("shoot ship at same place", () => {
    const ship = new battleships.Ship({length: 2}, battleships.constants.HORIZONTAL, new battleships.Coord("B5"));
    
    expect(ship.shotAt(new battleships.Coord("B5"))).toBe(battleships.constants.HIT);
    expect(ship.shotAt(new battleships.Coord("B5"))).toBe(battleships.constants.HIT);
    expect(ship.shotAt(new battleships.Coord("C5"))).toBe(battleships.constants.SUNK);
    expect(ship.shotAt(new battleships.Coord("B5"))).toBe(battleships.constants.SUNK);
    
});