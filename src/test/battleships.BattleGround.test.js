const battleships = require("../battleships.js")

test("add a ship and sink it", () => {
    const battleGround = new battleships.BattleGround({
        getDirection: () => battleships.constants.HORIZONTAL,
        getCoordinates: () => new battleships.Coord("B5")
    });
    let ship;
    
    battleGround.addShip({length: 3})
    ship = battleGround.ships[0];
    
    expect(battleGround.shoot(new battleships.Coord("A5"))).toBe(battleships.constants.MISS);
    
    expect(battleGround.allSunk()).toBe(false);
    expect(battleGround.shoot(new battleships.Coord("B5"))).toBe(battleships.constants.HIT);
    expect(battleGround.allSunk()).toBe(false);
    expect(battleGround.shoot(new battleships.Coord("C5"))).toBe(battleships.constants.HIT);
    expect(battleGround.allSunk()).toBe(false);
    expect(battleGround.shoot(new battleships.Coord("D5"))).toBe(battleships.constants.SUNK);
    expect(battleGround.allSunk()).toBe(true);
        
    expect(battleGround.shoot(new battleships.Coord("E5"))).toBe(battleships.constants.MISS);
    
});

test("add 3 ships", () => {
    const battleGround = new battleships.BattleGround();
    let ship;
    
    battleGround.addShip(battleships.constants.BATTLESHIP);
    expect(battleGround.ships.length).toBe(1);

    battleGround.addShip(battleships.constants.DESTROYER);
    expect(battleGround.ships.length).toBe(2);

    battleGround.addShip(battleships.constants.DESTROYER);
    expect(battleGround.ships.length).toBe(3);
});

test("fails if there's nowhere to place the ship", () => {
    function tooManyShips() {
        const battleGround = new battleships.BattleGround();
        for (let i = 0; i <= 100; i++) {
            battleGround.addShip({length: 5});
        }
    }

    expect(tooManyShips).toThrowError();
    
});

