import { cpuMove } from "@/cpuLogic";
import { checkGameEnd } from "@/gameUtils";
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

export const game = reactive({
  state: "NEW_GAME",
  player1Mark: defaultValues.player1Mark,
  cpuMark: defaultValues.cpuMark,
  board: defaultValues.board,
  currentMark: defaultValues.currentMark,
  cpuThinkingOfTile: defaultValues.cpuThinkingOfTile,
  winner: undefined,
  isGameOver: false,
  winningCombination: undefined,
  player1Points: 0,
  cpuPoints: 0,

  setPlayer1Mark(mark) {
    this.player1Mark = mark;
    this.cpuMark = mark === "X" ? "O" : "X";
  },
  pickPlayer() {
    this.state = "PICK_PLAYER_1_MARK";
  },
  startGame() {
    this.state = "GAME_BOARD";
    if (this.currentMark === this.cpuMark) {
      cpuMove(this.board, this.cpuMark);
    }
  },
  quit() {
    this.resetGame();
    this.state = 'NEW_GAME'
  },
  newGame() {
    const newPlayer1Mark = this.cpuMark;
    const newCpuMark = this.player1Mark;

    this.player1Mark = newPlayer1Mark;
    this.cpuMark = newCpuMark;
    this.currentMark = defaultValues.currentMark;
    this.board = defaultValues.board;
    this.state = "GAME_BOARD";
    this.winner = undefined,
    this.isGameOver = false;

    this.startGame();
  },
  resetGame() {
    this.player1Mark = defaultValues.player1Mark;
    this.cpuMark = defaultValues.cpuMark;
    this.currentMark = defaultValues.currentMark;
    this.board = defaultValues.board;
    this.state = "PICK_PLAYER_1_MARK";
    this.winner = undefined,
    this.isGameOver = false;
    this.player1Points = 0;
    this.cpuPoints = 0;
  },
  addMark(id) {
    this.updateBoard(id, this.currentMark);

    if (this.currentMark === this.cpuMark && !this.isGameOver) {
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

    const { isGameOver, winner, combination } = checkGameEnd(this.board);

    if (isGameOver) {
      this.isGameOver = isGameOver;
      this.winner = winner;
      this.winningCombination = combination;

      if (this.cpuMark === winner) {
        this.cpuPoints = this.cpuPoints + 1;
      } else if (this.player1Mark === winner) {
        this.player1Points = this.player1Points + 1;
      }

      return;
    }
  },
  cpuIsThinkingOfThisTile(tile) {
    this.cpuThinkingOfTile = tile;
  },
});
