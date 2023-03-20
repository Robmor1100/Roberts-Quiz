const initials = document.getElementById("initials");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById("highScoresList");

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

initials.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !initials.value;
});

saveScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: initials.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.reload();
}

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");