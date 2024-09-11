import { game } from "./store/gameState";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function cpuMove(board, cpuMark) {
  const availableCells = board.filter(cell => cell.value === undefined);

  if (availableCells.length > 0) {
    // Randomize the number of "thinking" tiles (between 1 and the available tiles, up to 4)
    const thinkingCount = Math.min(Math.floor(Math.random() * 4) + 1, availableCells.length);

    // Shuffle the available cells and pick the first `thinkingCount` tiles
    const shuffledCells = [...availableCells].sort(() => 0.5 - Math.random());
    const thinkingTiles = shuffledCells.slice(0, thinkingCount);

    // Iterate through the "thinking" tiles with random delays
    for (let i = 0; i < thinkingTiles.length; i++) {
      const delayTime = Math.floor(Math.random() * (4500 - 1500)) + 1500;
      game.cpuIsThinkingOfThisTile(thinkingTiles[i]);

      // Wait for the delay before proceeding to the next tile
      // await delay(delayTime);
    }

    // The last tile is the CPU's actual move
    const finalTile = thinkingTiles[thinkingTiles.length - 1];
    game.updateBoard(finalTile.id, cpuMark);
  }
}
