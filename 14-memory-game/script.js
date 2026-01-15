let cards = document.getElementById("cards");
let btn = document.getElementById("btn");
let numbers = [];
let used = [];
let cnt;

for (let i = 1; i <= 18; i++) {
  numbers.push(i);
  numbers.push(i);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}



document.addEventListener("DOMContentLoaded", () => {
  cnt = 18;
  numbers = shuffle(numbers);
  console.log(numbers);
  createCards();
});


btn.addEventListener("click", function () {
  cnt = 18;
  cards.innerHTML = '';
  numbers = shuffle(numbers);
  createCards();
  btn.style.display = "none";
  cards.style.display = "grid";
});

function createCards() {
  for (let i = 0; i < 36; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";
    let back = document.createElement("div");
    back.classList.add("back");
    back.textContent = numbers[i];
    card.appendChild(back);
    card.appendChild(front);
    card.dataset.value = numbers[i];

    card.addEventListener("click", function () {
      if (used.length == 2 || used.includes(card)) return;
      card.classList.toggle("flipped");
      used.push(card);
      if (used.length == 2) {
        let c1 = used[0];
        let c2 = used[1];
        setTimeout(() => {
          if (c1.dataset.value === c2.dataset.value) {
            c1.style.visibility = "hidden";
            c2.style.visibility = "hidden";
            cnt -= 1;
            if (cnt == 0) {
              cards.style.display = "none";
              btn.style.display = "block";
            }
          } else {
            c1.classList.toggle("flipped");
            c2.classList.toggle("flipped");
          }
          used = [];
        }, 1000);
      }
    });

    cards.appendChild(card);
  }
}