let input = document.getElementById('inputText');
let buttons = document.querySelectorAll('button:not(#clearHistory)');
let historyDiv = document.getElementById('history');
let clearHistoryButton = document.getElementById('clearHistory');
let historyIcon = document.getElementById('historyIcon');

// State object to hold values
let state = {
    currentValue: "",
    expression: "",
    isResultDisplayed: false,
    historyList: [],
};
input.textContent = " ";
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.textContent);
    });
});
document.addEventListener('keydown', (e) => {
    const key = e.key;
    switch (true) {
        case '0123456789+-*/.%'.includes(key):
            handleInput(key);
            break;
        case key === 'Enter' || key === '=':
            handleInput('=');
            break;
        case key === 'Backspace':
            handleInput('DEL');
            break;
        case key === 'Delete':
            handleInput('DEL');
            break;
        case key === 'Escape':
            handleInput('AC');
            break;
        default:
            break;
    }
});
clearHistoryButton.addEventListener('click', (e) => {
    e.stopPropagation();
    state.historyList = [];
    updateHistoryDisplay();
});
historyIcon.addEventListener('click', () => {
    historyDiv.classList.toggle('expanded');
    if (historyDiv.classList.contains('expanded')) {
        historyDiv.style.display = 'block';
    } else {
        historyDiv.style.display = 'none';
    }
});
// Function to handle input
function handleInput(value) {

    if (value === 'AC') {
        state.currentValue = "";
        state.expression = "";
        input.textContent = "0";
        state.isResultDisplayed = false;
        return;
    }
    if (value === 'DEL') {
        if (state.isResultDisplayed) {
            state.currentValue = "";
            input.textContent = "0";
            state.isResultDisplayed = false;
        } else {
            state.currentValue = state.currentValue.slice(0, -1);
            input.textContent = state.currentValue || "0";
        }
        return;
    }
    if (value === '=') {
        if (state.currentValue) {
            state.expression += state.currentValue;
        }
        const result = calculate(state.expression);
        if (result !== null) {
            input.textContent = result;
            state.historyList.push(`${state.expression} = ${result}`);
            state.currentValue = result.toString();
            state.expression = "";
            state.isResultDisplayed = true;
            updateHistoryDisplay();
        } else {
            input.textContent = 'Error';
            state.currentValue = "";
            state.expression = "";
            state.isResultDisplayed = true;
        }
        return;
    }
    if ('+-*/%'.includes(value)) {
        if (state.currentValue) {
            state.expression += state.currentValue;
            state.expression += value;
            state.currentValue = "";
        } else if (state.expression && '+-*/%'.includes(state.expression.slice(-1))) {
            state.expression = state.expression.slice(0, -1) + value;
        }

        return;
    }
    if (state.currentValue.length < 10) {
        if ('0123456789'.includes(value)) {
            if (state.isResultDisplayed) {
                state.currentValue = value;
                state.isResultDisplayed = false;
            } else {
                state.currentValue += value;
            }
            input.textContent = state.currentValue;
        } else if (value === '.') {
            if (!state.currentValue.includes('.')) {
                state.currentValue += value;
                input.textContent = state.currentValue;
            }
        } else if (value === '00') {
            if (state.currentValue.length < 9) {
                state.currentValue += '00';
                input.textContent = state.currentValue;
            }
        }
    }
}
// Function to perform calculation
function calculate(expression) {
    try {
        return eval(expression);
    } catch {
        return null;
    }
}
// Function to update the history 
function updateHistoryDisplay() {
    historyDiv.textContent = "";
    state.historyList.forEach(historyItem => {
        let historyLine = document.createElement('div');
        historyLine.textContent = historyItem;
        historyDiv.appendChild(historyLine);
    });
}
