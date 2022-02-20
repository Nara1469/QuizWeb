// variables
const questionArray = [
  {
    question: "String value must be enclosed within ________ when being assigned to variables.",
    answers: [
      "commas",
      "curly brackets",
      "quotes",
      "parenthesis"
    ],
    correct: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "Javascript",
      "Terminal/Bash",
      "for loops",
      "console.log"
    ],
    correct: "console.log"
  },
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      "strings",
      "booleans",
      "alerts",
      "numbers"
    ],
    correct: "alerts"
  },
  {
    question: "The condition is an if/else statement is enclosed within ______.",
    answers: [
      "square brackets",
      "curly brackets",
      "quotes",
      "parenthesis"
    ],
    correct: "curly brackets"
  },
  {
    question: "Who invented JavaScript?",
    answers: [
      "Douglas Crockford",
      "Sheryl Sandberg",
      "Tim Berners-Lee",
      "Brendan Eich"
    ],
    correct: "Brendan Eich"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: [
      "Angular",
      "jQuery",
      "RequireJS",
      "ESLint"
    ],
    correct: "ESLint"
  }
];

const timer = document.getElementById("timer");

const startScreen = document.querySelector("#start-screen");
const startButton = document.getElementById("start");

const testScreen = document.querySelector("#q-a-screen");
const questionId = document.getElementById("question");
const answerList = document.getElementById("answer-list");
const showResult = document.querySelector("#result");

const endScreen = document.querySelector("#end-screen");
const currentScore = document.getElementById("current-score");
const studentName = document.getElementById("student-name");
const submitButton = document.getElementById("submit");

const resultScreen = document.querySelector("#result-screen");
const studentList = document.querySelector("#result-list");
const againButton = document.getElementById("start-again");
const clearButton = document.getElementById("clear-score");

let students = [];
let sortedArray = [];

let index = 0;
let timerCount = 100;
let realTimeScore = 0;

// ---------- functions for Screen -------------

function callStartScreen() {
  startScreen.classList.remove("hide");
  resultScreen.classList.add("hide");
  // wait for startButton event listener
}

function callTestScreen() {
  testScreen.classList.remove("hide");
  startScreen.classList.add("hide");
  timerCount = 75;
  realTimeScore = 0;
  index = 0;
  startTimer();
  callNextQuestion();
}

function callEndScreen() {
  endScreen.classList.remove("hide");
  testScreen.classList.add("hide");
  currentScore.textContent = realTimeScore;
  // wait for submitButton event listener
}

function callResultScreen() {
  resultScreen.classList.remove("hide");
  endScreen.classList.add("hide");
  renderList();
  againButton.addEventListener("click", callStartScreen);
  clearButton.addEventListener("click", clearStorage);
}

// ------------------- function ------------------------

// Testing Timer
function startTimer() {
  timerClock = setInterval(function () {
    timerCount--;
    timer.textContent = timerCount;
    if (timerCount <= 0) {
      //Clears interval and stops timer
      clearInterval(timerClock);
      timerCount = 0;
      timer.textContent = timerCount;
    }
  }, 1000);
}

// printing questions on screen
function callNextQuestion() {
  showResult.textContent = "";
  if (index < questionArray.length && timerCount > 0) {
    questionId.textContent = questionArray[index].question;
    for (let j = 0; j < 4; j++) {
      answerList.children[j].textContent = questionArray[index].answers[j];
    }
  }
}

// printing test taker's scores to result screen
function renderList() {
  studentList.textContent = "";
  sortMaxToMin();
  for (let i = 0; i < sortedArray.length; i++) {
    const tempName = sortedArray[i].initial;
    const tempScore = sortedArray[i].score;
    const newLi = document.createElement("li");
    newLi.textContent = tempName + ": " + tempScore;
    studentList.appendChild(newLi);
  }
}

// sorting test scores from maximum to down
function sortMaxToMin() {
  const tempArray = [...students];
  sortedArray = [];
  while (tempArray.length > 0) {
    let maxIndex = 0;
    for (let j = 0; j < tempArray.length; j++) {
      const element = tempArray[j];
      if (element.score > tempArray[maxIndex].score) {
        maxIndex = j;
      }
    }
    sortedArray.push(tempArray[maxIndex]);
    tempArray.splice(maxIndex, 1);
  }
}

// clears local storage and object array
function clearStorage() {
  localStorage.clear();
  studentList.textContent = "";
  students = [];
}

function init() {
  startScreen.classList.remove("hide");
  localStorage.clear();
}

// -------------- addEventListener ------------------

// during the test
answerList.addEventListener("click", function (event) {
  const element = event.target;
  // let timeOutId;
  const answer = questionArray[index].correct;
  if (index < questionArray.length && timerCount > 0) {
    if (element.matches("li") === true) {
      if (element.textContent === answer) {
        showResult.textContent = "Right";
      } else {
        showResult.textContent = "Wrong";
        timerCount = timerCount - 10;  // wrong answer cuts timer by 10 seconds
      }
      // timeOutId = setTimeout(function() {
        index++;
        callNextQuestion();
      // }, 100);
      // clearTimeout(timeOutId);
    }
  }
  if (timerCount <= 0) {
    realTimeScore = 0;
    timerCount = 0;
    timer.textContent = timerCount;
    callEndScreen();
  } else {
    if (index === questionArray.length) {
      realTimeScore = timerCount;
      timerCount = 0;
      timer.textContent = timerCount;
      callEndScreen();
    }
  }
});

// in the startScreen
startButton.addEventListener("click", callTestScreen);

// in the endScreen 
submitButton.addEventListener("click", function () {
  const inName = studentName.value.trim();
  const tempName = inName.toUpperCase();
  if (tempName) {
    students.push({ initial: tempName, score: realTimeScore });
    localStorage.setItem("students", JSON.stringify(students));
    callResultScreen();
  } else {
    alert("Name required. Try again.");
  }
  studentName.textContent = "";
});

init();
