const FAQ = [
  {
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human."
  },
  {
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day."
  },
  {
    question: "How long do cats live",
    answer:
      "Outdoor cats live 5 years on average. Indoor cats live 15 years on average."
  }
];

let questions = document.getElementsByClassName("questions")[0];

for (let i = 0; i < FAQ.length; i++) {
  // get the question & answer from FAQ
  let question = FAQ[i].question;
  let answer = FAQ[i].answer;
  // create div question item
  let question_item = document.createElement("div");
  question_item.className = "question-item";
  // create div question header
  let question_header = document.createElement("div");
  question_header.className = "question-header";
  // create button
  let btn = document.createElement("button");
  btn.className = "faq-toggle";
  btn.textContent = "►";
  // create paragraph for question
  let q = document.createElement("p");
  q.textContent = question;
  // create paragraph for answer
  let ans = document.createElement("p");
  ans.className = "ans";
  ans.textContent = answer;
  // put the button and qustion in question_header
  question_header.appendChild(btn);
  question_header.appendChild(q);
  // put the question_header and answer in question_item
  question_item.appendChild(question_header);
  question_item.appendChild(ans);
  // put the question_item in the questions div
  questions.appendChild(question_item);
  // add event to the button
  question_header.addEventListener("click", function () {
    ans.classList.toggle("show");
    btn.classList.toggle("rotate");
  });
}