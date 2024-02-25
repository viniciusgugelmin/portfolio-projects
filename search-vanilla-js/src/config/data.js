const alphabet = "abcdefghijklmnopqrstuvwxyz";
const randomNames = Array.from({ length: 10000 }, () => {
    return Array.from({ length: 4 }, () => alphabet.charAt(Math.floor(Math.random() * alphabet.length))).join('');
});
const sortedNames = randomNames.sort();

const items = sortedNames;

export {items}