// Select the display elements
const displayNumber =
  document.querySelector(".number"); // For the entered number
const displayResult =
  document.querySelector(".result"); // For the result

// Initialize variables to store the current input, previous input, and operator
let currentInput = ""; // Holds the currently entered value
let previousInput = ""; // Holds the previous value before an operator
let operator = ""; // Stores the selected operator

// Function to update the display
function updateDisplay() {
  displayNumber.textContent =
    previousInput || "0"; // Show current input or 0 if empty
  displayResult.textContent = currentInput || "0"; // Show previous input or 0 if empty
}

// Function to handle number button clicks
function handleNumber(value) {
  if (currentInput.length < 12) {
    // Limit input length to 12 characters
    currentInput += value; // Append the clicked number to the current input
    updateDisplay(); // Update the display
  }
}

// Function to handle operator button clicks
function handleOperator(value) {
  if (currentInput === "" && previousInput === "")
    return; // Do nothing if both inputs are empty
  if (currentInput && previousInput && operator)
    calculate(); // Calculate if previous input exists

  operator = value; // Store the selected operator
  previousInput = currentInput; // Move the current input to the previous input
  currentInput = ""; // Reset current input for new number
  updateDisplay(); // Update the display
}

// Function to calculate the result
function calculate() {
  const num1 = parseFloat(previousInput); // Convert previous input to a number
  const num2 = parseFloat(currentInput); // Convert current input to a number

  if (isNaN(num1) || isNaN(num2)) return; // Exit if either number is invalid

  let result = 0; // Variable to hold the calculation result

  switch (operator) {
    case "+":
      result = num1 + num2; // Addition
      break;
    case "-":
      result = num1 - num2; // Subtraction
      break;
    case "x":
      result = num1 * num2; // Multiplication
      break;
    case "÷":
      result = num2 !== 0 ? num1 / num2 : "Error"; // Division (handle division by zero)
      break;
    case "%":
      result = num1 % num2; // Modulus
      break;
    default:
      return;
  }

  currentInput = result.toString(); // Store the result in current input
  previousInput = ""; // Clear previous input
  operator = ""; // Reset operator
  updateDisplay(); // Update the display
}

// Function to clear all inputs
function clearAll() {
  currentInput = ""; // Reset current input
  previousInput = ""; // Reset previous input
  operator = ""; // Reset operator
  updateDisplay(); // Update the display
}

// Function to handle backspace
function backspace() {
  currentInput = currentInput.slice(0, -1); // Remove the last character
  updateDisplay(); // Update the display
}

// Add event listeners to all buttons
document
  .querySelectorAll(".buttons button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim(); // Get the button's value

      if (!isNaN(value)) {
        // Handle number buttons
        handleNumber(value);
      } else if (value === "C") {
        // Handle clear button
        clearAll();
      } else if (value === "⌫") {
        // Handle backspace (or use image alt text for compatibility)
        backspace();
      } else if (value === "=") {
        // Handle equals button
        calculate();
      } else {
        // Handle operator buttons
        handleOperator(value);
      }
    });
  });
