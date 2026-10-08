//Список вопросов, которые передаются на страницу
const mainVictorinaQuestions = [
    {
        id: 1,
        question: "For him: What is the opposite of right?",
        answers: [
            "left",
            "wrong",
        ],
        correct: 0,
        image: [
            "images/Flags/AC.svg",
            "images/Flags/AD.svg"
        ],
    },
    {
        id: 2,
        question: "For her: Нажми слева",
        answers: [
            "Лево",
            "Право",
        ],
        correct: 0,
        image: [
            "images/Flags/DE.svg",
            "images/Flags/RU.svg"
        ],
    },
    {
        id: 3,
        question: "Think carefully and choose the correct answer",
        answers: [
            "Hoyerswerda",
            "Düsseldorf",
        ],
        correct: 0,
        image: [
            "images/1-1.jpg",
            "images/1-2.jpg"
        ],
    },
    {
        id: 4,
        question: "What is the best gift?",
        answers: [
            "Given at the right time",
            "Given too late",
        ],
        correct: 0,
        image: [
            "images/3-1.png",
            "images/3-2.png"
        ],
    },
    {
        id: 5,
        question: "Where did Mariana spend several years of her life?",
        answers: [
            "Island",
            "Another island",
        ],
        correct: 1,
        image: [
            "images/2-1.png",
            "images/2-2.png"
        ],
    },
]

let count = 0; //Счетчик для прохода по вопросам

const startButton = document.getElementById("startButton");

//Элементы со страницы. По факту число присвоение элементам страницы имен, для работы на этой странице
//Айди объекта указано в скобках
const mQuestion = document.getElementById("mQuestion"); //Вопрос один
const mAnswer = document.querySelectorAll(".mAnswer"); //Список ответов
const mText = document.querySelectorAll(".mText");
const mImage = document.querySelectorAll(".mImage");
const mErrorMessage = document.getElementById("mErrorMessage"); //Весь объект целиком

//Передаем на страницу текст вопроса и текст двух ответов
function showQuestion() {
    const round = mainVictorinaQuestions[count]; //тут переменной присваивается словарь из списка
    mQuestion.textContent = round.question;
    mText[0].textContent = round.answers[0];
    mText[1].textContent = round.answers[1];
    mImage[0].src = "";
    mImage[1].src = "";
    mImage[0].src = round.image[0];
    mImage[1].src = round.image[1];
    //тут мы задали списку вопросов соответсвующие значения
    mQuestion.classList.add("show"); //отображаем вопрос пользователю
    mAnswer.forEach(answer => {
        answer.classList.add("show"); //отображаем каждый ответ пользователю
    });
}

function start_() {
    startButton.classList.add("delete")
    showQuestion() //Передаем на страницу сайта первый вопрос и 2 ответа с картинками или без
    mAnswer.forEach(answer => {
        answer.addEventListener("click", () => { //Ждем клика по любому из ответов
            const selectedAnswer = answer.querySelector(".mText").textContent; //Создаем новую переменную - это будет вариант, который выбрал пользователь
            const round = mainVictorinaQuestions[count]; //Создаем переменную в которую передаем текущий словарик раунда
            if (selectedAnswer === round.answers[round.correct]) { //В правой части - ответ из словаря с индексом, как в переменной "correct"
                count++; //Переходим к следующему словарику вопросов
                mQuestion.classList.remove("show"); //У объекта вопроса на странице забираем класс 
                mAnswer.forEach(answer => {
                    answer.classList.remove("show"); //У объекта ответа (у каждого) забираем класс
                });
                mErrorMessage.classList.remove("show"); //Если отображалось ошибка, то у неё тоже отбираем класс
                if (count === mainVictorinaQuestions.length) { //Если вопросы в словаре кончились 
                        mQuestion.addEventListener("transitionend", () => {
                        mQuestion.classList.add("delete"); //Удаляем элемент со страницы, чтобы больше не занимал место
                        mErrorMessage.classList.add("delete"); //Удаляем элемент со страницы, чтобы больше не занимал место
                        mAnswer.forEach(answer => {
                            answer.classList.add("delete"); //Удаляем элемент со страницы, чтобы больше не занимал место
                        });
                        erfolg_();
                        }, { once: true }
                    );
                } else { //Начинаем следующий круг - показываем новый вопрос
                    mQuestion.addEventListener("transitionend", () => {
                            showQuestion();
                        }, { once: true }
                    );
                };
            } else { //Если выбран неверный ответ
                mErrorMessage.classList.add("show"); //Отображаем объект ошибки на сайте
            }
        });
    });
}

function erfolg_() {
    const erfolg = document.getElementById("erfolg")
    const music = document.getElementById("music");
    const images = document.querySelectorAll(".image");
    const bigImage = document.getElementById("bigImage");
    erfolg.classList.add("show");
    music.play();
    images.forEach(img => {
        img.classList.add("show"); //У объекта ответа (у каждого) забираем класс
    });
    bigImage.classList.add("show")
}

//Основной путь сайта
document.getElementById("startButton").addEventListener("click", start_);

