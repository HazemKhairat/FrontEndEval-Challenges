let seconds = document.getElementById("s");
let minutes = document.getElementById("m");
let hours = document.getElementById("h");

function update() {
  const now = new Date();
  const sec = now.getSeconds();
  const mint = now.getMinutes();
  const hor = now.getHours();
  seconds.style.transform = `rotate(${sec * 6}deg)`;
  minutes.style.transform = `rotate(${mint * 6}deg)`;
  hours.style.transform = `rotate(${hor % 12 * 30 + mint * 0.5}deg)`;
}

setInterval(() => update(), 1000);