let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let historyDiv = document.getElementById('history');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ('0123456789+-*/'.includes(key)) {
        handleInput(key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('=');
    } else if (key === 'Backspace' || key === 'DEL') {
        handleInput('DEL');
    } else if (key.toUpperCase() === 'A' && e.ctrlKey) {
        handleInput('AC');
    }
});

// Clear History button event
document.getElementById('clearHistory').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    historyDiv.innerHTML = "";
    historyDiv.style.display = "none";
});

function handleInput(value) {
    if (value === '=') {
        try {
            let result = eval(string);
            historyDiv.innerHTML += `<div>${string} = ${result}</div>`;
            input.value = result;
            string = result.toString();
            historyDiv.style.display = historyDiv.innerHTML ? "block" : "none";

        } catch (error) {
            input.value = 'Error';
            string = "";
        }
    } else if (value === 'AC') {
        string = "";
        input.value = string;
    } else if (value === 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } else {
        string += value;
        input.value = string;
    }
}