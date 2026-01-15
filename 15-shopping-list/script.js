let input = document.getElementById("search_input");
let result = document.getElementById("res");
let table = document.getElementById("table");

let shopping_list = [];
const URL = "https://api.frontendeval.com/fake/food/";

async function search(text) {
  const response = await fetch(URL + text);
  let data = await response.json();
  return data;
}

function remove(index) {
  shopping_list.splice(index, 1);
  showData();
}

function change(index) {
  let td = document.getElementById(`item${index}`);
  td.classList.toggle("line");
}

function showData() {
  table.innerHTML = `<tr>
          <th>Item</th>
          <th>Check / Uncheck</th>
          <th>Delete</th>
        </tr>`;
  let content = "";
  shopping_list.forEach((item, index) => {
    content += `
      <tr>
          <td id="item${index}">${item}</td>
          <td><input onclick=change(${index}) type="checkbox"></td>
          <td><button onclick="remove(${index})">X</button></td>
        </tr>
      `;
  });
  table.innerHTML += content;
}

function debounce(callback, interval) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback(...args);
    }, interval);
  };
}

const helper = async text => {
  let data = await search(text);
  result.innerHTML = "";
  if (!data || data.length === 0) {
    result.innerHTML = "No results found";
    return;
  }
  data.forEach(item => {
    let p = document.createElement("p");
    p.classList.add("p-row");
    p.textContent = item;
    p.addEventListener("click", () => {
      shopping_list.push(item);
      showData();
      result.innerHTML = "";
      input.value = "";
    });
    result.appendChild(p);
  });
};

let myDebounce = debounce(helper, 1000);

input.addEventListener("input", () => {
  let text = input.value;
  if (text.length >= 2) {
    result.innerHTML = "searching...";
    myDebounce(text);
  } else {
    result.innerHTML = "";
  }
});