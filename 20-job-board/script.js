const ID_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const POST_URL = "https://hacker-news.firebaseio.com/v0/item/";
const board = document.getElementById("board");
const btn = document.getElementById("btn");

let data;
let lastIdx = 0;

function parseJob(title) {
  const regex = /^(?<company>.+?)\s+(?<description>(?:is\s+hiring|hiring)\s+.+)$/i;

  const match = title.trim().match(regex);
  if (!(match !== null && match !== void 0 && match.groups)) {
    return {
      company: title,
      description: "" };

  }
  return match.groups;
}

function fillCard(job, card, time) {
  let h3 = document.createElement("h3");
  h3.textContent = job.company;
  card.appendChild(h3);
  if (job.description) {
    let p = document.createElement("p");
    p.textContent = job.description;
    card.appendChild(p);
  }

  let date = new Date(time * 1000);
  let dateEl = document.createElement("p");
  dateEl.classList.add("date");
  dateEl.textContent = date.toLocaleDateString();
  card.appendChild(dateEl);
}

function openJob(card, url) {
  card.addEventListener("click", () => {
    window.open(url, "_blank");
  });
}

function fillBoard(posts) {
  const len = posts.length;
  for (let i = 0; i < len; i++) {
    // console.log(posts[i]);
    let card = document.createElement("div");
    card.classList.add("card");
    if (posts[i].url) {
      openJob(card, posts[i].url);
    } else {
      openJob(card, `https://news.ycombinator.com/item?id=${posts[i].id}`);
    }
    const title = posts[i].title;
    let job = parseJob(title);
    fillCard(job, card, posts[i].time);
    board.appendChild(card);
  }
}

async function getIds() {
  const response = await fetch(ID_URL);
  const data = await response.json();
  return data;
}

async function getPosts(numOfPosts) {
  numOfPosts = Math.min(numOfPosts, data.length);
  const ids = data.slice(lastIdx, lastIdx + numOfPosts);

  const promisesArr = ids.map(id => {
    return fetch(`${POST_URL}${id}.json`).then(res => res.json());
  });

  const posts = await Promise.all(promisesArr);
  // console.log(posts);
  lastIdx += numOfPosts;
  if (lastIdx >= data.length) btn.style.display = "none";
  fillBoard(posts);
}

async function init() {
  data = await getIds();
  getPosts(9);
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    await getPosts(6);
    btn.disabled = false;
  });
}

init();