const highScoresList = document.getElementById('highScoresList');
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

highScoresList.innerHTML = highscores.map(el => `<li class="high-score">${el.name} - ${el.score}</li>`).join('');