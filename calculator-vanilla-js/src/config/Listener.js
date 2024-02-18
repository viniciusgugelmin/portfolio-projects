class Listener {
    constructor(element, callback) {
        this.element = element;
        this.callback = callback;
    }

    listen() {
        this.element.addEventListener("click", this.callback);
    }
}

export {Listener}