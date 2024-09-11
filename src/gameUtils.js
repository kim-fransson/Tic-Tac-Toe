export function checkGameEnd(board) {
    const winningCombinations = [
      [0, 1, 2], 
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
  
      if (board[a].value && board[a].value === board[b].value && board[a].value === board[c].value) {
        return { isGameOver: true, winner: board[a].value,  combination }
      }
    }
  
    const isBoardFull = board.every(cell => cell.value !== undefined);
    if (isBoardFull) {
      return { isGameOver: true, winner: undefined };
    }
  
    return { isGameOver: false, winner: undefined };
  }
  