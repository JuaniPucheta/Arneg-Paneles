let currentRound = 1;
let lives = 3;
let correctAnswers = 0;
const correctImage = 'https://ecoinventos.com/wp-content/uploads/2018/02/Tipos-de-panel-solar.jpg';
const silhouette = document.getElementById('silhouette');
const imagesRow = document.getElementById('images-row');
const livesCount = document.getElementById('lives-count');
const roundCount = document.getElementById('round-count');
const message = document.getElementById('message');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close');
let confetti;

function checkAnswer(droppedImage) {
    if (droppedImage === correctImage) {
        correctAnswers++;
        silhouette.style.filter = 'none'; // Quitar la silueta negra
        showModal('¡Correcto!');
        if (correctAnswers === 3 || correctAnswers === 5) {
            showConfetti();
        }
        if (correctAnswers === 7) {
            endGame('¡Haz ganado el juego!');
        }
    } else {
        lives--;
        livesCount.textContent = lives;
        showMessage('Le haz errado');
        if (lives === 0) {
            setTimeout(() => {
                endGame('Haz perdido el juego. Se reiniciará.');
            }, 300);
        }
    }
    if (lives > 0 && correctAnswers < 7) {
        currentRound++;
        roundCount.textContent = currentRound;
    }
}

function endGame(finalMessage) {
    showModal(finalMessage);
    resetGame();
}

function resetGame() {
    currentRound = 1;
    lives = 3;
    correctAnswers = 0;
    livesCount.textContent = lives;
    roundCount.textContent = currentRound;
    silhouette.style.filter = 'brightness(0) invert(1)'; // Volver a la silueta negra
    message.textContent = '';
    if (confetti) confetti.clear(); // Detener confetti si está activo
}

function showModal(text) {
    modalText.textContent = text;
    modal.style.display = 'flex';
}

modalClose.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function showMessage(text) {
    message.textContent = text;
}

function showConfetti() {
    confetti = new ConfettiGenerator({ target: 'game-container', width: 600, height: 400 });
    confetti.render();
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
