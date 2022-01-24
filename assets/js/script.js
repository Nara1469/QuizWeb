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
const nextButton = document.getElementById("next");

const endScreen = document.querySelector("#end-screen");
const currentScore = document.querySelector("#current-score");
const studentName = document.getElementById("student-name");
const submitButton = document.getElementById("submit");

const resultScreen = document.querySelector("#result-screen");
const studentList = document.querySelector("#result-list");
const againButton = document.getElementById("start-again");
const clearButton = document.getElementById("clear-score");

let students = [
  {
    initial: "",
    score: 0
  }
];

let index = 0;
let timerCount = 100;
let realTimeScore = 0;

// functions for Screen changes

function callStartScreen() {
  startScreen.classList.remove("hide");
  resultScreen.classList.add("hide");
  // wait for startButton event listener
}

function callTestScreen() {
  testScreen.classList.remove("hide");
  startScreen.classList.add("hide");
  timerCount = 100;
  realTimeScore = 0;
  index = 0;
  startTimer();
  callNextQuestion();
  // wait for nextButton event listener
}

function callEndScreen() {
  endScreen.classList.remove("hide");
  testScreen.classList.add("hide");
  studentName.textContent = "";
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

function init() {
  startScreen.classList.remove("hide");

}

function renderList() {
  let tempName = JSON.parse(localStorage.getItem("names"));
  let tempScore = JSON.parse(localStorage.getItem("scores"));
  const newLi = document.createElement("li");
  newLi.textContent = tempName + ": " + tempScore;
  studentList.appendChild(newLi);
  // for (let index = 0; index < students.length; index++) {
  //   const student = students[index];
  //   const newLi = document.createElement("li");
  //   newLi.textContent = tempName + ": " + tempScore;
  //   studentList.appendChild(newLi);
  // }
}

function clearStorage(event) {
  event.preventDefault();
  localStorage.clear();
}

function randomizeList() {

  let randoList = [];
  for (let i = 0; i < questionArray.length; i++) {
    randoList[i] = Math.floor(Math.random() * questions.length);
  }
}

function callNextQuestion() {
  showResult.textContent = " ";
  if (index < questionArray.length && timerCount > 0) {
    questionId.textContent = questionArray[index].question;
    for (let j = 0; j < 4; j++) {
      answerList.children[j].textContent = questionArray[index].answers[j];
    }
  }
}

// during the test
answerList.addEventListener("click", function (event) {
  const element = event.target;
  const answer = questionArray[index].correct;
  if (index < questionArray.length && timerCount > 0) {
    if (element.matches("li") === true) {
      if (element.textContent === answer) {
        showResult.textContent = "Right";
      } else {
        showResult.textContent = "Wrong";
        timerCount = timerCount - 10;  // wrong answer cuts timer by 10 seconds
      }
    }
  }
  if (timerCount <= 0) {
    realTimeScore = 0;
    timerCount = 0;
    timer.textContent = timerCount;
    callEndScreen();
  } else {
    if (index === questionArray.length - 1) {
      realTimeScore = timerCount;
      timerCount = 0;
      timer.textContent = timerCount;
      callEndScreen();
    }
  }
});

// in the startScreen
startButton.addEventListener("click", callTestScreen);

// in the testScreen
nextButton.addEventListener("click", function () {
  if (timerCount > 0) {
    if (index < questionArray.length) {
      index++;
      callNextQuestion();
    } else {
      realTimeScore = timerCount;
      timerCount = 0;
      timer.textContent = timerCount;
      callEndScreen();
    }
  } else {
    realTimeScore = 0;
    timerCount = 0;
    timer.textContent = timerCount;
    callEndScreen();
  }
});

// in the endScreen 
submitButton.addEventListener("click", function () {
  const tempName = studentName.value.trim(); // tempName.toUppercase !!!
  if (tempName) {
    students.push({tempName, realTimeScore});
    console.log(students);
    localStorage.setItem("names", JSON.stringify(tempName));
    localStorage.setItem("scores", JSON.stringify(realTimeScore));
    callResultScreen();
  } else {
    alert("Name required. Try again.");
  }
});

init();
