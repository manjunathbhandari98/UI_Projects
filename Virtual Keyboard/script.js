textArea = document.querySelector("input");
let isShiftActive = false;
const shiftButton =
  document.querySelectorAll(".shift");
const capsButton =
  document.querySelector(".capsLock");
let isCapsLockActive = false;
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const buttons =
      document.querySelectorAll(".buttons");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const buttonText = button.innerText;
        const paragraphs =
          button.querySelectorAll("p");
        if (buttonText == "Backspace") {
          onBackspace();
        } else if (buttonText == "Shift") {
          onShiftTap();
        } else if (buttonText == "CapsLock") {
          onCapsLock();
        } else if (buttonText == "Tab") {
          onTabClick();
        } else if (buttonText == "Delete") {
          onDelete();
        } else if (buttonText == "Space") {
          onSpaceClick();
        } else {
          checkShiftOn(paragraphs);
        }
      });
    });
  }
);

const onBackspace = () => {
  textArea.value = textArea.value.slice(0, -1);
};

const onDelete = () => {
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;
  if (start === end) {
    textArea.value =
      textArea.value.slice(0, start) +
      textArea.value.slice(start + 1);
  } else {
    textArea.value =
      textArea.value.slice(0, start) +
      textArea.value.slice(end);
  }
  textArea.setSelectionRange(start, start);
};

const onSpaceClick = () => {
  textArea.value += " ";
};

const onShiftTap = () => {
  isShiftActive = !isShiftActive;
  shiftButton.forEach((btn) => {
    if (isShiftActive) {
      btn.style.background = "blue";
    } else {
      btn.style.background = "transparent";
    }
  });
};

const onCapsLock = () => {
  isCapsLockActive = !isCapsLockActive;
  if (isCapsLockActive) {
    capsButton.style.background = "white";
    capsButton.style.color = "black";
  } else {
    capsButton.style.background = "transparent";
    capsButton.style.color = "white";
  }
};
const checkShiftOn = (paragraphs) => {
  if (
    isShiftActive &&
    isCapsLockActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toLowerCase();
  } else if (
    isCapsLockActive &&
    !isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toUpperCase();
  } else if (
    !isCapsLockActive &&
    isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toUpperCase();
  } else if (
    !isCapsLockActive &&
    !isShiftActive &&
    paragraphs.length == 1
  ) {
    textArea.value +=
      paragraphs[0].textContent.toLowerCase();
  } else if (
    isShiftActive &&
    paragraphs.length > 1
  ) {
    textArea.value += paragraphs[0].textContent;
  } else if (
    !isShiftActive &&
    paragraphs.length > 1
  ) {
    textArea.value += paragraphs[1].textContent;
  }
};

const onTabClick = () => {
  textArea.value += "        ";
};

// document.addEventListener("keydown", (event) => {
//   // Check if Caps Lock is on using the 'getModifierState' method
//   if (
//     event.getModifierState &&
//     event.getModifierState("CapsLock")
//   ) {
//     isCapsLockActive = true;
//   } else {
//     isCapsLockActive = false;
//   }
//   onCapsLock();
// });

// // Optional: Listen for 'keyup' event as well if needed
// document.addEventListener("keyup", (event) => {
//   if (
//     event.getModifierState &&
//     event.getModifierState("CapsLock")
//   ) {
//     isCapsLockActive = true;
//   } else {
//     isCapsLockActive = false;
//   }
//   onCapsLock();
// });
