const nextBtns = document.querySelectorAll(".next");
const backBtns = document.querySelectorAll(".back");
const steps = document.querySelectorAll(".step");
const submitBtn = document.querySelector(".submit");
const success = document.querySelector(".success");
let formData = {};

function move(current_idx, target_idx) {
  steps[current_idx].classList.remove("active");
  steps[target_idx].classList.add("active");
}

nextBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const step = steps[index];
    const input = step.querySelector("input");
    const field = input.name;

    if (input.reportValidity()) {
      formData[field] = input.value;
      move(index, index + 1);
    }

  });
});

backBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    move(index + 1, index);
  });
});


function handleSubmit(data) {
  data = JSON.stringify(data);
  localStorage.setItem("userData", data);
}

submitBtn.addEventListener("click", function () {
  const lastIndex = steps.length - 1;
  const step = steps[lastIndex];
  const input = step.querySelector("input");
  const field = input.name;


  if (input.reportValidity()) {
    formData[field] = input.value;
    step.classList.remove("active");
    success.style.display = "block";
    handleSubmit(formData);
  }

});