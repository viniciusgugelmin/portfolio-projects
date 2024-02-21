function getLuminance(colorArr) {
    const arr = colorArr.map((color) => {
        color /= 255;

        return color <= 0.03928 ? color / 12.92 : Math.pow(((color + 0.055) / 1.055), 2.4);
    });

    const [red, green, blue] = arr;

    return (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
}

export {getLuminance}