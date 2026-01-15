const BASE_URL = "https://api.frontendeval.com/fake/word";
const input = document.getElementById("inp");
const res = document.getElementById("res");
const h1 = document.querySelector("h1");
const btn = document.getElementById("btn");
const sucess = document.getElementById("sucess");
const faild = document.getElementById("faild");

let attempts = 6;
let tries = 0;
let finish = false;
let word;
let wordMap = new Map();

input.addEventListener("keyup", async event => {
  let text = input.value;
  if (text.length === 5 && event.key === "Enter") {
    let ok = await isValid(text);
    if (ok === true) {
      check(text);
    }
  }
});

function checkMatching(val) {
  let myMap = new Map();
  for (let i = 0; i < 5; i++) {
    let cnt = myMap.get(val[i]) || 0;
    if (val[i] === word[i]) {
      myMap.set(val[i], cnt + 1);
    } else {
      myMap.set(val[i], cnt);
    }
  }
  return myMap;
}

btn.addEventListener("click", () => init());

function createRow(val) {
  let myMap = checkMatching(val);
  let row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < 5; i++) {
    let div = document.createElement("div");
    div.textContent = val[i];
    if (word[i] === val[i]) {
      div.classList.add("correct");
    } else if (myMap.get(val[i]) < wordMap.get(val[i])) {
      div.classList.add("present");
      let cnt = myMap.get(val[i]) || 0;
      myMap.set(val[i], cnt + 1);
    } else {
      div.classList.add("absent");
    }
    row.appendChild(div);
  }
  res.appendChild(row);
}

function sucessMessage() {
  sucess.textContent = `You correctly guessed the word in ${tries} tries!`;
  sucess.style.display = "block";
  input.style.visibility = "hidden";
}

function faildMessage() {
  faild.textContent = `You haven't guess the word correctly, the word was: (${word})`;
  faild.style.display = "block";
  input.style.visibility = "hidden";
}

function check(val) {
  if (finish || attempts === 0) return;
  input.value = "";
  tries++;
  h1.textContent = `You have ${--attempts} guesses remaining`;
  createRow(val);
  if (word === val) {
    finish = true;
    sucessMessage();
    btn.style.display = "block";
  } else if (attempts < 1) {
    faildMessage();
    btn.style.display = "block";
  }
}

async function isValid(text) {
  const response = await fetch(BASE_URL + "/valid", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: text }) });

  const ok = await response.json();
  return ok;
}

async function getWord() {
  const response = await fetch(BASE_URL);
  const data = await response.text();
  return data;
}

function reset() {
  finish = false;
  tries = 0;
  attempts = 6;
  wordMap.clear();
  sucess.textContent = '';
  sucess.style.display = "none";
  faild.textContent = '';
  faild.style.display = "none";
  btn.style.display = "none";
  input.value = "";
  res.innerHTML = "";
  input.style.visibility = "visible";
  h1.textContent = `You have ${attempts} guesses remaining`;
}

async function init() {
  reset();
  word = await getWord();
  for (const ch of word) {
    let cnt = wordMap.get(ch) || 0;
    wordMap.set(ch, cnt + 1);
  }


}

document.addEventListener("DOMContentLoaded", () => init());