let countdown;
let isRunning = false;

function startTimer(seconds) {
    if (isRunning) return;

    let timeLeft = seconds * 1000; // Convert to milliseconds
    const timerDisplay = document.getElementById("timer");
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "0.000s";
            document.body.classList.add("red"); // Turn background red
            isRunning = false;
        } else {
            let secondsLeft = (timeLeft / 1000).toFixed(3); // Convert to seconds with 3 decimal places
            timerDisplay.textContent = `${secondsLeft}s`;
            timeLeft -= 10; // Decrease in 10ms intervals
        }
    }, 10);

    isRunning = true;
}
