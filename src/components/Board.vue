<template>
  <div>
    <h2>Turn: {{ whosTurn }}</h2>
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
      turnCount: 0,
    };
  },
  methods: {
    turn(x, y) {
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