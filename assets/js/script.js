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
      correctAnswer: "quotes"
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: [
        "Javascript",
        "Terminal/Bash",
        "for loops",
        "console.log"
      ],
      correctAnswer: "console.log"
    },
    {
      question: "Commonly used data types DO NOT include:",
      answers: [
        "strings",
        "booleans",
        "alerts",
        "numbers"
      ],
      correctAnswer: "alerts"
    },
    {
      question: "The condition is an if/else statement is enclosed within ______.",
      answers: [
        "square brackets",
        "curly brackets",
        "quotes",
        "parenthesis"
      ],
      correctAnswer: "curly brackets"
    },
    {
      question: "Who invented JavaScript?",
      answers: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Tim Berners-Lee",
        "Brendan Eich"
      ],
      correctAnswer: "Brendan Eich"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: [
        "Angular",
        "jQuery",
        "RequireJS",
        "ESLint"
      ],
      correctAnswer: "ESLint"
    }
  ];

const timer = document.getElementById("timer");

const startScreen = document.querySelector("#start-screen");
const startButton = document.getElementById("start");

const testScreen = document.querySelector("#q-a-screen");
const questionId= document.getElementById("question");
const firstAnswer= document.getElementById("li1");
const secondAnswer= document.getElementById("li2");
const thirdAnswer= document.getElementById("li3");
const fourthAnswer= document.getElementById("li4");
const showResult= document.getElementById("result");

const endScreen = document.querySelector("#end-screen");
const currentScore = document.querySelector("#current-score");
const studentName= document.getElementById("student-name");
const submitButton = document.getElementById("submit");

const resultScreen = document.querySelector("#result-screen");
const studentList = document.querySelector("#result-list");
const againButton = document.getElementById("start-again");
const clearButton = document.getElementById("clear-scores");

let students = {
  initial: "",
  score: 0
}
let timerCount = 100;
let realScore = 0;
let isCorrect = false;
let currentPosition = 0;

// functions for Screen changes

function callStartScreen() {
    // event.preventDefault();
    startScreen.classList.remove("hide");
    resultScreen.classList.add("hide");

}

function callTestScreen() {
    // event.preventDefault();
    testScreen.classList.remove("hide");
    startScreen.classList.add("hide");
    timerCount = 100;
    startTimer();
    testTaking();
}

function callEndScreen(event) {
    // event.preventDefault();
    endScreen.classList.remove("hide");
    testScreen.classList.add("hide");
    submitButton.addEventListener("click", getName);   
}

function callResultScreen(event) {
    // event.preventDefault();
    resultScreen.classList.remove("hide");
    endScreen.classList.add("hide");
    renderList();
    againButton.addEventListener("click", callStartScreen);
    clearButton.addEventListener("click", clearStorage);
}

// Testing Timer

function startTimer() {
  timerClock = setInterval(function() {
    timerCount--;
    timer.textContent = timerCount;
    // if (timerCount >= 0){
    //   // Tests if correct answer is chosen
    //   if (isCorrect === false) {
    //     //Clears interval and stops timer
    //     timerCount = timerCount - 10;
    //   }
    // }
    if (timerCount <= 0) {
      //Clears interval and stops timer
       clearInterval(timerClock);
       timerCount = 0;
       realScore = 0;
       callEndScreen();
    }
  }, 1000);
}

// Taking test taker's info in localStorage
function getName(event) {
    event.preventDefault();
    currentScore.textContent = realScore;
    let tempName = studentName.value.trim(); // tempName.toUppercase !!!
    if (tempName){
        localStorage.setItem("names", JSON.stringify(tempName));
        localStorage.setItem("scores", JSON.stringify(realScore));
        callResultScreen();
    } else {
        alert("Name required. Try again.");
    }
}

function init() {
    callStartScreen();
    startButton.addEventListener("click", callTestScreen);
    // const tempList = localStorage.getItem("names");
    // if (tempList) {
    //     students=JSON.parse(tempList);
    //     renderList();
    // }
    // console.log("init", students);
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

function randomizeList(event) {
    event.preventDefault();

    let randoList = [];
    for (let i = 0; i < questionArray.length; i++) {
        randoList[i] = Math.floor(Math.random() * questions.length);
    }
}
  
function testTaking() {
  let i = 0; 

  // until all questions answered or timer is done
  while (i < questionArray.length && timerCount > 0) { 
    questionId.textContent = questionArray[i].question;
    firstAnswer.textContent = questionArray[i].answers[0];
    secondAnswer.textContent = questionArray[i].answers[1];
    thirdAnswer.textContent = questionArray[i].answers[2];
    fourthAnswer.textContent = questionArray[i].answers[3];
    document.querySelector("li").addEventListener("click", checkAnswer(i));
    if (isCorrect) {
      i++;
    }
  }
  
}

function checkAnswer(position) {
    showResult.classList.remove("hide");
    console.log(position);
    if (document.querySelector("li").textContent === questionArray[position].correctAnswer) {
        isCorrect = true;
        showResult.textContent = "Right";
    } else {
        isCorrect = false;
        showResult.textContent = "Wrong";
        timerCount = timerCount - 10;
        if (timerCount <= 0) {
            timerCount = 0;
        }
    }
}

init();
