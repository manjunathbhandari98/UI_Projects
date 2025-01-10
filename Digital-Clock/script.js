const updateTime = () => {
  const time = document.querySelector(".time");
  const now = new Date();
  const hours = now
    .getHours()
    .toString()
    .padStart(2, "0"); // Add leading zero
  const minutes = now
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = now
    .getSeconds()
    .toString()
    .padStart(2, "0");
  time.textContent =
    hours + ":" + minutes + ":" + seconds;
};

// update the time on page load
updateTime();

// update time every second
setInterval(updateTime, 1000);
