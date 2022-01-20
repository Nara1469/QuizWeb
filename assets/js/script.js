// variables
const questionArray = [
    {
      question: "Who invented JavaScript?",
      answers: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Tim Berners-Lee",
        "Brendan Eich"
      ],
      correctAnswer: 2
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: [
        "npm",
        "Node.js",
        "TypeScript",
        "npm"
      ],
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: [
        "Angular",
        "jQuery",
        "RequireJS",
        "ESLint"
      ],
      correctAnswer: 3
    }
  ];

const currentScore = document.querySelector(".current-score");
const timer = document.getElementById("timer");

const startScreen = document.querySelector("#start-screen");
const startButton = document.getElementById("start");

const testScreen = document.querySelector("#q-a-screen");
const questionId= document.getElementById("question");
const firstAnswer= document.getElementById("li1");
const secondAnswer= document.getElementById("li2");
const thirdAnswer= document.getElementById("li3");
const fourthAnswer= document.getElementById("li4");

const endScreen = document.querySelector("#end-screen");
const studentName= document.getElementById("student-name");
const submitButton = document.getElementById("submit");

const resultScreen = document.querySelector("#result-screen");
const studentList = document.querySelector("#result-list");
const againButton = document.getElementById("start-again");
const clearButton = document.getElementById("clear-scores");

// functions
function callStartScreen() {
    // event.preventDefault();
    startScreen.classList.remove("hide");
    resultScreen.classList.add("hide");

}

function callTestScreen() {
    // event.preventDefault();
    testScreen.classList.remove("hide");
    startScreen.classList.add("hide");
    
}

function callEndScreen(event) {
    // event.preventDefault();
    endScreen.classList.remove("hide");
    testScreen.classList.add("hide");
    
}

function callResultScreen(event) {
    // event.preventDefault();
    resultScreen.classList.remove("hide");
    endScreen.classList.add("hide");
    
}



function getName(event) {
    event.preventDefault();

    const tempName = studentName.value.trim();
    if (tempName){
        students.push(tempName);
        localStorage.setItem("names", JSON.stringify(students));
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
    for (let index = 0; index < students.length; index++) {
        const student = students[index];
        const newLi = document.createElement("li");
        newLi.textContent=student;
        studentList.appendChild(newLi);
    }
}

function randomizeList(event) {
    event.preventDefault();

    let randoList = [];
    for (let i = 0; i < questions.length; i++) {
        randoList[i] = Math.floor(Math.random() * questions.length);
    }
    
}

// logic  
function checkAnswer(params) {
    questionId.textContent = questionArray[0].question;
}



document.querySelector("ol").addEventListener("click", checkAnswer);

init();
