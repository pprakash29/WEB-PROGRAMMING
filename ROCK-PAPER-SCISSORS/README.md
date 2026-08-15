# AI Rock Paper Scissors — Mind Reader

## Stack
HTML5, CSS3, JavaScript, browser camera, MediaPipe Hands, adaptive/statistical AI prediction, Git/GitHub.

## How it works
1. Webcam captures the player's hand.
2. MediaPipe detects 21 hand landmarks.
3. JavaScript classifies the pose as Rock, Paper, or Scissors.
4. Completed player moves are stored.
5. A recency-weighted frequency + transition model predicts the next move.
6. AI locks the counter move BEFORE the current hand is accepted.
7. The current gesture is revealed and the winner is calculated.
8. Score, history, probabilities and predictability are updated.

## Run
Use VS Code + Live Server. Open `index.html` through localhost, allow camera permission, click Start Camera, then Start Round.

## Note
The prediction layer is a lightweight adaptive/statistical AI for an educational mini-project, not a trained neural network.