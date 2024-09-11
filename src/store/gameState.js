import { cpuMove } from "@/cpuLogic";
import { reactive } from "vue";

const defaultValues = {
  player1Mark: "X",
  cpuMark: "O",
  board: new Array(9).fill(null).map((_, index) => ({
    id: index,
    value: undefined,
  })),
  currentMark: "X",
  cpuThinkingOfTile: undefined,
};

/**
 * NEW_GAME, PICK_PLAYER_1_MARK, GAME_RUNNING
 */
export const game = reactive({
  state: "GAME_RUNNING",
  player1Mark: defaultValues.player1Mark,
  cpuMark: defaultValues.cpuMark,
  board: defaultValues.board,
  currentMark: defaultValues.currentMark,
  cpuThinkingOfTile: defaultValues.cpuThinkingOfTile,

  setPlayer1Mark(mark) {
    this.player1Mark = mark;
    this.cpuMark = mark === "X" ? "O" : "X";
  },
  pickPlayer() {
    this.state = "PICK_PLAYER_1_MARK";
  },
  startGame() {
    this.state = "GAME_RUNNING";
    if (this.currentMark === this.cpuMark) {
      cpuMove(this.board, this.cpuMark);
    }
  },
  resetGame() {
    this.player1Mark = defaultValues.player1Mark;
    this.cpuMark = defaultValues.cpuMark;
    this.currentMark = defaultValues.currentMark;
    this.board = defaultValues.board;
    this.state = "PICK_PLAYER_1_MARK";
  },
  addMark(id) {
    this.updateBoard(id, this.currentMark);

    if (this.currentMark === this.cpuMark) {
      cpuMove(this.board, this.cpuMark);
    }
  },
  updateBoard(id, mark) {
    const newBoard = this.board.map((cell) => {
      if (cell.id === id && !cell.value) {
        return { ...cell, value: mark };
      }
      return cell;
    });

    this.board = newBoard;
    this.cpuThinkingOfTile = undefined;
    this.currentMark = this.currentMark === "X" ? "O" : "X";
  },
  cpuIsThinkingOfThisTile(tile) {
    this.cpuThinkingOfTile = tile;
  },
});
