<template>
  <div>
    <h2 v-if="!winner" data-cy="whosTurn">Turn: {{ whosTurn }}</h2>
    <h2 v-else data-cy="winner">{{ winner }}</h2>
    <button @click.prevent="playAgain" data-cy="reload">Play New Game</button>
    <ul v-for="(row, x) of board" v-bind:key="x" data-cy="row">
      <li v-for="(col, y) of row" v-bind:key="y" v-on:click="turn(x, y)" data-cy="col">
        {{ board[x][y] }}
      </li>
    </ul>

    <h6 data-cy="errMessage">{{ message }}</h6>
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
        this.diagonalCheck();
      }
    },
    
    horizontalCheck() {
      //checking rows starts from first row
      for (let row = 0; row < this.rows - 1; row++) {
        for (let col = 0; col < this.cols - 1; col++) {
          let nextValue = this.board[row][col + 1]
          this.winnerCheck(row, col, nextValue);
        }
      }
    },
    verticalCheck() {
      //checking columns starts from first column
      for (let col = 0; col < this.cols - 1; col++) {
        for (let row = 0; row < this.rows - 1; row++) {
          let nextValue = this.board[row + 1][col]
          this.winnerCheck(row, col, nextValue);
        }
      }
    },
    diagonalCheck() {
      //checking from top-left corner to bottom-right starts at first row
      for (let rowStart = 0; rowStart <= this.rows - 5; rowStart++) {
        for (
          let row = rowStart, col = 0;
          row < this.rows - 1 && col < this.cols - 1;
          row++, col++
        ) {
          let nextValue = this.board[row + 1][col + 1]
          this.winnerCheck(row, col, nextValue)
        }
      }
      //checking from top-left corner to bottom-right starts at first column
      for (let colStart = 1; colStart <= this.cols - 5; colStart++) {
        for (
          let row = 0, col = colStart;
          row < this.rows - 1 && col < this.cols - 1;
          row++, col++
        ) {
          let nextValue = this.board[row + 1][col + 1]
          this.winnerCheck(row, col, nextValue)
        }
      }
      //checking from bottom-left corner to top-right starts at last row
      for (let rowStart = this.rows - 1; rowStart >= 4; rowStart--) {
        for (
          let row = rowStart, col = 0;
          row > 0 && col < this.cols - 1;
          row--, col++
        ) {
          let nextValue = this.board[row - 1][col + 1]
          this.winnerCheck(row, col, nextValue)
        }
      }
      //checking from bottom-left corner to top-right starts from 1 column
      for (let colStart = 1; colStart <= this.cols - 5; colStart++) {
        for (
          let row = this.rows - 1, col = colStart;
          row > 0 && col < this.cols - 1;
          row--, col++
        ) {
          let nextValue = this.board[row - 1][col + 1]
          this.winnerCheck(row, col, nextValue)
        }
      }
    },
    winnerCheck(row, col, nextVal) {
      if (
            this.board[row][col] === nextVal &&
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
  max-width: 550px;
  margin: 0 auto;
  padding: 0;
}
li {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (min-width: 320px) and (max-width: 767px) {
  li {
    width: 20px;
    height: 20px;
  }
  ul {
    max-width: 290px;
    font-size: 10px;
  }
}
</style>
