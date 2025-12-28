async function getData() {
  let response = await fetch("https://picsum.photos/v2/list?page=1&limit=10");
  let data = await response.json();
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(data[i].download_url);
  }
  return arr;
}

async function showImages() {
  let index = 0;
  let images = await getData();
  let image = document.querySelector("img");
  image.src = images[index];

  let next_btn = document.querySelector(".next-btn");
  let prev_btn = document.querySelector(".prev-btn");

  function showNext() {
    image.src = images[index < images.length - 1 ? ++index : index = 0];
  }

  function showPrev() {
    image.src = images[index > 0 ? --index : index = images.length - 1];
  }

  let id;
  function resetAutoSlide() {
    clearInterval(id);
    id = setInterval(() => {
      showNext();
    }, 2000);
  }

  next_btn.addEventListener("click", function () {
    showNext();
    resetAutoSlide();
  });

  prev_btn.addEventListener("click", function () {
    showPrev();
    resetAutoSlide();
  });
  resetAutoSlide();
}

showImages();