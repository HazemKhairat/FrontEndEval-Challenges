let btn = document.getElementsByClassName("btn")[0];

btn.addEventListener("click", function () {
  let controls = document.getElementsByClassName("controls")[0];
  let P = parseFloat(controls.getElementsByTagName("input")[0].value);
  let r = parseFloat(controls.getElementsByTagName("input")[1].value) / 100 / 12;
  let n = parseFloat(controls.getElementsByTagName("input")[2].value) * 12;

  let res = P * (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  let p = document.getElementsByClassName("result")[0];
  p.innerHTML = `Your monthly mortgage payment will be: $${res.toFixed(2)}`;
});