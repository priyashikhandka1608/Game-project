/**
 * ? GAME
 * PING PONG BALL GAME
 * 
 * 
 * ? AUTHOR
 * Priyashi
 * 
 * 
 * ? DESCRIPTION
 * Ping Pong Ball Game is an engaging multiplayer arcade-style game where two players control paddles to keep the ball in play. 
 * The objective is to prevent the ball from passing their paddle while trying to outlast the opponent. The game progressively increases in difficulty as ball speed increases with levels.
 * The game ends when one player misses the ball, awarding a point to the opponent. The first player to reach the winning score is declared the winner.
 * 
 * Players can start a new game, retry after a game over, or exit the game at any time. Game progress and records are stored for later reference.
 * 
 * 
 * ? GAMEPLAY
 * * Movement:
 *   - Player 1: Moves the paddle left and right using the left and right arrow keys.
 *   - Player 2: Moves the paddle using the Shift (left) and Ctrl (right) keys.
 * 
 * * Scoring:
 *   - A player earns a point when the opponent misses the ball.
 *   - The game ends when one player reaches the winning score.
 * 
 * * Leveling Up:
 *   - The game difficulty increases every 5 seconds as the ball's speed increases.
 *   - Higher levels make paddle control and timing more challenging.
 * 
 * * Game Over:
 *   - The game ends when a player reaches the winning score, triggering a "Game Over" popup with options to retry or exit.
 * 
 * 
 * ? FEATURES
 * * Multiplayer Paddle Movement:
 *   - Both players can control their paddles using designated keyboard keys.
 * 
 * * Ball Movement:
 *   - The ball dynamically bounces off the walls and paddles.
 *   - Speed increases with levels, adding difficulty over time.
 * 
 * * Score and Level System:
 *   - Players earn points when the opponent fails to hit the ball.
 *   - The game displays real-time scores and levels on the screen.
 * 
 * * Game Over Popup:
 *   - A popup appears when the game ends, displaying the winner and offering retry or exit options.
 * 
 * * Level-Up Animation:
 *   - When players reach a new level, a visual animation highlights their progress.
 * 
 * * Exit Button:
 *   - Allows players to quit the game at any point.
 * 
 * * Responsive Game Start:
 *   - The game starts smoothly with a "Start Game" button.
 *   - "Play Again" becomes available after the game ends.
 * 
 * * Local Storage:
 *   - Stores player names and past match records for later reference.
 * 
 * * Match History:
 *   - Displays past game records fetched from storage.
 * 
 * * Fetch API Integration:
 *   - Saves and retrieves match records using API endpoints.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const retryButton = document.getElementById('retryButton');
const exitButton = document.getElementById('exitButton');
const scoreDisplay1 = document.getElementById('score1');
const scoreDisplay2 = document.getElementById('score2');
const gameOverPopup = document.getElementById('gameOverPopup');
const recordsList = document.getElementById('recordsList');

let Level = 1;
let speedIncreaseInterval;
let ballRadius = 15;
let x, y, dx, dy;
let paddleHeight = 20, paddleWidth = 100;
let paddle1X, paddle2X;
let rightPressed = false, leftPressed = false;
let shiftPressed = false, ctrlPressed = false;
let score1 = 0, score2 = 0;
let gameStarted = false;
const rightKey = 39, leftKey = 37;
const shiftKey = 16, ctrlKey = 17;
let playerName1 = localStorage.getItem("playerName1") || "";
let playerName2 = localStorage.getItem("playerName2") || "";

let WINNING_SCORE = parseInt(document.getElementById("maxScore").value) || 2;


function initializeGame() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 3 * Level;
    dy = 3 * Level;
    paddle1X = (canvas.width - paddleWidth) / 2;
    paddle2X = (canvas.width - paddleWidth) / 2;
    gameStarted = true;
    updateScore();

    clearInterval(speedIncreaseInterval);
    
    Level = 1;
    speedIncreaseInterval = setInterval(() => {
        Level += 0.2;
        dx = dx > 0 ? 3 * Level : -3 * Level;
        dy = dy > 0 ? 3 * Level : -3 * Level;
    }, 5000);
}

document.addEventListener("keydown", e => {
    if (e.keyCode === rightKey) rightPressed = true;
    if (e.keyCode === leftKey) leftPressed = true;
    if (e.keyCode === shiftKey) shiftPressed = true;
    if (e.keyCode === ctrlKey) ctrlPressed = true;
});

document.addEventListener("keyup", e => {
    if (e.keyCode === rightKey) rightPressed = false;
    if (e.keyCode === leftKey) leftPressed = false;
    if (e.keyCode === shiftKey) shiftPressed = false;
    if (e.keyCode === ctrlKey) ctrlPressed = false;
});

document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('score1').style.display = 'block';
    document.getElementById('score2').style.display = 'block';
});

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

function drawPaddles() {
    ctx.fillStyle = "brown";
    ctx.fillRect(paddle1X, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillRect(paddle2X, 0, paddleWidth, paddleHeight);
}

function updateScore() {
    scoreDisplay1.textContent = `${score1}`;
    scoreDisplay2.textContent = `${score2}`;
}

function draw() {
    if (!gameStarted) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();

    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Ball hitting the top (Player 2's area)
    if (y + dy < ballRadius) {
        if (x > paddle2X && x < paddle2X + paddleWidth) {
            dy = -dy;
        } else {
            score1++;

            if (score1 >= WINNING_SCORE) {
                updateScore();
                showGameOver();
                return;
            }
            resetBall();
            initializeGame();

        }
    }

    // Ball hitting the bottom (Player 1's area)
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddle1X && x < paddle1X + paddleWidth) {
            dy = -dy;
        } else {
            score2++;
            if (score2 >= WINNING_SCORE) {
                updateScore();
                showGameOver();
            return;
            }
            resetBall();
            initializeGame();
        }
    }
    
    
    if (rightPressed) paddle1X = Math.min(paddle1X + 5, canvas.width - paddleWidth);
    if (leftPressed) paddle1X = Math.max(paddle1X - 5, 0);
    if (shiftPressed) paddle2X = Math.min(paddle2X + 5, canvas.width - paddleWidth);
    if (ctrlPressed) paddle2X = Math.max(paddle2X - 5, 0);
    requestAnimationFrame(draw);
    
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    
        x = canvas.width;
        y = canvas.height;
        let slowDx = dx > 0 ? 1 : -1; 
        let slowDy = dy > 0 ? 1 : -1;
        
        dx = slowDx;
        dy = slowDy;
    
        setTimeout(() => {
            dx = slowDx; 
            dy = slowDy ;
        }, 1);

        setTimeout(() => {            
            dx = dx > 0 ? 3 : -3;
            dy = dy > 0 ? 3 : -3;
        }, 3000);

        setTimeout(() => {
            dx = dx > 0 ? 3 * Level : -3 * Level;
            dy = dy > 0 ? 3 * Level : -3 * Level;
        }, 6000);
}


startButton.addEventListener("click", function () {
    let inputPlayerName1 = document.getElementById("playerName1").value.trim();
    let inputPlayerName2 = document.getElementById("playerName2").value.trim();
    let inputMaxScore = parseInt(document.getElementById("maxScore").value);

    if (!inputPlayerName1 || !inputPlayerName2) {
        alert("Please enter both players' names before starting the game.");
        return;
    }

    if (isNaN(inputMaxScore) || inputMaxScore < 1) {
        alert("Please enter a valid max score (must be at least 1).");
        return;
    }

    playerName1 = inputPlayerName1;
    playerName2 = inputPlayerName2;
    WINNING_SCORE = inputMaxScore;

    startGame();
});

function startGame() {
    console.log(`Game started for ${playerName1} and  ${playerName2}`);
    document.getElementById("playerName1").disabled = true;
    document.getElementById("playerName2").disabled = true;
    startButton.style.display = "none";
    playAgainButton.style.display = "none";
    exitButton.style.display = "inline";
    
    score1 = 0;
    score2 = 0;    

    initializeGame();
    draw();
}

function playAgain() {
    saveScore();
    initializeGame();
    gameOverPopup.style.display = "none";
     
    startGame();
    window.location.reload();
}

function showGameOver() {
    clearInterval(speedIncreaseInterval);
    let winnerText = "";

    if (score1 > score2) {
        winnerText = `🏆 Winner: <strong>${playerName1}</strong>`;
    } else if (score2 > score1) {
        winnerText = `🏆 Winner: <strong>${playerName2}</strong>`;
    } 
    document.getElementById("winnerDisplay").innerHTML = winnerText;

    gameOverPopup.style.display = "block";
    gameOverPopup.style.visibility = "visible"; 
    gameOverPopup.style.opacity = "1"; 

    setTimeout(fetchRecords, 5000);
}

function exitGame() {
    
    saveScore();
    startGame();
    window.location.reload();
}

function fetchRecords() {
    fetch("http://localhost:3000/records")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Records:", data); // Debugging
            recordsList.innerHTML = "";

            if (data.length > 0) {
                document.getElementById("recordsContainer").style.display = "block";
                data.forEach((entry, index) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Match ${index + 1}: ${entry.winner} won with score ${entry.score}`;
                    recordsList.appendChild(listItem);
                });
            } else {
                document.getElementById("recordsContainer").style.display = "none"; 
            }
        })
        .catch(error => console.error("Error fetching records:", error));
}

function saveScore() {
    let winner = score1 > score2 ? playerName1 : playerName2;
    let scoreSummary = score1 > score2 ?  `${score1}/${score2}` :  `${score2}/${score1}`;
    fetch("http://localhost:3000/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            player1: playerName1, score1: score1, 
            player2: playerName2, score2: score2 ,
            winner: winner, scoreSummary: scoreSummary
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        fetchRecords();
    })
    .catch(error => console.error("Error saving score:", error));
}

document.addEventListener("DOMContentLoaded", fetchRecords);
playAgainButton.addEventListener('click', playAgain);
retryButton.addEventListener('click', playAgain);
exitButton.addEventListener('click', exitGame);
