const puppies = [
"https://frontendeval.com/images/puppy-1.jpeg",
"https://frontendeval.com/images/puppy-2.jpeg",
"https://frontendeval.com/images/puppy-3.jpeg",
"https://frontendeval.com/images/puppy-4.jpeg",
"https://frontendeval.com/images/puppy-5.jpeg",
"https://frontendeval.com/images/puppy-6.jpeg",
"https://frontendeval.com/images/puppy-7.jpeg",
"https://frontendeval.com/images/puppy-8.jpeg",
"https://frontendeval.com/images/puppy-9.jpeg",
"https://frontendeval.com/images/puppy-10.jpeg",
"https://frontendeval.com/images/puppy-11.jpeg",
"https://frontendeval.com/images/puppy-12.jpeg"];


const kittens = [
"https://frontendeval.com/images/kitten-1.jpeg",
"https://frontendeval.com/images/kitten-2.jpeg",
"https://frontendeval.com/images/kitten-3.jpeg",
"https://frontendeval.com/images/kitten-4.jpeg",
"https://frontendeval.com/images/kitten-5.jpeg",
"https://frontendeval.com/images/kitten-6.jpeg",
"https://frontendeval.com/images/kitten-7.jpeg",
"https://frontendeval.com/images/kitten-8.jpeg",
"https://frontendeval.com/images/kitten-9.jpeg",
"https://frontendeval.com/images/kitten-10.jpeg",
"https://frontendeval.com/images/kitten-11.jpeg",
"https://frontendeval.com/images/kitten-12.jpeg"];


const mainImage = document.getElementById("image");
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const btn = document.getElementById("btn");
let toggle = true;

function fillRow(row, items, className) {
  items.forEach(item => {
    let img = document.createElement("img");
    img.src = `${item}`;
    img.classList.add(`${className}`);
    img.addEventListener("click", () => {
      mainImage.src = `${item}`;
    });
    row.appendChild(img);
  });
}

function setSpeed(row, speed, ratio) {
  let width = row.offsetWidth / 2;
  row.style.animationDuration = `${width / (speed * ratio)}s`;
}

function controleBtn() {
  btn.addEventListener("click", () => {
    if (toggle) {
      row1.style.animationPlayState = "paused";
      row2.style.animationPlayState = "paused";
      btn.textContent = 'Play';
      toggle = false;
    } else {
      row1.style.animationPlayState = "running";
      row2.style.animationPlayState = "running";
      btn.textContent = 'Pause';
      toggle = true;
    }
  });
}

function init() {
  fillRow(row1, puppies, "puppi");
  fillRow(row1, puppies, "puppi");
  fillRow(row2, kittens, "kitten");
  fillRow(row2, kittens, "kitten");
  setSpeed(row1, 20, 1);
  setSpeed(row2, 10, 1);
  controleBtn();
}

init();