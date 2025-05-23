let countdown;
let timeLeft = 0;
let isPaused = false;
let currentTimer = null;

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function startTimer(seconds, button) {
    // If tapping the same timer button, toggle pause/resume
    if (currentTimer === button && countdown) {
        isPaused = !isPaused;
        return;
    }

    clearInterval(countdown); // Stop any existing timer
    currentTimer = button;
    isPaused = false;

    timeLeft = seconds * 1000;
    const timerDisplay = document.getElementById("timer");
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (isPaused) return;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "0.000s";
            document.body.classList.add("red");

            // Vibration when done
            if ("vibrate" in navigator) {
                navigator.vibrate(500);
            }

        } else {
            let secondsLeft = (timeLeft / 1000).toFixed(3);
            timerDisplay.textContent = `${secondsLeft}s`;

            // Speak countdown if between 10s and 1s and only for 30s or 90s timers
            const isSpeechTimer = seconds === 30 || seconds === 90;
            const intSec = Math.floor(timeLeft / 1000);
            if (isSpeechTimer && intSec <= 10 && timeLeft % 1000 === 0) {
                speak(intSec.toString());
            }

            timeLeft -= 10;
        }
    }, 10);
}

// BUTTON HANDLERS
document.querySelectorAll(".timer-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const seconds = parseInt(this.getAttribute("data-seconds"));
        startTimer(seconds, this);
    });
});

// COUNTER BUTTONS
document.querySelectorAll(".counter-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const counterId = this.getAttribute("data-counter");
        const operation = this.getAttribute("data-operation");
        const counterElement = document.getElementById(counterId);

        let value = parseInt(counterElement.textContent);
        if (operation === "plus") {
            value++;
        } else if (operation === "minus") {
            value = Math.max(0, value - 1);
        }

        counterElement.textContent = value;
    });
});
