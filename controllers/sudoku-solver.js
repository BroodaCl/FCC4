class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) return false;
    if (puzzleString.length !== 81) return false;
    // Solo permite números del 1-9 y puntos
    return /^[1-9.]+$/.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    if(grid[row][column - 1] == value) return true; // Si es el mismo valor en la misma casilla, es válido
    
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    if(grid[row][column - 1] == value) return true;

    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    row = this.letterToNumber(row);
    let col = column - 1;
    if(grid[row][col] == value) return true;

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return false;
    let grid = this.transform(puzzleString);
    let solved = this.solveSudoku(grid);
    if (!solved) return false;
    return grid.flat().join('');
  }

  // Utilidad: Convierte string a matriz 9x9
  transform(puzzleString) {
    let grid = [];
    for (let i = 0; i < 81; i += 9) {
      grid.push(puzzleString.substring(i, i + 9).split(''));
    }
    return grid;
  }
  
  // Utilidad: Convierte Letra Fila (A-I) a índice (0-8)
  letterToNumber(row) {
    return row.toUpperCase().charCodeAt(0) - 65;
  }

  // Algoritmo Backtracking recursivo
  solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] == '.') {
          for (let num = 1; num <= 9; num++) {
            if (this.isValid(grid, row, col, num.toString())) {
              grid[row][col] = num.toString();
              if (this.solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
      // Chequeo fila y columna y región 3x3
      if (grid[row][i] == num || grid[i][col] == num) return false; 
      let startRow = Math.floor(row / 3) * 3;
      let startCol = Math.floor(col / 3) * 3;
      if (grid[startRow + Math.floor(i / 3)][startCol + (i % 3)] == num) return false;
    }
    return true;
  }
}

module.exports = SudokuSolver;

