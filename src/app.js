/*eslint-env node*/

const readline = require('readline');
const battleships = require('./battleships.js')

const battleGround = new battleships.BattleGround();
const previousShots = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Your Move > '
});

function println(message) {
    console.log(message);
}

function actionMove(coordinates) {
    try {
		let coord = new battleships.Coord(coordinates);
		if (previousShots.includes(coord.getValue())) {
			println("You've already tried " + coordinates);
		}
		else {
			previousShots.push(coord.getValue());
			switch (battleGround.shoot(coord)) {
			case battleships.constants.MISS :
				println(coordinates + " was a miss.");
				break;
			case battleships.constants.HIT :
				println(coordinates + " was a HIT.");
				break;
			case battleships.constants.SUNK :
				println(coordinates + " was a HIT and SUNK the ship.");
				break;
			}
		}
	}
	catch (error) {
		println(coordinates + " was not a valid shot.");
		println("Enter coordinates of the form 'A5', where 'A' is the column and '5' is the row, to specify a square to target.");
		println("Column range is A to J, rows go from 1 to 10.");
	}
	
	if (battleGround.allSunk()) {
	    println("All the ships have been sunk. Mission accomplished");
	    process.exit(0);
	}

}

function setupBattleGround() {
	battleGround.addShip(battleships.constants.BATTLESHIP);
	battleGround.addShip(battleships.constants.DESTROYER);
	battleGround.addShip(battleships.constants.DESTROYER);
}

println("Find 1 Battleship (5 squares) and 2 Destroyers (4 squares) on a 10x10 grid.");
println("Enter coordinates of the form 'A5', where 'A' is the column and '5' is the row, to specify a square to target.");
println("Battle stations.");

setupBattleGround();

rl.prompt();

rl.on('line', (line) => {
  actionMove(line);
  rl.prompt();
});
