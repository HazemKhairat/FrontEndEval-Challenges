const grid = document.getElementById("grid");
const h1 = document.getElementById("h1");
const resetBtn = document.getElementById("resetBtn");
const dorpBtns = document.getElementById("row");
const currColor = document.getElementById("curr_color");

let startIndcies;
let redTurn = true;
let cells;
let btns;
let colors;
let colored;

function markContinuous(continuousCells) {
  continuousCells.forEach(cell => {
    cell.classList.add("mark");
  });
}

function toggleColor(color) {
  currColor.className = `${color}`;
}

function checkDiagonally() {
  for (let i = 0; i < 42; i++) {
    let color = colors[i];
    if (color === 0) continue;

    if (i % 7 <= 3 && i <= 17) {
      if (
      color === colors[i + 8] &&
      color === colors[i + 16] &&
      color === colors[i + 24])
      {
        markContinuous([cells[i], cells[i + 8], cells[i + 16], cells[i + 24]]);
        return true;
      }
    }

    if (i % 7 >= 3 && i <= 20) {
      if (
      color === colors[i + 6] &&
      color === colors[i + 12] &&
      color === colors[i + 18])
      {
        markContinuous([cells[i], cells[i + 6], cells[i + 12], cells[i + 18]]);
        return true;
      }
    }
  }
  return false;
}

function checkVertically(idx) {
  if (idx + 7 >= 42 || idx + 7 * 2 >= 42 || idx + 7 * 3 >= 42) return;
  if (
  colors[idx] == 0 ||
  colors[idx + 7] == 0 ||
  colors[idx + 7 * 2] == 0 ||
  colors[idx + 7 * 3] == 0)

  return false;
  if (
  colors[idx + 7] == colors[idx] &&
  colors[idx + 7 * 2] == colors[idx] &&
  colors[idx + 7 * 3] == colors[idx])
  {
    markContinuous([
    cells[idx],
    cells[idx + 7],
    cells[idx + 7 * 2],
    cells[idx + 7 * 3]]);

    return true;
  }
  return false;
}

function checkHorizontal(idx) {
  const start = idx - idx % 7;
  // console.log(start);
  for (let i = start; i <= start + 3; i++) {
    if (colors[i] == 0) continue;
    if (
    colors[i] === colors[i + 1] &&
    colors[i] === colors[i + 2] &&
    colors[i] === colors[i + 3])
    {
      markContinuous([cells[i], cells[i + 1], cells[i + 2], cells[i + 3]]);
      return true;
    }
  }

  return false;
}

function checkWiner(id) {
  if (checkHorizontal(id) || checkVertically(id) || checkDiagonally()) {
    if (!redTurn) {
      h1.textContent = "Yellow won!";
    } else {
      h1.textContent = "Red won!";
    }
    endGame();
    return true;
  }
  redTurn = !redTurn;
  redTurn ? toggleColor("red") : toggleColor("yellow");
  // console.log(redTurn)
  return false;
}

function endGame() {
  btns.forEach(btn => {
    btn.classList.add("hide");
  });
  resetBtn.classList.remove("hide");
  resetBtn.addEventListener("click", () => {
    resetBtn.classList.add("hide");
    init();
  });
}

function setColor(index) {
  let id = startIndcies[index];
  let cell = cells[id];
  if (redTurn) {
    colors[id] = 1;
    cell.classList.add("red");
    h1.textContent = "Yellow's turn";
  } else {
    colors[id] = 2;
    cell.classList.add("yellow");
    h1.textContent = "Red's turn";
  }
  colored += 1;
  if (!checkWiner(id) && colored >= 42) draw();

  startIndcies[index] -= 7;
}

function draw() {
  h1.innerHTML = "Draw!";
  endGame();
}

function createBtns() {
  for (let i = 0; i < 7; i++) {
    let btn = document.createElement("button");
    btn.classList.add("drop-btn");
    btn.textContent = "Drop";
    btn.addEventListener("click", () => {
      if (startIndcies[i] - 7 < 0) {
        btn.disabled = true;
      }
      setColor(i);
    });
    btns.push(btn);
    dorpBtns.appendChild(btn);
  }
}

function fillGrid() {
  for (let i = 0; i < 42; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    grid.appendChild(cell);
  }
}

function init() {
  if (redTurn) {
    h1.textContent = "Red's turn";
    toggleColor("red");
  } else {
    h1.textContent = "Yellow's turn";
    toggleColor("yellow");
  }
  dorpBtns.innerHTML = "";
  grid.innerHTML = "";
  startIndcies = [35, 36, 37, 38, 39, 40, 41];
  btns = [];
  cells = [];
  colors = new Array(42).fill(0);
  colored = 0;
  createBtns();
  fillGrid();
}

init();