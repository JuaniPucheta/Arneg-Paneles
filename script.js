let currentRound = 1;
let lives = 3;
let correctAnswers = 0;

const correctImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bananas.svg/1200px-Bananas.svg.png';  // Cambia esta imagen según sea necesario

const silhouette = document.getElementById('silhouette');
const imagesRow = document.getElementById('images-row');
const livesCount = document.getElementById('lives-count');
const roundCount = document.getElementById('round-count');
const message = document.getElementById('message');

function checkAnswer(droppedImage) {
    if (droppedImage === correctImage) {
        correctAnswers++;
        message.textContent = '¡Correcto!';
    } else {
        lives--;
        livesCount.textContent = lives;
        message.textContent = 'Incorrecto. Intenta de nuevo.';
    }

    if (lives === 0) {
        endGame('Perdiste todas tus vidas. El juego se reiniciará.');
    } else if (currentRound === 7) {
        endGame('Juego completado.');
    } else {
        currentRound++;
        roundCount.textContent = currentRound;
    }
}

function endGame(finalMessage) {
    alert(finalMessage);
    resetGame();
}

function resetGame() {
    currentRound = 1;
    lives = 3;
    correctAnswers = 0;
    livesCount.textContent = lives;
    roundCount.textContent = currentRound;
    message.textContent = '';
}

imagesRow.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.src);
});

silhouette.addEventListener('dragover', (e) => {
    e.preventDefault();
});

silhouette.addEventListener('drop', (e) => {
    const droppedImage = e.dataTransfer.getData('text/plain');
    checkAnswer(droppedImage);
});
