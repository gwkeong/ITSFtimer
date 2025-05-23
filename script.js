let countdown;
let isPaused = false;
let remainingTime = 0;
let previousButton = null;

function startTimer(seconds, buttonElement) {
    const timerDisplay = document.getElementById("timerDisplay");

    // If same button is clicked again, pause/resume
    if (buttonElement === previousButton && countdown) {
        if (!isPaused) {
            clearInterval(countdown);
            isPaused = true;
        } else {
            countdown = setInterval(() => {
                if (remainingTime <= 0) {
                    clearInterval(countdown);
                    timerDisplay.textContent = "0.000s";
                    document.body.classList.add("red");
                } else {
                    timerDisplay.textContent = `${(remainingTime / 1000).toFixed(3)}s`;
                    remainingTime -= 10;
                }
            }, 10);
            isPaused = false;
        }
        return;
    }

    // New button clicked
    clearInterval(countdown);
    remainingTime = seconds * 1000;
    isPaused = false;
    previousButton = buttonElement;
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "0.000s";
            document.body.classList.add("red");
        } else {
            timerDisplay.textContent = `${(remainingTime / 1000).toFixed(3)}s`;
            remainingTime -= 10;
        }
    }, 10);
}

// Hook up the buttons AFTER DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".timer-btn").forEach(button => {
        button.addEventListener("click", () => {
            const seconds = parseInt(button.getAttribute("data-time"));
            startTimer(seconds, button);
        });
    });

    // Jar counter buttons
    document.querySelectorAll(".counter-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const counterId = this.getAttribute("data-counter");
            const operation = this.getAttribute("data-operation");
            const counterElement = document.getElementById(counterId);
            let currentValue = parseInt(counterElement.textContent);

            if (operation === "plus") {
                counterElement.textContent = currentValue + 1;
            } else if (operation === "minus") {
                counterElement.textContent = Math.max(0, currentValue - 1);
            }
        });
    });
});
