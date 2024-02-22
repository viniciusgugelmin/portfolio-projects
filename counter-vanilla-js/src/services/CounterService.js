class CounterService {
    db = {};

    counters = null;
    baseCounter = null;

    constructor(counters, baseCounter) {
        this.counters = counters;
        this.baseCounter = baseCounter;
    }

    decrease(counterEl) {
        const counterValue = counterEl.querySelector(
            "[data-counter-attr='value']"
        );
        counterValue.textContent = String(Number(counterValue.textContent) - 1);
        this.db[counterEl.dataset.counterId].value = Number(
            counterValue.textContent
        );
    }

    increase(counterEl) {
        const counterValue = counterEl.querySelector(
            "[data-counter-attr='value']"
        );
        counterValue.textContent = String(Number(counterValue.textContent) + 1);
        this.db[counterEl.dataset.counterId].value = Number(
            counterValue.textContent
        );
    }

    delete(counterEl) {
        counterEl.remove();
        this.db[counterEl.dataset.counterId].deleted = true;
    }

    create() {
        const lastCounter = this.db[Object.keys(this.db).pop()];
        const newCounterId = lastCounter ? Number(lastCounter.id) + 1 : 1;

        const newCounter = this.baseCounter.cloneNode(true);
        newCounter.id = `counter-${newCounterId}`;
        newCounter.dataset.counterId = String(
            newCounterId
        );
        newCounter.style.display = "";

        this.counters.appendChild(newCounter);

        const newCounterEl = this.counters.lastElementChild;
        newCounterEl.querySelector("[data-counter-attr='title']").dataset.counterId = String(
            newCounterId
        );

        newCounterEl
            .querySelector("[data-counter-attr='decrease']")
            .addEventListener("click", () => {
                this.decrease(newCounterEl);
            });

        newCounterEl
            .querySelector("[data-counter-attr='increase']")
            .addEventListener("click", () => {
                this.increase(newCounterEl);
            });

        newCounterEl
            .querySelector("[data-counter-attr='delete']")
            .addEventListener("click", () => {
                this.delete(newCounterEl);
            });

        this.db[newCounterEl.dataset.counterId] = {
            id: +newCounterEl.dataset.counterId,
            element: newCounterEl,
            value: 0,
            deleted: false,
        };
    }

    showDb() {
        console.log(this.db);
    }
}

export {CounterService}