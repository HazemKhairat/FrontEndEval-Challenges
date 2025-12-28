let inputs = document.querySelectorAll("input");

function controlInput(inp) {
  inp.addEventListener("keydown", function (event) {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (
    (event.key < "0" || event.key > "9") &&
    event.key != "Backspace" &&
    event.key != "Delete" &&
    event.key != "Tab")
    {
      event.preventDefault();
    }

    if (event.key === "Backspace" && inp.previousElementSibling) {
      if (inp.value === "") {
        inp.previousElementSibling.focus();
      }
    }
  });
}

function controlPaste(inp, i) {
  inp.addEventListener("paste", function (event) {
    event.preventDefault();
    if (i > 0) {
      return;
    }
    const pastedValue = event.clipboardData.getData("text/plain");
    const numbersOnly = pastedValue.replace(/\D/g, "");
    let index;
    for (
    index = i;
    index < Math.min(inputs.length, numbersOnly.length);
    index++)
    {
      inputs[index].value = numbersOnly[index];
    }
    let curr = Math.min(inputs.length - 1, index);
    inputs[curr].focus();
  });
}

function move(inp) {
  inp.addEventListener("input", function () {
    if (inp.value.length === 1 && inp.nextElementSibling) {
      inp.nextElementSibling.focus();
    }
  });
}

function removeRed(inp) {
  inp.addEventListener("focus", function () {
    inp.classList.remove("error");
  });
}

function submitCode(code) {
  alert("Your Code Submited Successfully");
  inputs.forEach(inp => inp.value = "");
}

let btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  let allFilled = true;
  inputs.forEach(inp => {
    if (inp.value === "") {
      allFilled = false;
      inp.classList.add("error");
    }
  });

  if (!allFilled) {
    return;
  } else {
    let code = "";
    inputs.forEach(inp => code += inp.value);
    submitCode(code);
  }
});

for (let i = 0; i < inputs.length; i++) {
  removeRed(inputs[i]);
  controlInput(inputs[i]);
  controlPaste(inputs[i], i);
  move(inputs[i]);
}