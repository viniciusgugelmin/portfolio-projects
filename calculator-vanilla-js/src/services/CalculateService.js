class CalculateService {
    element = null;
    action = null;
    value = null;
    operator = null;

    historyEl = null;
    displayEl = null;

    constructor(element, historyEl, displayEl) {
        this.element = element;
        this.historyEl = historyEl;
        this.displayEl = displayEl;

        this.getAction();
    }

    getAction() {
        if (!this.element) {
            throw new Error("Element is not defined");
        }

        if (!this.historyEl || !this.displayEl) {
            throw new Error("History or Display element is not defined");
        }

        const transformActionToCamelCase = (action) => {
            return action.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        }

        const isNumberOrDot = this.element.dataset.value && this.element.dataset.value.match(/[\d.]/);
        if (isNumberOrDot) {
            this.action = "insertValue";
            this.value = this.element.dataset.value;
            return;
        }

        const isOperator = this.element.dataset.action && this.element.dataset.action === "operator";
        if (isOperator) {
            this.action = "calculateOperator";
            this.operator = this.element.dataset.value;
            return;
        }

        const isEqual = this.element.dataset.action && this.element.dataset.action === "calculate";
        if (isEqual) {
            this.action = transformActionToCamelCase(this.element.dataset.action);
            return;
        }

        if (this.element.dataset.action) {
            this.action = transformActionToCamelCase(this.element.dataset.action);
            return;
        }

        throw new Error(`Action is not defined: ${this.element.dataset.action}`);
    }

    insertValue(history) {
        if (!this.value) {
            throw new Error(`Value is not defined: ${this.value}`);
        }

        const lastValue = history[history.length - 1];
        const isLastValueNumberOrDot = lastValue && lastValue.match(/[\d.]/);

        const isDotAndAlreadyExists = this.value === "." && lastValue && lastValue.includes(".");
        if (isDotAndAlreadyExists) {
            return;
        }

        if (isLastValueNumberOrDot) {
            history[history.length - 1] += this.value;
        } else {
            const isDot = this.value === ".";

            history.push(isDot ? "0." : this.value);
        }

        this.historyEl.textContent = history.join(" ");

        if (history.length > 2) {
            this.calculate(history, {previous: true});
        }
    }

    calculateOperator(history) {
        if (!this.operator) {
            throw new Error(`Operator is not defined: ${this.operator}`);
        }

        let lastValue = history[history.length - 1];

        if (!lastValue) {
            const displayValue = this.displayEl.textContent;

            if (displayValue) {
                history.push(displayValue);
                lastValue = history[history.length - 1];
            }
        }

        const isLastValueNumberOrDot = lastValue && lastValue.match(/[\d.]/);

        if (isLastValueNumberOrDot) {
            const lastValueEndsWithDot = lastValue.endsWith(".");
            if (lastValueEndsWithDot) {
                history[history.length - 1] = lastValue.slice(0, -1);
            }

            history.push(this.operator);
            this.historyEl.textContent = history.join(" ");
        }

        if (history.length > 2) {
            this.calculate(history, {previous: true});
        }
    }

    changeSignal(history) {
        const lastValue = history[history.length - 1];
        const isLastValueNumberOrDot = lastValue && lastValue.match(/[\d.]/);

        if (isLastValueNumberOrDot) {
            const withParentheses = (number) => {
                const isNumberAlreadyNegative = number.startsWith("(");

                const calc = (n) => parseFloat(n) * -1;
                const result = isNumberAlreadyNegative ? calc(number.slice(1, -1)) : calc(number);

                return result < 0 ? `(${result})` : result;
            }

            history[history.length - 1] = String(withParentheses(lastValue));
            this.historyEl.textContent = history.join(" ");
        }

        if (history.length > 2) {
            this.calculate(history, {previous: true});
        }
    }

    clear(history) {
        history.length = 0;
        this.historyEl.textContent = "";
        this.displayEl.textContent = "";
    }

    calculate(history, opt = {previous: false}) {
        const lastValue = history[history.length - 1];
        const isLastValueNumberOrDot = lastValue && lastValue.match(/[\d.]/);

        if (!isLastValueNumberOrDot) {
            return;
        }

        let result = 0;

        history.forEach((value, index) => {
            if (index === 0) {
                result = parseFloat(value);
                return;
            }

            const treatFloat = (number) => parseFloat((number).toPrecision(12));
            const removeParentheses = (number) => {
                if (!number) {
                    return number;
                }

                return number.replace(/[\(\)]/g, "")
            };

            const isOperator = value.match(/[\+\-\*\/\%]/);
            if (isOperator) {
                const nextValue = parseFloat(removeParentheses(history[index + 1]));

                switch (value) {
                    case "+":
                        result = treatFloat(result + nextValue);
                        break;
                    case "-":
                        result = treatFloat(result - nextValue);
                        break;
                    case "*":
                        result = treatFloat(result * nextValue);
                        break;
                    case "/":
                        result = treatFloat(result / nextValue);
                        break;
                    case "%":
                        result = treatFloat((result / 100) * nextValue);
                        break;
                }
            }
        });

        if (!opt.previous) {
            history.length = 0;
        }

        this.historyEl.textContent = history.join(" ");
        this.displayEl.textContent = result;
    }


    callAction(history) {
        if (!this.action) {
            throw new Error(`Action is not defined: ${this.action}`);
        }

        this[this.action](history);
    }
}

export {CalculateService}