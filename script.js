const questions = [
    {
        question: " Which is the fastest animal in the world",
        answers: [
            { text: "Giraffe", correct: false},
            { text: "Lion", correct: false},
            { text: "Cheetah", correct: true},
            { text: "Tiger", correct: false},
        ]
    },

    {
        question: " Which is the capital of India",
        answers: [
            { text: "Mumbai", correct: false},
            { text: "New Delhi", correct: true},
            { text: "Kolkata", correct: false},
            { text: "Hyderabad", correct: false},
        ]
    },

    {
        question: " Full form of RBI",
        answers: [
            { text: "Reversed Bank of India", correct: false},
            { text: "Right Bureau of India", correct: false},
            { text: "Reserve Bank of India", correct: true},
            { text: "Real Bank of India", correct: false},
        ]
    },

    {
        question: " Which is the smallest continent in the world",
        answers: [
            { text: "Europe", correct: false},
            { text: "north America", correct: false},
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
        ]
    },

    {
        question: " Where is India's Silicon valley located",
        answers: [
            { text: "Bangalore", correct: true},
            { text: "Ahmedabad", correct: false},
            { text: "Noida", correct: false},
            { text: "Hyderabad", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const nextButton = document.getElementById("next_btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currQuestion.question;

    currQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        options.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(options.firstChild) {
        options.removeChild(options.firstChild);
    }
}

function selectAnswer(e) {
    const selectedOption = e.target;
    const isCorrect = selectedOption.dataset.correct === "true";
    if(isCorrect) {
        selectedOption.classList.add("Correct");
        score++;
    } else {
        selectedOption.classList.add("Incorrect");
    }
    Array.from(options.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("Correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currQuestionIndex++;
    if(currQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

