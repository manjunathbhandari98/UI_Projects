// Get the input element where user text will be entered
const textArea = document.querySelector("input");

// Variable to track the state of the Shift key
let isShiftActive = false;

// Get all elements representing the Shift button
const shiftButton =
  document.querySelectorAll(".shift");

// Get the element representing the Caps Lock button
const capsButton =
  document.querySelector(".capsLock");

// Variable to track the state of the Caps Lock key
let isCapsLockActive = false;

// Add an event listener to initialize functionality when the DOM is fully loaded
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Get all buttons with the class "buttons"
    const buttons =
      document.querySelectorAll(".buttons");

    // Add a click event listener to each button
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the button's text
        const buttonText = button.innerText;

        // Get all paragraphs (if any) inside the button
        const paragraphs =
          button.querySelectorAll("p");

        // Perform an action based on the button text
        if (buttonText == "Backspace") {
          onBackspace(); // Call the Backspace function
        } else if (buttonText == "Shift") {
          onShiftTap(); // Call the Shift function
        } else if (buttonText == "CapsLock") {
          onCapsLock(); // Call the Caps Lock function
        } else if (buttonText == "Tab") {
          onTabClick(); // Call the Tab function
        } else if (buttonText == "Delete") {
          onDelete(); // Call the Delete function
        } else if (buttonText == "Space") {
          onSpaceClick(); // Call the Space function
        } else {
          checkShiftOn(paragraphs); // Handle character typing based on Shift and Caps Lock states
        }
      });
    });
  }
);

// Function to handle the Backspace key
const onBackspace = () => {
  const start = textArea.selectionStart; // Get the cursor's starting position
  const end = textArea.selectionEnd; // Get the cursor's ending position

  if (start === end && start > 0) {
    // No text selected, delete the character before the cursor
    textArea.value =
      textArea.value.slice(0, start - 1) +
      textArea.value.slice(end);
    textArea.setSelectionRange(
      start - 1,
      start - 1
    ); // Move cursor to the left by 1
  } else if (start !== end) {
    // Text is selected, delete the selected text
    textArea.value =
      textArea.value.slice(0, start) +
      textArea.value.slice(end);
    textArea.setSelectionRange(start, start); // Set cursor at the start of the selection
  }

  // Keep the text area focused so the cursor remains active
  textArea.focus();
};

// Function to handle the Delete key
const onDelete = () => {
  const start = textArea.selectionStart; // Get the start of the selection
  const end = textArea.selectionEnd; // Get the end of the selection

  if (start === end) {
    // No text is selected, delete the character after the cursor
    textArea.value =
      textArea.value.slice(0, start) +
      textArea.value.slice(start + 1);
  } else {
    // Text is selected, delete the selected text
    textArea.value =
      textArea.value.slice(0, start) +
      textArea.value.slice(end);
  }

  // Reset the cursor position
  textArea.setSelectionRange(start, start);
};

// Function to handle the Space button
const onSpaceClick = () => {
  // Add a single space to the text area
  textArea.value += " ";
};

// Function to toggle the Shift state
const onShiftTap = () => {
  // Toggle the Shift state
  isShiftActive = !isShiftActive;

  // Update the visual state of all Shift buttons
  shiftButton.forEach((btn) => {
    if (isShiftActive) {
      btn.style.background = "#047C97"; // Highlight the Shift button
    } else {
      btn.style.background = "transparent"; // Reset the background
    }
  });
};

// Function to toggle the Caps Lock state
const onCapsLock = () => {
  // Toggle the Caps Lock state
  isCapsLockActive = !isCapsLockActive;

  // Update the visual state of the Caps Lock button
  if (isCapsLockActive) {
    capsButton.style.background = "white"; // Highlight the Caps Lock button
    capsButton.style.color = "black"; // Change the text color
  } else {
    capsButton.style.background = "transparent"; // Reset the background
    capsButton.style.color = "white"; // Reset the text color
  }
};

// Function to handle typing based on Shift and Caps Lock states
const checkShiftOn = (paragraphs) => {
  if (
    isShiftActive &&
    isCapsLockActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toLowerCase(); // Both active: lowercase
  } else if (
    isCapsLockActive &&
    !isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toUpperCase(); // Only Caps Lock active
  } else if (
    !isCapsLockActive &&
    isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toUpperCase(); // Only Shift active
  } else if (
    !isCapsLockActive &&
    !isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toLowerCase(); // Both inactive
  } else if (
    isShiftActive &&
    paragraphs.length > 1
  ) {
    textArea.value += paragraphs[0].textContent; // Shift active and button has two values
  } else if (
    !isShiftActive &&
    paragraphs.length > 1
  ) {
    textArea.value += paragraphs[1].textContent; // No Shift and button has two values
  }
};

// Function to handle the Tab key
const onTabClick = () => {
  // Add multiple spaces (8 spaces) to simulate a tab
  textArea.value += "        ";
};
