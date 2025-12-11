const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzleStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', () => {
    assert.isTrue(solver.validate(puzzleStrings[0][0]));
  });

  test('Logic handles a puzzle string with invalid characters', () => {
    assert.isFalse(solver.validate('1.5..2.84..63.12.7.2..5..h...9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'));
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    assert.isFalse(solver.validate('1.5..2.84..63.12.7.2..5...'));
  });

  test('Logic handles a valid row placement', () => {
    assert.isTrue(solver.checkRowPlacement(puzzleStrings[0][0], 'A', 2, '3')); 
  });

  test('Logic handles an invalid row placement', () => {
    assert.isFalse(solver.checkRowPlacement(puzzleStrings[0][0], 'A', 2, '1'));
  });

  test('Logic handles a valid column placement', () => {
    assert.isTrue(solver.checkColPlacement(puzzleStrings[0][0], 'A', 2, '3')); 
  });

  test('Logic handles an invalid column placement', () => {
    assert.isFalse(solver.checkColPlacement(puzzleStrings[0][0], 'A', 2, '5')); 
  });

  test('Logic handles a valid region (3x3 grid) placement', () => {
    assert.isTrue(solver.checkRegionPlacement(puzzleStrings[0][0], 'A', 2, '3')); 
  });

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    assert.isFalse(solver.checkRegionPlacement(puzzleStrings[0][0], 'A', 2, '2')); 
  });

  test('Valid puzzle strings pass the solver', () => {
    assert.equal(solver.solve(puzzleStrings[0][0]), puzzleStrings[0][1]);
  });

  test('Invalid puzzle strings fail the solver', () => {
    let badPuzzle = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.solve(badPuzzle));
  });

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    assert.equal(solver.solve(puzzleStrings[0][0]), puzzleStrings[0][1]);
  });
});