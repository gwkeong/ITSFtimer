let countdown;
let isPaused = false;
let remainingTime = 0;
let previousButton = null;

function startTimer(seconds, buttonElement) {
    // If clicking the same button again
    if (buttonElement === previousButton && countdown) {
        if (!isPaused) {
            // Pause timer
            clearInterval(countdown);
            isPaused = true;
        } else {
            // Resume timer
            countdown = setInterval(() => {
                if (remainingTime <= 0) {
                    clearInterval(countdown);
                    document.getElementById("timer").textContent = "0.000s";
                    document.body.classList.add("red");
                } else {
                    document.getElementById("timer").textContent = `${(remainingTime / 1000).toFixed(3)}s`;
                    remainingTime -= 10;
                }
            }, 10);
            isPaused = false;
        }
        return;
    }

    // New timer pressed
    clearInterval(countdown);
    remainingTime = seconds * 1000;
    isPaused = false;
    previousButton = buttonElement;
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdown);
            document.getElementById("timer").textContent = "0.000s";
            document.body.classList.add("red");
        } else {
            document.getElementById("timer").textContent = `${(remainingTime / 1000).toFixed(3)}s`;
            remainingTime -= 10;
        }
    }, 10);
}

document.querySelectorAll(".timer-btn").forEach(button => {
    button.addEventListener("click", () => {
        const seconds = parseInt(button.getAttribute("data-time"));
        startTimer(seconds, button);
    });
});
