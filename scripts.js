let isOn = true;  // Assume the calculator is on by default. Modify as needed.
let currentInput = '';
let operation = '';

function appendCharacter(character) {
    currentInput += character;
    document.getElementById('display').value = currentInput;
}

function performOperation(op) {
    if (operation) compute();
    operation = op;
    currentInput += op;
    document.getElementById('display').value = currentInput;
}

function applyPercentage() {
    if (currentInput) {
        currentInput = String(parseFloat(currentInput) / 100);
        document.getElementById('display').value = currentInput;
    }
}

function compute() {
    if (operation) {
        let result;
        if (operation === "Math.sqrt") {
            result = Math.sqrt(parseFloat(currentInput));
        } else if (operation.includes("Math.")) {
            let func = operation.split('Math.')[1];
            result = Math[func](parseFloat(currentInput));
        } else {
            result = eval(currentInput);
        }
        document.getElementById('display').value = result;
        currentInput = String(result);
        operation = '';
    }
}

function clearDisplay() {
    currentInput = '';
    operation = '';
    document.getElementById('display').value = '';
}

function deleteRightmost() {
    // currentInput = currentInput.slice(0, -1);
    // document.getElementById('display').value = currentInput;
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('display').value = currentInput;
    }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (!isOn) return; // Ensure the calculator is ON

    let validNumbers = "0123456789";
    let validOperations = "+-*/";

    // Check if pressed key is a number
    if (validNumbers.includes(event.key)) {
        appendCharacter(event.key);
    }

    // Check if pressed key is a valid operation
    else if (validOperations.includes(event.key)) {
        performOperation(event.key);
    }

    // Check for other valid keys (like dot, equals, backspace)
    else if (event.key === ".") {
        appendCharacter('.');
    } else if (event.key === "Enter") {
        compute();
    } else if (event.key === "Backspace") {
        deleteRightmost();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
}