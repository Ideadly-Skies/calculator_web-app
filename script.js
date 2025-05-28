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