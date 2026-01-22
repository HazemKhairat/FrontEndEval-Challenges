const grid = document.getElementById("grid");
const selectionBox = document.createElement("div");
let cellsArr = [];
let cellsBounds = [];
let isSelecting = false;
let startX;
let startY;

function getCellBounds() {
  cellsArr.forEach(cell => {
    let bounds = cell.getBoundingClientRect();
    cellsBounds.push(bounds);
  });
}

function updateCells(left, top, right, bottom) {
  for (let i = 0; i < cellsArr.length; i++) {
    let bounds = cellsBounds[i];
    let cell = cellsArr[i];
    if (
    bounds.left >= left &&
    bounds.right <= right &&
    bounds.top >= top &&
    bounds.bottom <= bottom)
    {
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }
  }
}

function updateSelectionBox(x1, y1, x2, y2) {
  let bounds = getBoxBounds(x1, y1, x2, y2);
  const left = bounds.left;
  const top = bounds.top;
  const right = bounds.right;
  const bottom = bounds.bottom;
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  selectionBox.style.left = left + "px";
  selectionBox.style.top = top + "px";
  selectionBox.style.width = width + "px";
  selectionBox.style.height = height + "px";
  updateCells(left, top, right, bottom);
}

function getBoxBounds(x1, y1, x2, y2) {
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const right = Math.max(x1, x2);
  const bottom = Math.max(y1, y2);
  return { left, top, right, bottom };
}

function setSelectionBox() {
  selectionBox.classList.add("selection-box");
  document.body.appendChild(selectionBox);

  document.addEventListener("mousedown", e => {
    if (e.button != 0) return;
    isSelecting = true;
    cellsBounds = [];
    getCellBounds();
    startX = e.clientX;
    startY = e.clientY;
    document.body.style.userSelect = "none";


  });

  document.addEventListener("mousemove", e => {
    if (!isSelecting) return;

    let currX = e.clientX;
    let currY = e.clientY;
    selectionBox.style.display = "block";
    updateSelectionBox(startX, startY, currX, currY);

  });

  document.addEventListener("mouseup", () => {
    isSelecting = false;
    selectionBox.style.width = selectionBox.style.height = "0";
    document.body.style.userSelect = "";
    selectionBox.style.display = "none";
  });
}

function fillRow(row) {
  for (let i = 0; i < 10; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    row.appendChild(cell);
    cellsArr.push(cell);
  }
}

function fillGrid() {
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    fillRow(row);
    grid.appendChild(row);
  }
}

function init() {
  fillGrid();
  setSelectionBox();
}

init();