const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('highscore');
const getScore = localStorage.getItem('score');

const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

finalScore.innerText = getScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    if (username.value !== '') {
        saveScoreBtn.style.opacity = '1'
    } else {
        saveScoreBtn.style.opacity = '.5'
    }
});

const saveHighScore = e => {
    e.preventDefault();

    let score = {
        name: username.value,
        score: getScore,
    };

    console.log(score);

    highscores.push(score);
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);

    localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.assign('app.html')

}