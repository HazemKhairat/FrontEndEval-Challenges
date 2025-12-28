let btns = document.getElementsByClassName("btn");
let undoBtn = document.getElementById("undo");
let redoBtn = document.getElementById("redo");
let counter = document.getElementById("counter");
let content = document.querySelector(".content");
let lastVal = null;
let lastRes = null;

let dequeUnDo = [];
let dequeReDo = [];
let cnt = 0;

function controlHistory() {
  let row = document.createElement("div");
  let val = document.createElement("span");
  let res = document.createElement("span");

  row.classList.add("row");

  val.textContent = lastVal;

  res.textContent = `(${lastRes} -> ${cnt})`;

  row.appendChild(val);
  row.appendChild(res);
  content.appendChild(row);
}

undoBtn.addEventListener("click", function () {
  if (dequeUnDo.length === 0) {
    redoBtn.disabled = true;
    return;
  }
  redoBtn.disabled = false;


  let val = dequeUnDo.pop();

  dequeReDo.push(val);

  cnt -= val;
  counter.textContent = cnt;

  let child = content.lastElementChild;
  if (!child) return;

  let spans = child.children;

  lastVal = spans[0].textContent;
  lastRes = cnt;

  content.removeChild(child);
});

redoBtn.addEventListener("click", function () {
  if (dequeReDo.length === 0) return;
  if (dequeReDo.length === 1) redoBtn.disabled = true;

  let val = dequeReDo.pop();
  dequeUnDo.push(val);

  lastVal = val;
  lastRes = cnt;

  cnt += val;
  counter.innerHTML = cnt;

  controlHistory();
});


for (let i = 2; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    dequeReDo = [];
    redoBtn.disabled = true;

    let strVal = btns[i].innerHTML;
    let numVal = Number(strVal);

    lastVal = btns[i].textContent;
    lastRes = cnt;

    cnt += numVal;
    dequeUnDo.push(numVal);

    if (dequeUnDo.length > 50) {
      dequeUnDo.shift();
    }

    counter.textContent = cnt;

    controlHistory();
  });
}