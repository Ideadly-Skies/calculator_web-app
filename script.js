const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // determine key clicked 
        const key = e.target
        const action = key.dataset.action

        // number
        if (!action) {
            console.log('number key!')
        }
        
        // operator
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!')
        }

        // decimal
        if (action === 'decimal') {
            console.log('decimal key!')
        }

        // clear
        if (action === 'clear') {
            console.log('clear key!')
        }

        // calculate
        if (action === 'calculate') {
            console.log('equal key!')
        }
    
    }
})

const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        
        if (!action) {
            if (displayedNum === '0') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            let operatorSymbol = '';
            if (action === 'add') operatorSymbol = '+';
            if (action === 'subtract') operatorSymbol = '-';
            if (action === 'multiply') operatorSymbol = '×';
            if (action === 'divide') operatorSymbol = '÷';

            display.textContent = displayedNum + operatorSymbol;

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator'
        }

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    }
})