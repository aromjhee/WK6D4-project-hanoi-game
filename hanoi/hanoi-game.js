class HanoiGame {
  constructor(towers) {
    if (towers) this.towers = towers;
    else {this.towers = [[3, 2, 1], [], []]} 
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let startTower = this.towers[startTowerIdx]
    let endTower = this.towers[endTowerIdx]

    if (startTowerIdx === endTowerIdx || startTowerIdx > 2 || endTowerIdx > 2 || startTower.length === 0) {
      return false;
    } else if (startTower < endTower || endTower.length === 0) {
      return true;
    } else {
      const topStartDisc = startTower[startTower.length - 1];
      const topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  }

  move(startTowerIdx, endTowerIdx) {    
    let startTower = this.towers[startTowerIdx]
    let endTower = this.towers[endTowerIdx]

    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      endTower.push(startTower.pop())
      return true;
    } else {
      return false;
    }
  }

  isWon() {
    for (let i = 1; i < 3; i++) {
      if (this.towers[i].length === 3) {
        return true;
      }
    }
    return false;
  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

module.exports = HanoiGame;
