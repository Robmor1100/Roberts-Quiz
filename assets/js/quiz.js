const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the most visited tourist attraction in the world?",
        choice1: "Great Wall of China",
        choice2: "Eiffel Tower",
        choice3: "Taj Mahal",
        choice4: "Colosseum",
        answer: 1,
    },
    {
        question: "What is the oldest soft drink in the United States?",
        choice1: "Coca-Cola",
        choice2: "Pepsi",
        choice3: "Dr. Pepper",
        choice4: "Sprite",
        answer: 3,
    },
    {
        question: "What sport has been played on the moon?",
        choice1: "Baseball",
        choice2: "Golf",
        choice3: "Tennis",
        choice4: "Soccer",
        answer: 2,
    },
    {
        question: "The first vaccine was for which disease?",
        choice1: "Smallpox",
        choice2: "Polio",
        choice3: "Measles",
        choice4: "Chickenpox",
        answer: 1,
    },
    {
        question: "What is the smallest country in the world?",
        choice1: "Tuvalu",
        choice2: "Monaco",
        choice3: "Nauru",
        choice4: "Vatican City",
        answer: 4,
    },
    { 
        question: "What river passes through New Orleans, Louisiana?",
        choice1: "Orleans River",
        choice2: "Mississippi River",
        choice3: "Ohio River",
        choice4: "Missouri River",
        answer: 2,
    },
];

const correct_bonus = 10;
const max_questions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

let time = 60;

function startTimer() {
    setInterval(function () {
        time--;
        timeText.innerText = time;
        if (time === 0) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("/end.html");
        }
    }, 1000);
}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${max_questions}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(correct_bonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }
        , 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();

startTimer();



















































