let start = document.querySelector(".start");
let show = document.querySelector(".show");
let pause = document.querySelector(".pause");
let reset = document.querySelector(".reset");
let time = document.querySelector(".time");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let p = document.querySelector("p");
let id;
let h;
let m;
let s;

function getInputs() {
  h = Number(hours.value);
  m = Number(minutes.value);
  s = Number(seconds.value);
}

function valid(H, M, S) {
  isNumber =
  typeof H == "number" && typeof M == "number" && typeof S == "number";
  isPositve = H >= 0 && M >= 0 && S >= 0;
  isEmpty = hours.value === "" || minutes.value === "" || seconds.value === "";
  return isNumber && isPositve && !isEmpty;
}

function notifyUser() {
  if (Notification.permission === "granted") {
    new Notification("Timer Finished");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Timer Finished");
      } else {
        alert("Timer Finished");
      }
    });
  } else {
    alert("Timer Finished");
  }
}

start.addEventListener("click", function () {
  getInputs();
  if (!valid(h, m, s)) {
    return;
  }

  time.style.display = "none";
  show.style.display = "inline";
  p.innerHTML = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${
  s > 9 ? s : "0" + s
  }`;
  id = setInterval(function () {
    if (s == 0 && m == 0 && h == 0) {
      clearInterval(id);
      notifyUser();
      return;
    } else {
      s -= 1;
      if (s < 0) {
        s = 59;
        m -= 1;
      }

      if (m < 0) {
        m = 59;
        h -= 1;
      }

      if (h < 0) {
        h = 0;
      }
    }

    p.innerHTML = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${
    s > 9 ? s : "0" + s
    }`;
  }, 1000);
});

pause.addEventListener("click", function () {
  hours.value = h;
  minutes.value = m;
  seconds.value = s;
  show.style.display = "none";
  time.style.display = "inline";
  clearInterval(id);
});

reset.addEventListener("click", function () {
  show.style.display = "none";
  time.style.display = "inline";
  clearInterval(id);
});