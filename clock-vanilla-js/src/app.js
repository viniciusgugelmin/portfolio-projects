import {loadCSS} from "./utils/loadCSS.js";

import {ClockService} from "./services/ClockService.js";

new ClockService(".vkg-clock__pointer", ".vkg-clock__timer").start();

loadCSS();