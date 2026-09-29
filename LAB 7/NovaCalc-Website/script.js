const HISTORY_KEY = "novacalc-history";
const MAX_HISTORY_ITEMS = 8;

const form = document.getElementById("calculator-form");
const firstNumberInput = document.getElementById("num1");
const secondNumberInput = document.getElementById("num2");
const resultPanel = document.getElementById("result");
const resultValue = document.getElementById("result-value");
const message = document.getElementById("message");
const operatorDisplay = document.getElementById("operator-display");
const historyList = document.getElementById("history-list");
const emptyHistory = document.getElementById("empty-history");
const historyCount = document.getElementById("history-count");
const operationButtons = document.querySelectorAll("[data-operation]");

let history = loadHistory();

function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)));
}

function getOperatorLabel(operator) {
    return { "+": "+", "-": "−", "*": "×", "/": "÷" }[operator];
}

function calculate(operator) {
    operatorDisplay.textContent = getOperatorLabel(operator);
    operationButtons.forEach((button) => {
        button.classList.toggle("selected", button.dataset.operation === operator);
    });

    const firstValue = firstNumberInput.value.trim();
    const secondValue = secondNumberInput.value.trim();

    clearMessage();

    if (!firstValue || !secondValue) {
        showMessage("Add both numbers to get a result.");
        return;
    }

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        showMessage("Please enter valid numbers only.");
        return;
    }

    if (operator === "/" && num2 === 0) {
        showMessage("Division by zero is not allowed.");
        return;
    }

    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };
    const result = operations[operator](num1, num2);

    resultValue.textContent = formatNumber(result);
    resultPanel.classList.remove("result-pop");
    void resultPanel.offsetWidth;
    resultPanel.classList.add("result-pop");

    addToHistory(`${formatNumber(num1)} ${getOperatorLabel(operator)} ${formatNumber(num2)} = ${formatNumber(result)}`);
}

function clearCalculator() {
    firstNumberInput.value = "";
    secondNumberInput.value = "";
    resultValue.textContent = "—";
    operatorDisplay.textContent = "+";
    clearMessage();
    firstNumberInput.focus();
}

function showMessage(text) {
    message.textContent = text;
}

function clearMessage() {
    message.textContent = "";
}

function loadHistory() {
    try {
        const savedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY));
        return Array.isArray(savedHistory) ? savedHistory.slice(0, MAX_HISTORY_ITEMS) : [];
    } catch (error) {
        console.warn("Calculation history could not be loaded.", error);
        return [];
    }
}

function saveHistory() {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.warn("Calculation history could not be saved.", error);
    }
}

function addToHistory(calculation) {
    history.unshift({ calculation, time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) });
    history = history.slice(0, MAX_HISTORY_ITEMS);
    saveHistory();
    renderHistory();
}

function renderHistory() {
    historyList.querySelectorAll(".history-item").forEach((item) => item.remove());
    emptyHistory.hidden = history.length > 0;
    historyCount.textContent = history.length;

    history.forEach((entry, index) => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.style.animationDelay = `${index * 0.04}s`;
        item.textContent = entry.calculation;

        const time = document.createElement("span");
        time.textContent = entry.time;
        item.appendChild(time);
        historyList.appendChild(item);
    });
}

operationButtons.forEach((button) => {
    button.addEventListener("click", () => calculate(button.dataset.operation));
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate("+");
});

document.getElementById("clear-button").addEventListener("click", clearCalculator);

document.getElementById("clear-history").addEventListener("click", () => {
    history = [];
    saveHistory();
    renderHistory();
});

document.addEventListener("keydown", (event) => {
    const operators = { "+": "+", "-": "-", "*": "*", "/": "/" };

    if (operators[event.key]) {
        event.preventDefault();
        calculate(operators[event.key]);
    } else if (event.key === "Enter") {
        event.preventDefault();
        calculate("+");
    } else if (event.key === "Escape") {
        clearCalculator();
    }
});

renderHistory();
