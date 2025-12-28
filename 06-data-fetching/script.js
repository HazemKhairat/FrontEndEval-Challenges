const x_numbers = document.querySelector(".x-numbers");
const y_numbers = document.querySelector(".y-numbers");
let btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
  window.location.reload(true);
});

for (let i = 1; i <= 10; i++) {
  const div = document.createElement("div");
  div.textContent = i;
  x_numbers.append(div);
}

for (let i = 30; i >= 0; i -= 10) {
  const div = document.createElement("div");
  div.textContent = i;
  y_numbers.append(div);
}

const API_URL =
"https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";

async function getData() {
  let response = await fetch(API_URL);
  let data = await response.text();

  let numbers = data.trim().split("\n").map(Number);
  return numbers;
}

async function mapData() {
  let arr = await getData();
  let myMap = new Map();

  for (let i = 0; i < arr.length; i++) {
    let curr = myMap.get(arr[i]);
    curr > 0 ? myMap.set(arr[i], curr + 1) : myMap.set(arr[i], 1);
  }
  return myMap;
}

async function start() {
  let myMap = await mapData();

  let chart_list = document.querySelector(".chart-list");

  for (let i = 1; i <= 10; i++) {
    let value = myMap.get(i);
    let chart = document.createElement("div");
    chart.classList.add("chart");
    chart.textContent = value;
    chart.style.height = value * (541 / 30) + "px";
    chart_list.append(chart);
  }
}

start();