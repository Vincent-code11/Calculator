let firstNumber = "";
let secondNumber = "";
let operator = "";

let justCalculated = false;


const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const deleteButton = document.querySelector(".delete");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }

  return a / b;
}


function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
      return subtract(a, b);
  } else if (operator === "*") {
      return multiply(a, b);
  } else if (operator === "/") {
      return divide(a, b);
  }
}

function updateDisplay() {
  if (operator === "") {
    display.textContent = firstNumber || "0";
  } else {
    display.textContent =
    firstNumber + " " +
    operator + " " +
    secondNumber;
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (justCalculated) {
      firstNumber = "";
      secondNumber = "";
      operator = "";
      justCalculated = false;
    }
    if (operator === "") {
      firstNumber += button.textContent;
    }else {
      secondNumber += button.textContent;
    }
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstNumber === "") {
      return;
    }
    if (operator !== "" && secondNumber === "") {
      operator = button.textContent;
      updateDisplay();
      return;
    }
    if (operator !== "" && secondNumber !== "") {
      let result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
      );
      if (typeof result === "number") {
        result = Math.round(result * 100000000) / 100000000;
      }
      
      firstNumber = result.toString();
      secondNumber = "";

      operator = button.textContent;

      updateDisplay();

      return;
    }


    operator = button.textContent;

    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  if (
    firstNumber === "" ||
    operator === "" ||
    secondNumber === ""
  ) {
      return;
  }

  let result = operate(
    operator,
    Number(firstNumber),
    Number(secondNumber)
  );


  if (typeof result === "number") {
    result = Math.round(result * 100000000) / 100000000;
  }


  display.textContent = result;


  firstNumber = result.toString();
  secondNumber = "";
  operator = "";
  justCalculated = true;
});

clearButton.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";

  justCalculated = false;

  display.textContent = "0";
});

decimalButton.addEventListener("click", () => {
  if (justCalculated) {
    firstNumber = "";
    secondNumber = "";
    operator = "";

    justCalculated = false;
  }


  if (operator === "") {
    if (!firstNumber.includes(".")) {
      if (firstNumber === "") {
        firstNumber = "0.";
      } else {
          firstNumber += ".";
        }
    }

    } else {
        if (!secondNumber.includes(".")) {
          if (secondNumber === "") {
            secondNumber = "0.";
          } else {
              secondNumber += ".";
            }
        }
      }


  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
  } else {
      secondNumber = secondNumber.slice(0, -1);
    }

  updateDisplay();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;


  if (key >= "0" && key <= "9") {
    const button = [...numberButtons].find(
      (button) => button.textContent === key
    );

    if (button) {
      button.click();
    }
  }

  if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/"
  ) {
    const button = [...operatorButtons].find(
      (button) => button.textContent === key
    );

    if (button) {
      button.click();
      }
  }


  if (key === "Enter" || key === "=") {
    equalsButton.click();
  }

  if (key === "Backspace") {
    deleteButton.click();
  }

  if (key === "Escape") {
    clearButton.click();
  }

  if (key === ".") {
    decimalButton.click();
  }
});
