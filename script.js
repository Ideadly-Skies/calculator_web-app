const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)

  let result
  if (operator === 'add') result = firstNum + secondNum
  if (operator === 'subtract') result = firstNum - secondNum
  if (operator === 'multiply') result = firstNum * secondNum
  if (operator === 'divide') result = secondNum !== 0 ? firstNum / secondNum : 'Error'

  // fix long floats and truncating trailing zeros
  if (typeof result === 'number') {
    result = parseFloat(result.toFixed(10))
  }

  return result
}

const getKeyType = key => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) return 'operator'
  return action
}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = state

  // Error state guard
  if (displayedNum === 'Error') {
    if (keyType === 'clear') return '0'
    return 'Error'
  }

  if (keyType === 'number') {
    // Reset if user starts new calculation after pressing '='
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum).toString()
      : displayedNum
  }

  if (keyType === 'clear') return '0'

  if (keyType === 'calculate') {
    if (operator && firstValue) {
      return previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue).toString()
        : calculate(firstValue, operator, displayedNum).toString()
    }
    return displayedNum
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset

  calculator.dataset.previousKeyType = keyType

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue =
      previousKeyType === 'calculate'
        ? modValue
        : displayedNum
  }

  if (keyType === 'clear') {
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    }
  }

  if (keyType === 'number' && previousKeyType === 'calculate') {
    calculator.dataset.firstValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.modValue = ''
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')

  const clearButton = calculator.querySelector('[data-action=clear]')
  if (keyType === 'clear' && key.textContent !== 'AC') {
    clearButton.textContent = 'AC'
  } else if (keyType !== 'clear') {
    clearButton.textContent = 'CE'
  }
}

const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return

  const key = e.target
  const displayedNum = display.textContent
  const resultString = createResultString(key, displayedNum, calculator.dataset)

  if (resultString === 'Error') {
    display.textContent = resultString
    calculator.dataset.firstValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.modValue = ''
    calculator.dataset.previousKeyType = ''
    return
  }

  display.textContent = resultString
  updateCalculatorState(key, calculator, resultString, displayedNum)
  updateVisualState(key, calculator)
})
