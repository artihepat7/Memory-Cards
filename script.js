const cardsContainer = document.getElementById("cards-container");
const prevArrow = document.getElementById("prev");
const nextArrow = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const addContainer = document.getElementById("add-container");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCard = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");

//active card index
let currentActiveElement = 0;

//all dom cards
const cardEl = [];

//card data
const cardsData = getData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

function init() {
  cardsData.forEach((data, index) => createCards(data, index));
}

function createCards(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  //make first card active
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
  <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>`;
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  cardsContainer.appendChild(card);
  cardEl.push(card);
  updateCardNumber();
}
function updateCardNumber() {
  currentEl.textContent = `${currentActiveElement + 1}/${cardsData.length}`;
}

//get daat from localstorage
function getData() {
  let card = JSON.parse(localStorage.getItem("cards"));
  console.log(card);
  return card === null ? [] : card;
}

//set data into localstorage
function setData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

init();

//event listeners
nextArrow.addEventListener("click", () => {
  cardEl[currentActiveElement].className = "card left";
  currentActiveElement++;
  if (currentActiveElement > cardsData.length - 1) {
    currentActiveElement = cardsData.length - 1;
  }
  cardEl[currentActiveElement].className = "card active";
  updateCardNumber();
});

prevArrow.addEventListener("click", () => {
  cardEl[currentActiveElement].className = "card right";
  console.log(currentActiveElement);
  currentActiveElement--;
  if (currentActiveElement < 0) {
    currentActiveElement = 0;
  }
  cardEl[currentActiveElement].className = "card active";
  updateCardNumber();
});

//add new card event listener
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

addCard.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };
    cardsData.push(newCard);

    setData(cardsData);
    init();
    questionEl.value = "";
    answerEl.value = "";
    //   console.log(newCard);

    addContainer.classList.remove("show");
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
