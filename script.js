let countdown;

function startTimer(seconds) {
    clearInterval(countdown); // Clear any existing timer

    let timeLeft = seconds * 1000; // Convert seconds to milliseconds
    const timerDisplay = document.getElementById("timer");
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "0.000s";
            document.body.classList.add("red"); // Turn background red
        } else {
            let secondsLeft = (timeLeft / 1000).toFixed(3); // Convert to seconds with milliseconds
            timerDisplay.textContent = `${secondsLeft}s`;
            timeLeft -= 10; // Decrease in 10ms intervals
        }
    }, 10);
}

// JAR COUNTERS - Fixing the issue
document.querySelectorAll(".counter-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const counterId = this.getAttribute("data-counter"); // Get associated counter
        const operation = this.getAttribute("data-operation"); // "+" or "-"
        const counterElement = document.getElementById(counterId);

        let currentValue = parseInt(counterElement.textContent);

        if (operation === "plus") {
            counterElement.textContent = currentValue + 1;
        } else if (operation === "minus") {
            counterElement.textContent = Math.max(0, currentValue - 1); // Prevent negative values
        }
    });
});
