# Ping Pong Ball Game

## Author
Priyashi Khandka

## Description
The Ping Pong Ball Game is a multiplayer arcade-style game where two players control paddles to keep the ball in play. The objective is to prevent the ball from passing their paddle while trying to outlast the opponent. The game progressively increases in difficulty as the ball's speed increases with levels.

The game ends when one player misses the ball, awarding a point to the opponent. The first player to reach the winning score is declared the winner. Players can start a new game, retry after a game over, or exit the game at any time. Game progress and records are stored for later reference.

## Gameplay

### Movement
- **Player 1**: Moves the paddle left and right using the **left-arrow key** and **right-arrow key**.
- **Player 2**: Moves the paddle using the **Shift (left) key** and **Ctrl (right) key**.

### Scoring
- A player earns a point when the opponent misses the ball.
- The game ends when one player reaches the winning score.

### Leveling Up
- The game difficulty increases every **5 seconds** as the ball's speed increases.
- Higher levels make paddle control and timing more challenging.

### Game Over
- The game ends when a player reaches the winning score, triggering a **Game Over** popup with options to retry or exit.

## Features
- **Multiplayer Paddle Movement**: Both players control their paddles using designated keyboard keys.
- **Ball Movement**: The ball dynamically bounces off the walls and paddles, with speed increasing over time.
- **Score and Level System**: Players earn points when the opponent fails to hit the ball. Scores and levels are displayed in real-time.
- **Game Over Popup**: A popup appears when the game ends, displaying the winner and offering retry or exit options.
- **Exit Button**: Allows players to quit the game at any point.
- **Responsive Game Start**: The game starts smoothly with a "Start Game" button, and a "Play Again" button appears after the game ends.
- **Local Storage**: Stores player names and past match records for later reference.
- **Match History**: Displays past game records fetched from storage.
- **Fetch API Integration**: Saves and retrieves match records using API endpoints.

## How to Play
1. Start the game and enter your player names.
2. **Player 1**: Use the **left-arrow key** and **right-arrow key** to move the paddle.
3. **Player 2**: Use the **Shift (left) key** and **Ctrl (right) key** to move the paddle.
4. The ball bounces dynamically; try to hit the ball with your paddle.
5. Score points by making the opponent miss the ball.
6. The first player to reach the winning score wins the game.
7. After the game ends, players can retry or exit using the provided options.

Enjoy the game and challenge your friends to a thrilling match!
