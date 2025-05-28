let countdown;
let isPaused = false;
let remainingTime = 0;
let previousButton = null;

// Vibration function (mobile-friendly)
function vibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]); // Vibrate pattern: 200ms on, 100ms off, 200ms on
    }
}

// Voice announcement function
function speak(message) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        window.speechSynthesis.cancel(); // Clear any previous speech
        window.speechSynthesis.speak(utterance);
    }
}

function startTimer(seconds, buttonElement) {
    const timerDisplay = document.getElementById("timerDisplay");

    // Pause/resume logic
    if (buttonElement === previousButton && countdown) {
        if (!isPaused) {
            clearInterval(countdown);
            isPaused = true;
            speak("Timer paused"); // Voice feedback
        } else {
            countdown = setInterval(updateTimer, 10);
            isPaused = false;
            speak("Resuming");
        }
        return;
    }

    // New timer
    clearInterval(countdown);
    remainingTime = seconds * 1000;
    isPaused = false;
    previousButton = buttonElement;
    document.body.classList.remove("red-bg"); // Fixed class name
    
    // Initial voice feedback
    speak(`${seconds} seconds started`);
    
    countdown = setInterval(updateTimer, 10);
}

// Extracted timer update logic
function updateTimer() {
    const timerDisplay = document.getElementById("timerDisplay");
    
    if (remainingTime <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "00.00";
        document.body.classList.add("red-bg");
        vibrate();
        speak("Time's up!"); // Final announcement
    } else {
        const displaySeconds = (remainingTime / 1000).toFixed(2);
        timerDisplay.textContent = displaySeconds.padStart(5, '0'); // Always shows 2 decimals
        
        // Optional: Announce last 5 seconds
        if (remainingTime <= 5000 && remainingTime % 1000 === 0) {
            speak(Math.floor(remainingTime / 1000));
        }
        
        remainingTime -= 10;
    }
}

// Initialize after DOM loads
window.addEventListener("DOMContentLoaded", () => {
    // Timer buttons
    document.querySelectorAll(".timer-btn").forEach(button => {
        button.addEventListener("click", () => {
            const seconds = parseInt(button.dataset.time);
            startTimer(seconds, button);
        });
    });

    // Jar counters
    document.querySelectorAll(".counter-btn").forEach(button => {
        button.addEventListener("click", function() {
            const counterId = this.dataset.counter;
            const operation = this.dataset.operation;
            const counterElement = document.getElementById(counterId);
            let value = parseInt(counterElement.textContent);

            if (operation === "plus") {
                value += 1;
            } else if (operation === "minus") {
                value = Math.max(0, value - 1);
            }

            counterElement.textContent = value;
            
            // Optional click feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    });
});
