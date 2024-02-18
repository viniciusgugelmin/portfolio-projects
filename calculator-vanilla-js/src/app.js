import {Listener} from "./config/Listener.js";
import {history} from "./config/data.js";

import {CalculateService} from "./services/CalculateService.js";

import {loadCSS} from "./utils/loadCSS.js";

const calculatorKeys = document.querySelectorAll("button[data-key]");
const calculatorHistory = document.querySelector("[data-history]");
const calculatorDisplay = document.querySelector("[data-display]");

calculatorKeys.forEach(el => {
    const calculateService = new CalculateService(el, calculatorHistory, calculatorDisplay);

    const listener = new Listener(el, () => calculateService.callAction(history));
    listener.listen();
});

loadCSS();