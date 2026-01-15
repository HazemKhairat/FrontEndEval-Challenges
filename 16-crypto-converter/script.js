let input = document.getElementById("inp");
let select = document.getElementById("currency");
let res = document.getElementById("res");
let up_down = document.getElementById("up_down");
let arr = ["USD", "EUR", "GBP", "CNY", "JPY"];
const URL = "https://api.frontendeval.com/fake/crypto/";
let currency;

arr.forEach(item => {
  let option = document.createElement("option");
  option.value = item;
  option.textContent = item;
  select.append(option);
});

let prev = 0;
let curr;
function upDown() {
  if (prev === 0) {
    prev = Number(res.textContent);
    return;
  }
  curr = Number(res.textContent);
  let total = (curr - prev).toFixed(2);

  if (total > 0) {
    up_down.textContent = "↑ " + total;
    up_down.style.color = "#2ecc71";
  } else {
    up_down.textContent = "↓ " + total;
    up_down.style.color = "#e74c3c";
  }
  prev = curr;
}

async function update(currency) {
  let data = await crypto(currency);
  let num = Number(input.value);
  let total = num / data;
  res.textContent = total.toFixed(2);
  upDown();
  callInterval();
}

select.addEventListener("change", async event => {
  currency = event.target.value;
  if (!input.value || currency === "-") return;
  prev = 0;
  up_down.textContent = "-";
  update(currency);
});

function debounce(callback, interval) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback(...args);
    }, interval);
  };
}

let mydebounce = debounce(update, 300);

input.addEventListener("input", () => {
  if (currency === undefined || input.value === "") return;else
  {
    mydebounce(currency);
  }


});

async function crypto(currency) {
  let response = await fetch(URL + currency);
  let data = await response.json();
  return data.value;
}

let intervalID;
function callInterval() {
  if (intervalID) clearTimeout(intervalID);
  intervalID = setTimeout(() => {
    if (currency === undefined || input.value === "") return;
    update(currency);
  }, 10000);
}