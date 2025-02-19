let countdown;
let isRunning = false;

function startTimer(seconds) {
    if (isRunning) return;

    let timeLeft = seconds;
    const timerDisplay = document.getElementById("timer");
    document.body.classList.remove("red");

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            document.body.classList.add("red"); // Turn background red
            isRunning = false;
        } else {
            timerDisplay.textContent = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;
            timeLeft--;
        }
    }, 1000);

    isRunning = true;
}

// Counter logic
let jar1Count = 0;
let jar2Count = 0;

function increaseCounter(jar) {
    if (jar === "jar1") {
        jar1Count++;
        document.getElementById("jar1-count").textContent = jar1Count;
    } else {
        jar2Count++;
        document.getElementById("jar2-count").textContent = jar2Count;
    }
}

function decreaseCounter(jar) {
    if (jar === "jar1" && jar1Count > 0) {
        jar1Count--;
        document.getElementById("jar1-count").textContent = jar1Count;
    } else if (jar === "jar2" && jar2Count > 0) {
        jar2Count--;
        document.getElementById("jar2-count").textContent = jar2Count;
    }
}
