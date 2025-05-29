const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
const clearButton = keys.querySelector('[data-action="clear"]')

// Initialize calculator state
calculator.dataset.previousKeyType = ''
calculator.dataset.firstValue = ''
calculator.dataset.operator = ''
calculator.dataset.modValue = ''

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'

      // Change clear button text to 'CE'
      clearButton.textContent = 'CE'      
    }

    if (action === 'decimal') {
      if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.'
      } else if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      }
      calculator.dataset.previousKeyType = 'decimal'

      // Change clear button text to 'CE'
      clearButton.textContent = 'CE'
    }

    if (action === 'clear') {
      display.textContent = '0'
      calculator.dataset.previousKeyType = 'clear'
      calculator.dataset.firstValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.modValue = ''

      // Reset clear button text to 'AC'
      clearButton.textContent = 'AC'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      // Note: It's important to check if previousKeyType is not operator to avoid calculations on repeated operator clicks
      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue
        calculator.dataset.firstValue = calcValue
      } else {
        calculator.dataset.firstValue = displayedNum
      }

      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action

      // Change clear button text to 'CE'
      clearButton.textContent = 'CE'
    }

    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        let secondValue = displayedNum
        const operator = calculator.dataset.operator

        // Repeat the last operation if equal is pressed again
        if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
        }

        if (firstValue && operator) {
            const result = calculate(firstValue, operator, secondValue)
            display.textContent = result

            // Store the result for chaining further equals
            calculator.dataset.firstValue = result
            calculator.dataset.modValue = secondValue
        }

        calculator.dataset.previousKeyType = 'calculate'
    }
  }
})

const calculate = (n1, operator, n2) => {
  let result = ''
  
  n1 = parseFloat(n1)
  n2 = parseFloat(n2)

  if (operator === 'add') {
    result = n1 + n2
  } else if (operator === 'subtract') {
    result = n1 - n2
  } else if (operator === 'multiply') {
    result = n1 * n2
  } else if (operator === 'divide') {
    result = n1 / n2
  }

  return result.toString()
}