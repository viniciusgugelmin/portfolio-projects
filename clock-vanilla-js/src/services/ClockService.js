import {getTimeNow} from "../utils/getTimeNow.js";

class ClockService {
    pointerElements = []
    timer = null

    constructor(pointerSelector, timerSelector) {
        this.pointerElements = document.querySelectorAll(pointerSelector)
        this.timer = document.querySelector(timerSelector)
    }

    start(alreadyRunning = false) {
        const [hourPointer, minutePointer, secondPointer] = this.pointerElements;

        const [hours, minutes, seconds, milliseconds] = getTimeNow();
        const hourDegree = (hours * 30) + (0.5 * minutes);
        const minuteDegree = (minutes * 6) + (0.1 * seconds);
        const secondDegree = (seconds * 6) + (0.006 * milliseconds);

        this.setRotation(hourPointer, hourDegree);
        this.setRotation(minutePointer, minuteDegree);
        this.setRotation(secondPointer, secondDegree);

        this.timer.children[0].textContent = String(hours).padStart(2, "0");
        this.timer.children[1].textContent = String(minutes).padStart(2, "0");
        this.timer.children[2].textContent = String(seconds).padStart(2, "0");

        if (alreadyRunning) return;

        setInterval(() => {
            this.start(true);
        }, 1000);
    }

    setRotation(element, rotationRatio) {
        element.style.setProperty('--rotation', rotationRatio)
    }
}

export {ClockService}