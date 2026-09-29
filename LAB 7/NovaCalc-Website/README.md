# NovaCalc

## Project Description

NovaCalc is a modern browser-based mathematical calculator. It allows users to perform addition, subtraction, multiplication, and division using two input values, while displaying recent calculations in a persistent history panel.

## Objective

The objective of this project is to build an interactive calculator interface that demonstrates form handling, input validation, arithmetic operations, keyboard controls, dynamic DOM updates, and browser storage.

## Features

- Input fields for two numbers
- Addition, subtraction, multiplication, and division
- Validation for missing and invalid values
- Division-by-zero protection
- Instant result display
- Animated result feedback
- Selected operation indicator
- Calculation history with timestamps
- Maximum of eight saved history entries
- History persistence using `localStorage`
- Clear calculator button
- Clear history button
- Keyboard shortcuts for mathematical operators
- `Enter` key to calculate
- `Escape` key to clear the calculator
- Responsive calculator and history-card layout

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser `localStorage` API
- DOM event handling

## File/Folder Structure

```text
NovaCalc-Website/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run the Project

1. Open the `NovaCalc-Website` folder.
2. Open `index.html` in a modern web browser.

No server or package installation is required.

## Key Functionality

- `script.js` reads the two number inputs and performs the selected operation.
- Invalid input, missing values, and division by zero produce clear messages.
- Results are formatted before being displayed and added to the history list.
- Calculation history is limited to eight entries and saved under the `novacalc-history` key in `localStorage`.
- The history panel is rebuilt dynamically whenever a calculation is added or cleared.
- `style.css` provides the dark visual design, responsive layout, cards, controls, focus states, and animations.
