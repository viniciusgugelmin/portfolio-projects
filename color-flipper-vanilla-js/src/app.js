import {loadCSS} from "./utils/loadCSS.js";
import {ColorFlipperService} from "./services/ColorFlipperService.js";

const app = document.querySelector("#app");

const colorInput = document.querySelector("input[type='color']");
const colorValue = document.querySelector("#value");

const colorFlipperService = new ColorFlipperService(app, colorInput, colorValue);

colorInput.addEventListener("input", () => {
    colorFlipperService.execute();
});

loadCSS();
