'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Check 1: Campos faltantes (Plural con s)
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Check 2: Validación básica del puzzle
      if (puzzle.length !== 81) return res.json({ error: 'Expected puzzle to be 81 characters long' });
      if (/[^1-9.]/.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' });

      // Check 3: Coordenada válida
      const coordRegex = /^[A-I][1-9]$/i;
      if (!coordRegex.test(coordinate)) return res.json({ error: 'Invalid coordinate'});

      // Check 4: Valor válido
      if (!/^[1-9]$/.test(value)) return res.json({ error: 'Invalid value' });

      const row = coordinate.charAt(0);
      const col = parseInt(coordinate.charAt(1));

      let conflicts = [];
      
      if (!solver.checkRowPlacement(puzzle, row, col, value)) conflicts.push("row");
      if (!solver.checkColPlacement(puzzle, row, col, value)) conflicts.push("column");
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) conflicts.push("region");

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }
      return res.json({ valid: true });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      // Check 1: Campo faltante (Singular sin s - CORRECCIÓN IMPORTANTE)
      if (!puzzle) return res.json({ error: 'Required field missing' });
      
      // Check 2: Validaciones
      if (puzzle.length !== 81) return res.json({ error: 'Expected puzzle to be 81 characters long' });
      if (/[^1-9.]/.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' });

      // Check 3: Resolver
      const solution = solver.solve(puzzle);
      if (!solution) return res.json({ error: 'Puzzle cannot be solved' });
      
      return res.json({ solution });
    });
};