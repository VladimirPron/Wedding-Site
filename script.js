//Список вопросов, которые передаются на страницу
const mainVictorinaQuestions = [
    {
        id: 1,
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
        wrong_answer: "Wrong answer, but we admire your confidence!",
    },
    {
        id: 2,
        question: "What is the best gift?",
        answers: [
            "One given on time",
            "A belated one",
        ],
        correct: 1,
        image: [
            "images/2-1.png",
            "images/2-2.png"
        ],
        wrong_answer: "Are you sure?",
    },
    {
        id: 3,
        question: "Where did Mariana spend several years of her life?",
        answers: [
            "Island",
            "Another island",
        ],
        correct: 1,
        image: [
            "images/3-1.jpeg",
            "images/3-2.png"
        ],
        wrong_answer: "Have you two just met?!",
    },
{
        id: 4,
        question: "Which house did Tusek grow up in?",
        answers: [
            "This one",
            "Another one",
        ],
        correct: 1,
        image: [
            "images/4-1.jpg",
            "images/4-2.jpg"
        ],
        wrong_answer: "Have you two just met?!",
    },
    {
        id: 5,
        question: "Choose the right croissant!",
        answers: [
            "First",
            "Second",
        ],
        correct: 0,
        image: [
            "images/5-1.jpg",
            "images/5-2.jpg"
        ],
        wrong_answer: "Oh, come on!",
    },
    {
        id: 6,
        question: "Trust your instincts!",
        answers: [
            "This Masterpiece",
            "Beautiful work",
        ],
        correct: 1,
        image: [
            "images/6-1.jpg",
            "images/6-2.jpg"
        ],
        wrong_answer: "Room for improvement!",
    },
    {
        id: 7,
        question: "Choose the right fish!",
        answers: [
            "Lord Herring",
            "Lady Sprat",
        ],
        correct: 0,
        image: [
            "images/7-1.png",
            "images/7-2.png"
        ],
        wrong_answer: "That's not what we expected!",
    },
    {
        id: 8,
        question: "Choose the right dog",
        answers: [
            "Chocolate Thunder",
            "Silver Bullet",
        ],
        correct: 0,
        image: [
            "images/8-1.jpg",
            "images/8-2.jpg"
        ],
        wrong_answer: "Wrong dog!",
    },
    {
        id: 9,
        question: "Choose the real Brazilian",
        answers: [
            "Wandering Queen",
            "Captain Forgot His Bag",
        ],
        correct: 0,
        image: [
            "images/9-1.jpg",
            "images/9-2.jpg"
        ],
        wrong_answer: "That's a fake one!",
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
const mRightAnswer = document.getElementById("mRightAnswer");
const music_start = document.getElementById("music_start");
const music_finish = document.getElementById("music_finish");

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
    document.body.classList.add("base");
    music_start.play();
    startButton.classList.add("delete")
    showQuestion() //Передаем на страницу сайта первый вопрос и 2 ответа с картинками или без
    mAnswer.forEach(answer => {
        answer.addEventListener("click", () => { //Ждем клика по любому из ответов
            const selectedAnswer = answer.querySelector(".mText").textContent; //Создаем новую переменную - это будет вариант, который выбрал пользователь
            const round = mainVictorinaQuestions[count]; //Создаем переменную в которую передаем текущий словарик раунда
            if (selectedAnswer === round.answers[round.correct]) { //В правой части - ответ из словаря с индексом, как в переменной "correct"
                count++; //Переходим к следующему словарику вопросов
                answer.classList.add("right")
                mRightAnswer.classList.add("show")
                setTimeout(() => {
                    mQuestion.classList.remove("show"); //У объекта вопроса на странице забираем класс 
                    mAnswer.forEach(answer => {
                        answer.classList.remove("show"); //У объекта ответа (у каждого) забираем класс
                        answer.classList.remove("right");
                        answer.classList.remove("false");
                    });
                    mErrorMessage.classList.remove("show");
                    mRightAnswer.classList.remove("show") //Если отображалось ошибка, то у неё тоже отбираем класс
                    if (count === mainVictorinaQuestions.length) { //Если вопросы в словаре кончились 
                            mQuestion.addEventListener("transitionend", () => {
                            mQuestion.classList.add("delete"); //Удаляем элемент со страницы, чтобы больше не занимал место
                            mErrorMessage.classList.add("delete"); //Удаляем элемент со страницы, чтобы больше не занимал место
                            mRightAnswer.classList.add("delete")
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
                }, 1000); //Задержка зеленой подсветки при правильном ответе
                
            } else { //Если выбран неверный ответ
                mErrorMessage.textContent = round.wrong_answer;
                answer.classList.add("false")
                mErrorMessage.classList.add("show"); //Отображаем объект ошибки на сайте
            }
        });
    });
}

function erfolg_() {
    document.body.classList.add("final");
    const erfolg = document.getElementById("erfolg")
    const images = document.querySelectorAll(".image");
    const bigImage = document.getElementById("bigImage");
    erfolg.classList.add("show");
    music_start.pause()
    music_finish.play();
    images.forEach(img => {
        img.classList.add("show"); //У объекта ответа (у каждого) забираем класс
    });
    bigImage.classList.add("show")
}

//Основной путь сайта
document.getElementById("startButton").addEventListener("click", start_);
