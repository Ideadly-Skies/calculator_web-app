/* prelims - listening to key presses */
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

    const previousKeyType = calculator.dataset.previousKeyType

    if (!action) {
        // replace calculator display with clicked key 
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent
        }
        // append the clicked key to the displayed number
        else {
            display.textContent = displayedNum + keyContent
        }

        calculator.dataset.previousKey = 'number'
    }

    // decimal button
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        } else if (previousKeyType === 'operator') {
            display.textContent = '0.'
        }
        calculator.dataset.previousKey = 'decimal'
    }

    // clear button
    if (action === 'clear'){
        calculator.dataset.previousKeyType = 'clear'
    }

    // to highlight the operator button
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        key.classList.add('is-depressed')

        // add custom attribute
        calculator.dataset.previousKeyType = 'operator'

        // get first number and operator
        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action
    }

    // calculate the result of operation
    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        display.textContent = calculate(firstValue, operator, secondValue)
        calculator.dataset.previousKeyType = 'calculate'
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
  }
})

/**
 * calculate function to calculate result of expression
 * @param {*} n1, first number
 * @param {*} operator, operator applied
 * @param {*} n2, last number
 */
const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}