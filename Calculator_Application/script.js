//    Author:           Maurice Gonzalez    //
//    Creation Date:    March 18, 2026      //

/** ─────────────── Core Logic ** No DOM ** ───────────────
 *  
 *  calcCore is an Immediately Invoked Function Expression (IIFE)
 *  that encapsulates all calculator state and logic.
 */

const calcCore = (() => {
    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let resetNext = false;
    let expression = '';

    function getDisplay() {
        return expression || '0';
    }

    function input(value) {
        if (value === 'AC') return clear();
        if (value === 'DEL') return del();
        if (value === '=') return equals();

        if (['÷', '×', '−', '+'].includes(value)) {
            return applyOperator(value);
        }

        if (resetNext) {
            currentInput = '';
            expression = '';
            resetNext = false;
        }

        if (value === '.' && currentInput.includes('.')) return getDisplay();
        if (value === '.' && currentInput === '') {
            currentInput = '0';
            expression += '0';
        }

        currentInput += value;
        expression += value;
        return getDisplay();
    }

    function applyOperator(value) {
        if (currentInput === '' && previousInput === '') return getDisplay();

        if (currentInput === '' && operator !== null) {
            expression = expression.slice(0, -3) + ' ' + value + ' ';
            operator = value;
            return getDisplay();
        }

        if (currentInput !== '' && previousInput !== '') {
            equals(true);
        }

        operator = value;
        previousInput = currentInput || previousInput;
        currentInput = '';
        expression += ' ' + value + ' ';
        return getDisplay();
    }

    function equals(silent = false) {
        if (currentInput === '' || previousInput === '' || operator === null) {
            return getDisplay();
        }

        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+': result = a + b; break;
            case '−': result = a - b; break;
            case '×': result = a * b; break;
            case '÷':
                if (b === 0) {
                    currentInput = '';
                    previousInput = '';
                    operator = null;
                    expression = '';
                    return 'Error';
                }
                result = a / b;
                break;
        }

        result = parseFloat(result.toPrecision(10));

        if (silent) {
            previousInput = String(result);
            currentInput = '';
            operator = null;
        } else {
            currentInput = String(result);
            previousInput = '';
            operator = null;
            expression = String(result);
            resetNext = true;
        }

        return getDisplay();
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = null;
        resetNext = false;
        expression = '';
        return '0';
    }

    function del() {
        if (resetNext) return clear();

        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            expression = expression.slice(0, -1);
        } else if (operator !== null) {
            expression = expression.trimEnd().slice(0, -1).trimEnd();
            currentInput = previousInput;
            previousInput = '';
            operator = null;
        }

        return getDisplay();
    }

    function seq(...values) {
        let result;
        for (const v of values) result = input(v);
        return result;
    }

    return { input, clear, seq, getDisplay };
})();

/** ──────────── DOM Wiring ** Browser Only ** ────────────
 *
 *  Connects calcCore to the real buttons and display. Skipped when
 *  running in a test environment where document is not defined.
 */

if (typeof document !== 'undefined') {
    const display = document.querySelector('.calc-display');
    const buttons = document.querySelectorAll('button');

    function updateDisplay() {
        if (display) display.textContent = calcCore.getDisplay();
    }

    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                calcCore.input(button.textContent.trim());
                updateDisplay();
            });
        });
    }
}