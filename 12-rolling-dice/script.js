const diceMap = {
  0: [[2, 2]],
  1: [
  [1, 1],
  [3, 3]],

  2: [
  [1, 1],
  [2, 2],
  [3, 3]],

  3: [
  [1, 1],
  [1, 3],
  [3, 1],
  [3, 3]],

  4: [
  [1, 1],
  [1, 3],
  [2, 2],
  [3, 1],
  [3, 3]],

  5: [
  [1, 1],
  [1, 3],
  [2, 1],
  [2, 3],
  [3, 1],
  [3, 3]] };


let input = document.getElementById("inp");
let btn = document.getElementById("roll");

function createDices() {
  let val = input.value;
  if (!input.checkValidity()) {
    alert("The input must be between 1 and 99");
    return;
  }
  let dics = document.getElementById("row");
  dics.innerHTML = "";
  for (let i = 0; i < val; i++) {
    let dic = document.createElement("div");
    let index = Math.floor(Math.random() * 6);
    let dicDot = diceMap[index];
    dic.classList.add("dice");
    for (let i = 0; i < dicDot.length; i++) {
      let dot = document.createElement("div");
      dot.style.gridRow = dicDot[i][0];
      dot.style.gridColumn = dicDot[i][1];
      dot.classList.add("dot");
      dic.appendChild(dot);
    }

    dics.appendChild(dic);
  }
}

btn.addEventListener("click", function () {
  createDices();
});