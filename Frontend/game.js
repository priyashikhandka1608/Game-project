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
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const retryButton = document.getElementById('retryButton');
const exitButton = document.getElementById('exitButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameOverPopup = document.getElementById('gameOverPopup');

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let level = 1;
let gameStarted = false;

const rightKey = 39;
const leftKey = 37;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode === rightKey) {
        rightPressed = true;
    } else if (e.keyCode === leftKey) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === rightKey) {
        rightPressed = false;
    } else if (e.keyCode === leftKey) {
        leftPressed = false;
    }
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
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "brown"; 
    ctx.fill();
    ctx.closePath();
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function updateLevel() {
    levelDisplay.textContent = "Level: " + level;
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

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
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

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
        paddleX = Math.min(paddleX, canvas.width - paddleWidth);
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
        paddleX = Math.max(paddleX, 0); 
    }

    requestAnimationFrame(draw);
}

function startGame() {
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
    startButton.style.display = "none";
    playAgainButton.style.display = "none";
    exitButton.style.display = "inline";
    draw();
}

function playAgain() {
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
    startButton.style.display = "none";
    playAgainButton.style.display = "none";
    exitButton.style.display = "inline";
    gameOverPopup.style.display = "none"; 
    draw();
}

function showGameOver() {
    gameOverPopup.style.display = "block";
}

function exitGame() {
    window.location.reload();
}

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
retryButton.addEventListener('click', playAgain);
exitButton.addEventListener('click', exitGame);
