const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let score = 0;
let timer = 60;
let gameInterval;
let balloonInterval;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
    
    // Memberikan warna acak untuk balon
    const colors = ['#ff6347', '#4682b4', '#3cb371', '#dda0dd', '#ffd700'];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    balloon.addEventListener('click', () => {
        if (!balloon.classList.contains('balloon-shot')) {
            score += 1;
            scoreDisplay.textContent = score;
            balloon.classList.add('balloon-shot');
            setTimeout(() => {
                balloon.remove();
            }, 200);
        }
    });

    gameArea.appendChild(balloon);
}

function startGame() {
    score = 0;
    timer = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    startButton.disabled = true;
    
    gameInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    balloonInterval = setInterval(createBalloon, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(balloonInterval);
    alert(`Waktu habis! Skor Anda adalah: ${score}`);
    startButton.disabled = false;
    // Hapus semua balon yang tersisa
    document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());
}

startButton.addEventListener('click', startGame);