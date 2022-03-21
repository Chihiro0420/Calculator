// (1) Listen for all keypress
// (2) Determine the type of key that is pressed 
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
const previousKeyType = calculator.dataset.previousKeyType

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // Action
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent

    console.log('key', key);
    console.log('keyContent', keyContent);

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      // To get '0.xx'
      calculator.dataset.previousKeyType = 'number'
    }
    //
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      // console.log('hey!operator')
      key.classList.add('is-depressed')
      // Add custom attribute
      calculator.dataset.previousKeyType = 'operator'
      // To get the operator
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action

    }
    //
    if (action === 'decimal') {
      if(!displayesNum.include('.')){
        display.textContent = displayedNum + '.'
      }else if(previousKeyType === 'operator'){
        display.textContent ='0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }
    if (action === 'clear') {
      console.log('clear key!')
      calculator.dataset.previousKeyType = 'clear'
    }
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      display.textContent = calculate(firstValue, operator, secondValue)
      calculator.dataset.previousKeyType = 'calculate'
    }
  }
})

const calculate = (n1, operator, n2) => {
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


