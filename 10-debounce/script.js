let input = document.getElementById("searchInput");
const API_URL = "https://api.datamuse.com/sug?s=";
// "https://dummyjson.com/products/search?q=";

function debounce(callback, interval) {
  if (typeof callback !== "function") {
    throw new Error("The callback must be a function");
  }
  if (typeof interval !== "number" || interval < 0) {
    throw new Error("The interval must be a positive number");
  }
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), interval);
  };
}

async function search(str) {
  if (str === "") {
    return [];
  }

  try {
    const response = await fetch(API_URL + encodeURIComponent(str));
    if (!response.ok) throw new Error("Network Response Faild");
    let data = await response.json();
    return data.map(item => item.word);
  } catch (err) {
    throw err;
  }
}

const myDebounce = debounce(async str => {
  let arr = await search(str);
  let searchRes = document.querySelector(".content");
  searchRes.innerHTML = "";
  let fragment = document.createDocumentFragment();
  arr.forEach(title => {
    let p = document.createElement("p");
    p.textContent = title;
    p.addEventListener("click", () => {
      window.open("https://www.google.com/search?q=" + encodeURIComponent(p.textContent), "_blank");
    });
    fragment.appendChild(p);
  });
  searchRes.appendChild(fragment);
}, 300);

input.addEventListener("input", () => myDebounce(input.value));