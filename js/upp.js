document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".pitch-button");
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = null;

    buttons.forEach(button => {
        button.addEventListener("mousedown", () => {
            const note = button.getAttribute("data-note");
            const octave = button.getAttribute("data-octave");
            playTone(note, octave);
        });

        button.addEventListener("touchstart", (event) => {
            event.preventDefault();
            const note = button.getAttribute("data-note");
            const octave = button.getAttribute("data-octave");
            playTone(note, octave);
        });

        const releaseButton = () => {
            stopTone();
        };

        button.addEventListener("mouseup", () => {
            stopTone();
        });

        button.addEventListener("touchend", releaseButton);
        button.addEventListener("touchcancel", releaseButton);
    });

    function playTone(note, octave) {
        stopTone();

        oscillator = audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(getFrequency(note, octave), audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
    }

    function stopTone() {
        if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
        }
    }

    function getFrequency(note, octave) {
        const baseFrequency = {
            C: 261.63,
            D: 293.66,
            E: 329.63,
            F: 349.23,
            G: 392.00,
            A: 440.00,
            B: 493.88
        };

        return baseFrequency[note] * Math.pow(2, octave - 4);
    }
});
