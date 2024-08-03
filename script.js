let score = 0;
let lives = 3;

// Selección de todos los elementos que se pueden arrastrar
document.querySelectorAll('.draggable').forEach(img => {
    img.addEventListener('dragstart', dragStart);
});

const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.match);
}

function dragOver(event) {
    event.preventDefault();
    dropZone.style.backgroundColor = '#c1f0c1';
}

function drop(event) {
    event.preventDefault();
    const match = event.dataTransfer.getData('text/plain');
    const silhouette = document.getElementById('silhouette');

    if (match === silhouette.dataset.current) {
        score++;
        document.getElementById('score').textContent = `Puntuación: ${score}/3`;
        playSound('success');
        showConfetti();
        showMessage('¡Muy bien! Continúa', 'success');

        // Cambiar la silueta actual por la imagen correcta
        silhouette.src = `assets/images/${getImageName(match)}`;

        if (score < 3) {
            setTimeout(() => {
                updateSilhouette();  // Cambiar a la siguiente silueta
            }, 1500);  // Cambiar después de 1.5 segundos
        } else {
            setTimeout(() => gameOver('¡Felicidades, ganaste!'), 1500);
        }
    } else {
        lives--;
        document.getElementById('lives').textContent = `Vidas: ${lives}`;
        playSound('failure');
        showMessage('¡Fallaste! Intenta de nuevo', 'failure');

        if (lives <= 0) {
            setTimeout(() => {
                gameOver('¡Has perdido, gracias por participar!');
                document.getElementById('restart').style.display = 'block';  // Mostrar botón de reinicio
            }, 1500);
        }
    }

    dropZone.style.backgroundColor = '#ddd';
}

function updateSilhouette() {
    const silhouette = document.getElementById('silhouette');
    const newIndex = (parseInt(silhouette.dataset.current) % 3) + 1;
    silhouette.dataset.current = newIndex.toString();
    silhouette.src = `assets/images/silhouette${newIndex}.png`;  // Cargar la nueva silueta en blanco y negro
}

function getImageName(index) {
    const images = {
        1: "A_wooden_construction_panel_with_detailed_textures.png",
        2: "A_metal_construction_panel_with_shiny_surface_and_.png",
        3: "A_glass_construction_panel_with_reflections_and_tr.png"
    };
    return images[index];
}

function gameOver(message) {
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    document.getElementById('message').textContent = message;
}

document.getElementById('restart').addEventListener('click', () => {
    score = 0;
    lives = 3;
    document.getElementById('score').textContent = 'Puntuación: 0/3';
    document.getElementById('lives').textContent = 'Vidas: 3';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('restart').style.display = 'none';  // Ocultar botón de reinicio
    updateSilhouette();  // Resetear a la primera silueta
});

function playSound(type) {
    const sound = new Audio(`assets/sounds/${type}.mp3`);
    sound.play();
}

function showConfetti() {
    const confetti = document.getElementById('confetti');
    confetti.classList.remove('hidden');

    for (let i = 0; i < 100; i++) {  // Generamos 100 piezas de confeti
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');

        // Posiciones aleatorias para las piezas de confeti
        const startX = Math.random() * 100; // Posición de inicio en el eje X (0% a 100% de la pantalla)
        const delay = Math.random() * 2; // Retraso aleatorio de hasta 2 segundos
        const duration = Math.random() * 3 + 2; // Duración entre 2 y 5 segundos para el efecto de caída

        confettiPiece.style.left = `${startX}vw`; // Inicio en una posición horizontal aleatoria
        confettiPiece.style.animationDelay = `${delay}s`; // Retraso aleatorio para la caída
        confettiPiece.style.animationDuration = `${duration}s`; // Duración aleatoria para cada pieza

        // Color aleatorio para cada pieza de confeti
        confettiPiece.style.backgroundColor = getRandomColor();

        confetti.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confetti.classList.add('hidden');
        while (confetti.firstChild) {
            confetti.removeChild(confetti.firstChild);
        }
    }, 5000); // Mostrar el confeti durante 5 segundos
}

function getRandomColor() {
    const colors = ['#ff4081', '#ff9100', '#40c4ff', '#69f0ae', '#ffd740'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.classList.add('message', type === 'success' ? 'success' : 'failure');
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}
