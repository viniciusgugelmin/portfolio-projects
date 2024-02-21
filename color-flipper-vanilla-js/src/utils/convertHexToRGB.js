function convertHexToRGB(hex) {
    const _hex = hex.replace(/^#/, '');

    console.log({_hex}, _hex.substring(2, 2));
    const red = parseInt(_hex.substring(0, 2), 16);
    const green = parseInt(_hex.substring(2, 4), 16);
    const blue = parseInt(_hex.substring(4, 6), 16);

    return [red, green, blue];
}

export {convertHexToRGB}