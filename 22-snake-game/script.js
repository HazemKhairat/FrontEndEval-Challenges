import { DoublyList } from "./linkedList.js";

const GRID_SIZE = 20;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const start = document.getElementById("start");
const board = document.getElementById("board");
const end = document.getElementById("end");
const grid = document.getElementById("grid");
const currScore = document.getElementById("currScore");
const highestScore = document.getElementById("highestScore");
const easyBtn = document.getElementById("easy");
const medBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const playAgainBtn = document.getElementById("playAgain");

let snake;
let snakeCells;
let cells;
let dirc;
let prevDirc;
let currVal;
let applePos;
let intervalId;
let curr_score;
let endInterval;

function startGame(speed) {
  clearInterval(intervalId);
  board.classList.remove("hide");
  start.classList.add("hide");
  initInterval(speed);
}

function playAgain() {
  init();
  end.classList.add("hide");
  start.classList.remove("hide");
}

function endGame() {
  board.classList.add("hide");
  end.classList.remove("hide");
}

function initBtns() {
  easyBtn.addEventListener("click", () => {
    startGame(150);
  });
  medBtn.addEventListener("click", () => {
    startGame(100);
  });
  hardBtn.addEventListener("click", () => {
    startGame(80);
  });
  playAgainBtn.addEventListener("click", () => {
    playAgain();
  });
}

function gameOver() {
  updateScore();
  clearInterval(intervalId);
  endGame();
}

function fillGrid() {
  for (let i = 0; i < TOTAL_CELLS; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    grid.appendChild(cell);
  }
}

function createNewApple() {
  let pos;
  do {
    pos = Math.floor(Math.random() * TOTAL_CELLS);
  } while (snakeCells.has(pos));

  let cell = cells[pos];
  cell.classList.add("apple");
  return pos;
}

function prepareMovement() {
  document.addEventListener("keydown", event => {
    if (!endInterval) return;
    const key = event.key;
    let changed = false;
    if (key === "ArrowLeft" && prevDirc !== "right") {
      dirc = "left";
      changed = true;
    } else if (key === "ArrowRight" && prevDirc !== "left") {
      dirc = "right";
      changed = true;
    } else if (key === "ArrowUp" && prevDirc !== "down") {
      dirc = "up";
      changed = true;
    } else if (key === "ArrowDown" && prevDirc !== "up") {
      dirc = "down";
      changed = true;
    }

    if (changed) {
      endInterval = false;
    }
  });
}

function validBoundries(pos, direction) {
  if (pos < 0 || pos >= TOTAL_CELLS) {
    return false;
  } else if (pos % GRID_SIZE === 0 && direction === "right") {
    return false;
  } else if ((pos + 1) % GRID_SIZE === 0 && direction === "left") {
    return false;
  }
  return true;
}

function change(val) {
  const tailPos = snake.tail.val;
  const oldHead = snake.head.val;
  cells[oldHead].classList.remove("snakeHead");
  cells[oldHead].classList.add("snakeBody");
  const newHead = oldHead + val;
  const willRemoveTail = newHead !== applePos;
  if (snakeCells.has(newHead) && !(willRemoveTail && newHead === tailPos)) {
    gameOver();
    return;
  }
  if (!validBoundries(newHead, dirc)) {
    gameOver();
    return;
  }
  snake.push_front(newHead);
  snakeCells.add(newHead);
  if (newHead === applePos) {
    cells[applePos].classList.remove("apple");
    applePos = createNewApple();
    currScore.textContent = `Score: ${++curr_score}`;
  } else {
    cells[tailPos].classList.remove("snakeBody");
    snake.pop_back();
    snakeCells.delete(tailPos);
  }
}

function update() {
  if (dirc === "up") {
    currVal = -GRID_SIZE;
  } else if (dirc === "left") {
    currVal = -1;
  } else if (dirc === "right") {
    currVal = 1;
  } else if (dirc === "down") {
    currVal = GRID_SIZE;
  }
  change(currVal);
  colorSnake();
  prevDirc = dirc;
}

function updateScore() {
  if (!localStorage.getItem("highestScore")) {
    localStorage.setItem("highestScore", 0);
  }
  const score = Number(localStorage.getItem("highestScore"));
  const maxScore = Math.max(score, curr_score);
  localStorage.setItem("highestScore", maxScore);
  highestScore.textContent = `Hi-Score: ${maxScore}`;
  currScore.textContent = `Score: ${0}`;
}

function colorSnake() {
  const headVal = snake.head.val;
  cells[headVal].classList.add("snakeHead");
}

function initSnake(arr) {
  arr.forEach(val => {
    snake.push_back(val);
    cells[val].classList.add("snakeBody");
  });
}

function initInterval(speed) {
  intervalId = setInterval(() => {
    update();
    endInterval = true;
  }, speed);
}

function init() {
  endInterval = false;
  grid.innerHTML = "";
  cells = [];
  curr_score = 0;

  fillGrid();
  snake = new DoublyList();
  snakeCells = new Set();
  initSnake([190, 210, 230]);
  colorSnake();
  applePos = createNewApple();
  dirc = "up";
  prevDirc = "left";
  currVal = -GRID_SIZE;
  highestScore.textContent = `Hi-Score: ${localStorage.getItem("highestScore") || 0}`;
}

init();
initBtns();
prepareMovement();