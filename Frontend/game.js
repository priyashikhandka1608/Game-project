/**
 * ? GAME
 * PING PONG BALL GAME
 * 
 * 
 * ? AUTHOR
 * [Your Name or Nickname]
 * 
 * 
 * ? DESCRIPTION
 * Ping Pong Ball Game is a simple yet engaging arcade-style game where the player controls a paddle at the bottom of the screen to bounce a ball. 
 * The objective is to keep the ball in play and prevent it from falling past the paddle. Players score points every time the ball hits the paddle, and the game becomes progressively harder with increased ball speed as levels increase.
 * The game ends when the ball falls off the screen, resulting in a "Game Over" state.
 * 
 * Players can start a new game, retry after a game over, or exit the game at any time.
 * 
 * 
 * ? GAMEPLAY
 * * Movement:
 *   The player can move the paddle left and right using the arrow keys (left arrow for left, right arrow for right).
 * 
 * * Scoring:
 *   The player scores 1 point each time the ball hits the paddle. 
 *   As the player progresses, the ball speed increases, making the game more challenging.
 * 
 * * Leveling Up:
 *   The player advances to the next level every time they reach a score divisible by 5. 
 *   With each level, the ball’s speed increases.
 * 
 * * Game Over:
 *   If the ball falls below the paddle, the game ends, showing a "Game Over" popup, with options to retry or exit.
 * 
 * 
 * ? FEATURES
 * * Paddle Movement:
 *   The player can control the paddle’s position left and right using the keyboard’s arrow keys.
 * 
 * * Ball Movement:
 *   The ball bounces dynamically off the walls, ceiling, and paddle.
 *   As the player progresses through levels, the ball’s speed increases, making it more challenging.
 * 
 * * Score and Level System:
 *   The player earns points for each successful bounce. The score is displayed at the top of the screen.
 *   The player levels up every 5 points, and the ball’s speed increases accordingly.
 * 
 * * Game Over Popup:
 *   A popup appears when the game ends, showing a "Game Over" message and offering the player the choice to retry or exit.
 * 
 * * Level-Up Animation:
 *   When the player reaches a new level, the level display animates to notify the player of their progression.
 * 
 * * Exit Button:
 *   An exit button allows the player to quit the game at any point.
 * 
 * * Responsive Game Start:
 *   The game has a smooth start with a "Start Game" button that transitions into the game, while the "Play Again" button becomes available after the game ends.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const retryButton = document.getElementById('retryButton');
const exitButton = document.getElementById('exitButton');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameOverPopup = document.getElementById('gameOverPopup');
const highScoresList = document.getElementById('highScoresList');

let ballRadius = 15;
let x, y, dx, dy;
let paddleHeight = 20, paddleWidth = 100, paddleX;
let rightPressed = false, leftPressed = false;
let score = 0, level = 1;
let gameStarted = false;
const rightKey = 39, leftKey = 37;
let playerName = localStorage.getItem("playerName") || "";

document.addEventListener('keydown', e => {
    if (e.keyCode === rightKey) rightPressed = true;
    if (e.keyCode === leftKey) leftPressed = true;
});

document.addEventListener('keyup', e => {
    if (e.keyCode === rightKey) rightPressed = false;
    if (e.keyCode === leftKey) leftPressed = false;
});

function initializeGame() {
    score = 0;
    level = 1;
    updateScore();
    updateLevel();
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    gameStarted = true;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "brown";
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateLevel() {
    levelDisplay.textContent = `Level: ${level}`;
    levelDisplay.style.animation = 'levelUp 0.5s ease-out';
}

function increaseSpeed() {
    dx = 2 + (level - 1) * 0.5;
    dy = -2 - (level - 1) * 0.5;
}

function checkLevelUp() {
    if (score >= level * 5) {
        level++;
        updateLevel();
        increaseSpeed();
    }
}

function draw() {
    if (!gameStarted) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
            updateScore();
            checkLevelUp();
        } else {
            gameStarted = false;
            showGameOver();
        }
    }

    if (rightPressed) paddleX = Math.min(paddleX + 5, canvas.width - paddleWidth);
    if (leftPressed) paddleX = Math.max(paddleX - 5, 0);
    
    requestAnimationFrame(draw);
}

startButton.addEventListener("click", function () {
    let inputPlayerName = document.getElementById("playerName").value.trim();
    
    if (!inputPlayerName) {
        alert("Please enter your name before starting the game.");
        return;
    }

    playerName = inputPlayerName;
    localStorage.setItem("playerName", playerName);
    startGame();
});

function startGame() {
    console.log(`Game started for ${playerName}`);
    document.getElementById("playerName").disabled = true;
    startButton.style.display = "none";
    playAgainButton.style.display = "none";
    exitButton.style.display = "inline";
    
    initializeGame();
    draw();
}

function playAgain() {
    initializeGame();
    gameOverPopup.style.display = "none";
    startGame();
}

function showGameOver() {
    gameOverPopup.style.display = "block";
    saveScore();
}

function exitGame() {
    window.location.reload();
}

function fetchHighScores() {
    fetch("http://localhost:3000/high-scores")
        .then(response => response.json())
        .then(data => {
            highScoresList.innerHTML = ""; 

            // Sort scores in descending order
            data.sort((a, b) => b.score - a.score);

            if (data.length > 0) {
                document.getElementById("highScoresContainer").style.display = "block";
                data.forEach((entry, index) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${index + 1}. ${entry.player}: ${entry.score}`;
                    highScoresList.appendChild(listItem);
                });
            } else {
                document.getElementById("highScoresContainer").style.display = "none"; 
            }
        })
        .catch(error => console.error("Error fetching high scores:", error));
}

function saveScore() {
    fetch("http://localhost:3000/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player: playerName, score })
    })
    .then(response => response.json())
    .then(() => fetchHighScores())
    .catch(error => console.error("Error saving score:", error));
}

document.addEventListener("DOMContentLoaded", fetchHighScores);
playAgainButton.addEventListener('click', playAgain);
retryButton.addEventListener('click', playAgain);
exitButton.addEventListener('click', exitGame);
