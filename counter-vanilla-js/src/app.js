import {loadCSS} from "./utils/loadCSS.js";

import {CounterService} from "./services/CounterService.js";

const counters = document.getElementById("counters");

const addCounterBtn = document.getElementById("add-counter");
const seeDbBtn = document.getElementById("see-db");

const baseCounter = document.getElementById("base-counter");

const counterService = new CounterService(counters, baseCounter);

addCounterBtn.addEventListener("click", () => {
    counterService.create();
});

seeDbBtn.addEventListener("click", () => {
    counterService.showDb();
});

loadCSS();
