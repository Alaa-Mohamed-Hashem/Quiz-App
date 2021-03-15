const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progrssText = document.getElementById('progrssText');
const scoreText = document.getElementById('score');
const progressBarFull = document.querySelector('.progress-bar-full');
const game = document.querySelector('.game');
const loader = document.querySelector('.loader');

let currentQuestion = {},
    score = 0,
    questionCounter = 0,
    availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = { question: loadedQuestion.question };

        const answerChoice = [...loadedQuestion.incorrect_answers];

        formattedQuestion.answer = Math.floor(Math.random() * 3);

        answerChoice.splice(formattedQuestion.answer, 0, loadedQuestion.correct_answer);

        answerChoice.forEach((choice, index) => {
            formattedQuestion['choice' + index] = choice;
        });

        return formattedQuestion;
    });
    startGame();
}).catch(err => {
    console.log(err);
});

const correct_bonus = 10;


const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}

const getNewQuestions = () => {
    const max_questions = questions.length;
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem('score', score);
        return window.location.assign('end.html');
    }

    questionCounter++;

    progrssText.innerText = `Question ${questionCounter}/${max_questions}`;

    progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        let n = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + n];
    });

    availableQuestions.splice(questionIndex, 1);
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        let n = e.target;
        let choiceNum = parseInt(e.target.dataset['number']);

        let classActive = choiceNum === currentQuestion.answer ? 'green' : 'red';

        
        n.parentElement.classList.add(classActive);
        
        classActive === 'green' ? sumOfScores(correct_bonus) : null;

        game.classList.add('disabled');

        setTimeout(() => {
            n.parentElement.classList.remove(classActive);
            game.classList.remove('disabled');
            getNewQuestions();
        }, 2000);
    });
});

const sumOfScores = (sum) => {
    score += sum;
    scoreText.innerText = score;
};
