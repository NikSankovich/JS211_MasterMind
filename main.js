'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) => {
  let solutionArray = solution.split(''); //['a', 'b', 'c', 'd']
  let guessArray = guess.split('');  //['a', 'd', 'b', 'c']
  // compare the values at each index w/ a for loop

  let correctLetterLocations = 0; // record how many correct "letter locations" there were
  let correctLetters = 0; // how many correct letters 
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
    // check for correct letters in the wrong location
  }
  for (let i = 0; i < solutionArray.length; i++) {
    // returns the first index at which a given
    // element can be found in the array, or -1 if it is not present
    // (beasts.indexOf('bison'))
    let targetIndex = solutionArray.indexOf(guessArray[i])
    // check for correct letters in the wrong location
    if (targetIndex > -1) {
      correctLetters++
      solutionArray[targetIndex] = null;
    }
  }
  console.log('you have ' + correctLetterLocations + ' letters in the right place, and '
    + correctLetters + ' correct letters in the wrong place')

  return correctLetterLocations + '-' + correctLetters;
}

const mastermind = (guess) => {
  //solution = 'abcd'; // Comment this out to generate a random solution
  //define a variable called hint that collects the returned value of generatedHint (guess)
  let hint = generateHint(guess)
  //board.push(`${correctLetterLocation} in the right place and ${correctLetters} correct letters in the wrong place`)
  board.push(`${guess} - ${hint}`)

  // .push the guess and the hint (as a combined string) into the board
  if (solution === guess) {
    return 'You guessed it!';
  } else if (board.length === 10) {
    return `You ran out of turns! The solution was ${solution}`
  } else {
    return 'Guess again.'
  }



  // Spec 4 - End the game: After 10 incorrect guesses, if the board length equals 10, 
  // return 'You ran out of turns! The solution was' and the solution. Otherwise, return 'Guess again.'.

}


const getPrompt = () => {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}