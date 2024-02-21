import {convertHexToRGB} from "../utils/convertHexToRGB.js";
import {getLuminance} from "../utils/getLuminance.js";

class ColorFlipperService {
    app = null;

    colorInput = null;
    colorValue = null;

    constructor(app, colorInput, colorValue) {
        this.app = app;
        this.colorInput = colorInput;
        this.colorValue = colorValue;

        this.colorInput.value = "#ffffff";

        this.execute();
    }

    changeBackgroundColor(isLight) {
        if (isLight) {
            this.app.style.color = "white";
            this.colorInput.labels[0].style.backgroundColor = "black";
            return;
        }

        this.app.style.color = "black";
        this.colorInput.labels[0].style.backgroundColor = "white";
    }

    execute() {
        const color = this.colorInput.value;

        const colorArr = convertHexToRGB(color);
        const luminance = getLuminance(colorArr);

        const isLight = luminance > 0.35;

        this.colorValue.textContent = color;
        this.colorValue.style.color = color;
        this.app.style.backgroundColor = color;

        this.changeBackgroundColor(isLight);
    }
}

export {ColorFlipperService}