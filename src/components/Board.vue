<template>
  <div>
    <h2 v-if="!winner">Turn: {{ whosTurn }}</h2>
    <h2 v-else>{{ winner }}</h2>
    <button @click.prevent="playAgain">Play New Game</button>
    <ul v-for="(row, x) of board" v-bind:key="x">
      <li v-for="(col, y) of row" v-bind:key="y" v-on:click="turn(x, y)">
        {{ board[x][y] }}
      </li>
    </ul>

    <h6>{{ message }}</h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 13,
      cols: 13,
      board: [],
      playerOne: "X",
      playerTwo: "O",
      message: "",
      winSequence: 5,
      winner: "",
      turnCount: 0,
      counter: 1,
    };
  },
  methods: {
    turn(x, y) {
      if (!this.winner) {
        this.message = "";
        if (this.turnCount % 2 === 0 && !this.board[x][y]) {
          this.board[x][y] = "X";
          this.turnCount += 1;
        } else if (this.turnCount % 2 !== 0 && !this.board[x][y]) {
          this.board[x][y] = "O";
          this.turnCount += 1;
        } else {
          this.message = "Not empty";
        }
        this.horizontalCheck();
        this.verticalCheck();
      }
    },
    horizontalCheck() {
      //checking rows starts from first row
      for (let row = 0; row <= this.rows - 1; row++) {
        for (let col = 0; col <= this.cols - 1; col++) {
          if (
            this.board[row][col] === this.board[row][col + 1] &&
            this.board[row][col] &&
            this.counter !== this.winSequence
          ) {
            this.counter += 1;
          } else {
            this.counter = 1;
          }
          if (this.counter === 5) {
            this.winner = `${
              this.turnCount % 2 === 0 ? "Player Two" : "Player One"
            } is a winner`;
          }
        }
      }
    },
    verticalCheck() {
      //checking columns starts from first column
      for (let col = 0; col <= this.cols - 1; col++) {
        for (let row = 0; row < this.rows - 1; row++) {
          if (
            this.board[row][col] === this.board[row + 1][col] &&
            this.board[row][col] &&
            this.counter !== this.winSequence
          ) {
            this.counter += 1;
          } else {
            this.counter = 1;
          }
          if (this.counter === 5) {
            this.winner = `${
              this.turnCount % 2 === 0 ? "Player Two" : "Player One"
            } is a winner`;
          }
        }
      }
    },
    playAgain() {
      window.location.reload();
    },
  },
  computed: {
    //check who's turn
    whosTurn() {
      return this.turnCount % 2 === 0 ? "Player One" : "Player Two";
    },
  },
  mounted() {
    //create 2d Array of rows & columns
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = new Array(this.cols);
    }
  },
};
</script>

<style>
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 290px;
  margin: 0 auto;
  padding: 0;
  font-size: 10px;
}
li {
  border: 1px solid black;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
