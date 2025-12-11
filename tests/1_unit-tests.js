const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzleStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    assert.isTrue(solver.validate(puzzleStrings[0][0]));
    done();
  });

  test('Logic handles a puzzle string with invalid characters', (done) => {
    assert.isFalse(solver.validate('1.5..2.84..63.12.7.2..5..h...9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'));
    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
    assert.isFalse(solver.validate('1.5..2.84..63.12.7.2..5...'));
    done();
  });

  test('Logic handles a valid row placement', (done) => {
    // Ejemplo: puzzle[0], fila A, columna 2 (valor original '.' vamos a probar si el 3 encaja)
    // Debes buscar una posición vacía y un número válido para esa posición en una string de ejemplo
    assert.isTrue(solver.checkRowPlacement(puzzleStrings[0][0], 'A', 2, '3')); 
    done();
  });

  test('Logic handles an invalid row placement', (done) => {
    assert.isFalse(solver.checkRowPlacement(puzzleStrings[0][0], 'A', 2, '1')); // 1 ya existe en la fila A
    done();
  });

  // Repite patrón similar para Column y Region (Grid) ...
  
  test('Valid puzzle strings pass the solver', (done) => {
    assert.equal(solver.solve(puzzleStrings[0][0]), puzzleStrings[0][1]);
    done();
  });

  test('Invalid puzzle strings fail the solver', (done) => {
    // Un puzzle imposible
    let badPuzzle = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.solve(badPuzzle));
    done();
  });

  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    assert.equal(solver.solve(puzzleStrings[0][0]), puzzleStrings[0][1]);
    done();
  });
});