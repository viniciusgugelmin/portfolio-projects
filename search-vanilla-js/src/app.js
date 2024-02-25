import {loadCSS} from "./utils/loadCSS.js";
import {items} from "./config/data.js";

const searchInput = document.getElementById('search');
const results = document.getElementById('results');

console.log(items);

let isTyping = null;

searchInput.addEventListener('input', (e) => {
    if (isTyping) {
        clearTimeout(isTyping);
    }

    isTyping = setTimeout(() => {
        const value = e.target.value;
        const filteredItems = items.filter((item) => item.includes(value));
        results.innerHTML = filteredItems.map((item) => `<li>${item}</li>`).join('');
    }, 300);
});

loadCSS();
