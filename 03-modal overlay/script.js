let show_btn = document.querySelector(".show-btn");
let container = document.querySelector(".container");
let x_btn = document.querySelector(".x-btn");
let acc_btn = document.querySelector(".acc-btn");
let last_page = document.querySelector(".last-page");

show_btn.addEventListener("click", function () {
  show_btn.style.display = "none";
  container.style.display = "flex";
});

x_btn.addEventListener("click", function () {
  container.style.display = "none";
  show_btn.style.display = "block";
});

acc_btn.addEventListener("click", function () {
  container.style.display = "none";
  last_page.style.display = "block";
});