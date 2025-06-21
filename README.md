# React Match Pair Game

Create a memory matching game where players flip cards to find matching pairs in a 4x4 grid (8 pairs total).  
The game should track flips, matches, and moves, and provide visual feedback during gameplay.

## Demo

Live Preview: https://react-match-pair-game.onrender.com

---

## Requirements

### 1. Card Grid

- Render a 4x4 grid (total 16 cards).
- Each card hides a **number** initially.
- Use numbers **1 to 8**, each repeated twice.
- Randomly shuffle numbers on every game start/reset.

---

### 2. Card Behavior

- When a card is clicked:
  1. Reveal the number.
  2. Only two cards can be revealed at a time.
- If the two revealed cards **match**, they stay visible (marked as matched).
- If they **don’t match**, flip them back after a 1-second delay.
- Disable user interaction during this 1-second delay.

---

### 3. Game Logic

- Track and display the number of **moves** (every two flips = one move).
- When all pairs are matched:  
  Show a **🎉 You won!** message.

---

### 4. Reset Button

- Provide a **Reset** button to restart the game:
  1. Shuffle the numbers.
  2. Reset the move counter.
  3. Hide all cards.
  4. Clear any matched state or win message.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-match-pair-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-calculator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Visit the application in your browser at `http://localhost:3000`.

## License

This project is licensed under the MIT License.

## Author

- **DEVI R** - _Initial work_ - [Devi R](https://www.linkedin.com/in/devi-r-06bb94a7)
