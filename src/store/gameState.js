import { reactive } from "vue";

/**
 * NEW_GAME, PICK_PLAYER_1_MARK,
 */
export const game = reactive({
  state: "NEW_GAME",
  player1Mark: "X",
  player2Mark: "O",

  setPlayer1Mark(mark) {
    this.player1Mark = mark;
    this.player2Mark = mark === 'X' ? 'O' : 'X';
},
  pickPlayer() {
    this.state = "PICK_PLAYER_1_MARK";
  },
  startGame() {
    this.state = "GAME_RUNNING"
  }
});
