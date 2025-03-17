# Ping Pong Ball Game

## Author
Priyashi Khandka

## Description
The Ping Pong Ball Game is a simple arcade-style game where the player controls a paddle at the bottom of the screen to bounce a ball. The objective is to keep the ball in play and score points by hitting it with the paddle. The game progressively increases in difficulty as the ball's speed increases with each level.

The game ends when the ball falls past the paddle, resulting in a "Game Over." Afterward, the player can choose to replay the game or exit.

## Gameplay

### Movement
- The player controls the paddle using the **left-arrow key** and **right-arrow key** to move it left and right, respectively.

### Scoring
- Players score points each time the ball successfully hits the paddle.
- The score is displayed at the top of the screen.
  
### Leveling Up
- The player advances to the next level after reaching **1 point per level**.
- The ball’s speed increases with each level, making the game more challenging.

### Game Over
- The game ends when the ball falls past the paddle.
- A **Game Over** popup will appear, offering options to either retry or exit the game.

## Features
- **Paddle Movement**: Control the paddle’s position left and right using the keyboard’s arrow keys.
- **Ball Movement**: The ball bounces off the paddle, walls, and ceiling, with increasing speed as the player progresses.
- **Score and Level System**: The score increases each time the ball hits the paddle. The level advances after every point, and the ball speed increases accordingly.
- **Game Over Popup**: When the ball falls below the paddle, a Game Over screen appears with options to retry or exit.
- **Level-Up Animation**: The level display animates each time the player reaches a new level, providing a visual cue for progression.
- **Exit Button**: A button that allows the player to exit the game at any point during gameplay.
- **High Score and Name Storage**: 
  - Players can enter their name before starting the game.
  - Scores are saved locally and displayed in a high-score list.
  - The game fetches high scores from a local server and sorts them in descending order.
  - After a game over, the player's score is automatically saved and compared with previous high scores.

## How to Play
1. Enter your name in the provided input field before starting the game.
2. Use the **left-arrow key** and **right-arrow key** to move the paddle left and right.
3. The ball bounces automatically. Try to hit the ball with the paddle.
4. Score points by hitting the ball with the paddle.
5. The game ends when the ball falls past the paddle.
6. If the game ends, your score is saved, and you can either retry or exit the game using the buttons provided.
