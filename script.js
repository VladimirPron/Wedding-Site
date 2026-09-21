/*
    Скрипт для рулетки
*/
// const r_gifts = [
//     "Ужин на двоих",
//     "Бутылка вина",
//     "Билеты в кино",
//     "Билеты на концерт",
//     "Поход в СПА",
//     "Путешествие на двоих",
//     "Фотосессия",
//     "Секретный приз",
//     "Пляжный мяч",
//     "Компьютер"
// ];
// const r_track = document.getElementById("track");
// const r_button = document.getElementById("startButton");
// const r_result = document.getElementById("result");
// const r_itemWidth = 200;
// const r_repetitions = 8;
// for (let r = 0; r < r_repetitions; r++) {
//     r_gifts.forEach(r_gift => {
//         const r_item = document.createElement("div");
//         r_item.className = "item";
//         r_item.textContent = r_gift;
//         r_track.appendChild(r_item);
//     });
// }
// r_button.addEventListener("click", () => {
//     r_button.disabled = true;
//     r_result.textContent = "";
//     const r_targetRepetition = 5;
//     const r_targetIndex =
//         r_targetRepetition * r_gifts.length + 9;

//     const r_windowWidth =
//         document.querySelector(".slot-window").offsetWidth;
//     const r_centerOffset =
//         (r_windowWidth / 2) - (r_itemWidth / 2);

//     const finalPosition =
//         -(r_targetIndex * r_itemWidth) + r_centerOffset;

//     r_track.style.transition =
//         "transform 5s cubic-bezier(0.12, 0.65, 0.18, 1)";
//     r_track.style.transform =
//         `translateX(${finalPosition}px)`;

//     setTimeout(() => {
//         r_result.innerHTML =`
//             🎉 ВЫ ВЫИГРАЛИ ${r_gifts[9]}! 🚐
//             <br>
//             <img class="serf" src="images/flags/ru.svg" alt="Сертификат">
//             `;
//     }, 5200);
// });

const music = document.getElementById("music");

// document.getElementById("startButton").addEventListener("click", () => {
//     music.play();
// });

const questions = [
    {
        question: "Где мы впервые встретились?",
        answers: [
            "A1",
            "B1",
        ],
        correct: 1
    },
    {
        question: "2",
        answers: [
            "A2",
            "B2",
        ],
        correct: 0
    },
]
let count = 0;
const questionElement = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const errorMessage = document.getElementById("errorMessage");
const tryAgain = document.getElementById("tryAgain");
const rouletteScreen = document.getElementById("rouletteScreen")
const finalRound = document.getElementById("finalRound")

function showQuestion() {
    const question = questions[count];
    questionElement.textContent = question.question;
    answers[0].textContent = question.answers[0];
    answers[1].textContent = question.answers[1];
    questionElement.classList.add("show");
    answers.forEach(answer => {
        answer.classList.add("show");
    });
}

const finalRQ = {
    question: "Best Place",
    answer: "ww"
}
const finalQuestion = document.getElementById("finalQuestion")
const finalQuestionAnswer = document.getElementById("finalQuestionAnswer")
const finalQuestionAnswerSubmit = document.getElementById("finalQuestionAnswerSubmit");

function finalRound_() {
    finalQuestion.textContent = finalRQ.question
    finalRound.classList.add("show")
    finalQuestionAnswerSubmit.addEventListener("click", () => {
        const userAnswer = finalQuestionAnswer.value.trim();
        if (userAnswer.toLowerCase() === finalRQ.answer.toLowerCase()) {
            finalRound.classList.remove("show");
            finalRound.classList.add("delete");
            answerBox.addEventListener("transitionend", (event) => {
                if (event.propertyName === "transform") {
                    currentQuestion++;
                }
            }, { once: true });
                } else {
                    errorMessage.classList.add("show");
                }
        }
    );
}

showQuestion()

answers.forEach(answer => {
    answer.addEventListener("click", () => {
        const selectedAnswer = answer.textContent;
        const question = questions[count];
        if (selectedAnswer === question.answers[question.correct]) {
            count++;
            questionElement.classList.remove("show");
            answers.forEach(answer => {
                answer.classList.remove("show");
            });
            errorMessage.classList.remove("show");
            if (count === questions.length) {
                questionElement.addEventListener("transitionend", () => {
                    questionElement.classList.remove("show")
                    questionElement.classList.add("delete")
                    errorMessage.classList.remove("show");
                    errorMessage.classList.add("delete");
                    answers.forEach(answer => {
                        answer.classList.add("delete");
                    });
                    finalRound_();
                    }, { once: true }
                );
            } else {
                questionElement.addEventListener("transitionend", () => {
                        showQuestion();
                    }, { once: true }
                );
            };
        } else {
            errorMessage.classList.add("show");
        }
    });
});

tryAgain.addEventListener("click", () => {
    errorMessage.classList.remove("show");
});
