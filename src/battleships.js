const constants = {
    COLUMN_LETTERS: "ABCDEFGHIJ",
    GRID_SIZE: 10,
    HORIZONTAL: {
        rowInc: 0,
        colInc: 1
    },
    VERTICAL: {
        rowInc: 1,
        colInc: 0
    },
    BATTLESHIP: {
        length: 5
    },
    DESTROYER: {
        length: 4
    },
    HIT:  'hit',
    MISS: 'miss',
    SUNK: 'sunk'
};

class Coord {
    
    constructor(coordinates) {
        if (coordinates.length < 2) {
            throw RangeError("Value needs to be at least 2 characters long.");
        }
        this.value = coordinates.trim().toUpperCase();
        this.checkBounds();
    }
    
    getValue() {
        return this.value;
    }
    
    checkBounds() {
    	const col = this.value.slice(0,1);
        const row = parseInt(this.value.slice(1));
        
        if (!constants.COLUMN_LETTERS.includes(col)) {
			throw RangeError("Column out of range.");
		}
        
        if (isNaN(row) || row < 1 || row > constants.GRID_SIZE) {
			throw RangeError("Row out of range.");
		}
    }
    
    next(direction) {
        const nextCol = constants.COLUMN_LETTERS.indexOf(this.value.slice(0,1)) +  direction.colInc;
        const nextRow = parseInt(this.value.slice(1)) + direction.rowInc;
        
        return new Coord(constants.COLUMN_LETTERS.charAt(nextCol) + String(nextRow));
    }
    
}

class Ship {
    
    constructor(type, direction, start) {
        let coord = start;
        this.hits = [];
        this.coordValues = [];
        for (let i = 0; i < type.length; i++) {
            this.coordValues.push(coord.getValue());
            coord = coord.next(direction);
        }
    }
    
    getCoordValues() {
    	return this.coordValues;
    }
    
    shotAt(coord) {
        if (this.coordValues.includes(coord.getValue())) {
        	if (!this.hits.includes(coord.getValue())) {
        		this.hits.push(coord.getValue());
        	}
        	return (this.isSunk()) ? constants.SUNK : constants.HIT;
        }
        
        return constants.MISS;
	}
	
	isSunk() {
	    return this.coordValues.length === this.hits.length;
	}
    
}

class BattleGround {
    
    constructor(randomizer) {
        this.randomizer = (randomizer) ? randomizer : new Randomizer();
        this.ships = [];
    }
    
    addShip(type) {
        let ship;
        let maxTries = 50;
        function check(limit) {
            if (limit <= 0) {
                throw Error("Nowhere found to place ship");
            }
            return true;
        }

        do {
            ship = this.buildShip(type);
        } while (!this.shipFits(ship) && check(maxTries--)) 
        
        this.ships.push(ship);
    }
    
    shipFits(ship) {
    	return !this.ships.some(existingShip => existingShip.getCoordValues().some(existingCoordValue => ship.getCoordValues().includes(existingCoordValue)));
    }
    
    buildShip(type) {
        let direction = this.randomizer.getDirection();
        return new Ship(type, direction, this.randomizer.getCoordinates(type, direction));
    }
    
	shoot(coord) {
		for (let ship of this.ships) {
			let shotOutcome = ship.shotAt(coord);
			if (shotOutcome != constants.MISS) {
				return shotOutcome;
			}
		}
		return constants.MISS;
	}
    
    allSunk() {
        return !this.ships.some(ship => !ship.isSunk());
    }
    
}

class Randomizer {
    
    getDirection() {
        return (Math.random() < 0.5) ? constants.HORIZONTAL : constants.VERTICAL;
    }
    
    getCoordinates(type, direction) {
        let col = Math.floor(Math.random() * (constants.GRID_SIZE - (type.length * direction.colInc)));
        let row = Math.floor(Math.random() * (constants.GRID_SIZE - (type.length * direction.rowInc)));
        return new Coord(constants.COLUMN_LETTERS.charAt(col) + String(row + 1));
    }
    
}

module.exports = {
    Coord: Coord,
    Ship: Ship,
    BattleGround: BattleGround,
    constants: constants
}