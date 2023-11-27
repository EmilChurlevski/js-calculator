import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');

  const handleNumberClick = (number) => {
    setInput((prevInput) => (prevInput === '0' ? String(number) : prevInput + String(number)));
  };

  const handleOperatorClick = (operator) => {
    setInput((prevInput) => {
      let updatedInput = prevInput;

      // Find the last selected operator
      const operators = /[+\-*/]/;
      const matches = updatedInput.match(new RegExp(`${operators.source}+$`));

      if (matches) {
        const lastOperator = matches[0][matches[0].length - 1];

        // Replace the last selected operator with the new operator
        const lastOperatorIndex = updatedInput.lastIndexOf(lastOperator);
        updatedInput =
          updatedInput.slice(0, lastOperatorIndex) + operator + updatedInput.slice(lastOperatorIndex + 1);
      } else {
        // If no operator found, simply append the new operator
        updatedInput += operator;
      }

      return updatedInput;
    });
  };


  const handleDecimalClick = () => {
    setInput((prevInput) => {
      // Check if the current number already contains a decimal point
      const lastNum = prevInput.split(/[-+*/]/).pop();
      if (!lastNum.includes('.')) {
        return prevInput + '.';
      }
      return prevInput;
    });
  };

  const handleClearClick = () => {
    setInput('');
    setOutput('0');
  };

  const handleEqualsClick = () => {
    try {
      // Use a regular expression to filter and clean the input
      const filtered = input.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');

      // Evaluate the filtered input using eval
      const result = eval(filtered);

      setOutput((prevOutput) => result.toFixed(4).replace(/\.?0+$/, ''));
      setInput((prevInput) => result.toString());
    } catch (error) {
      setOutput('Error');
    }
  };


  return (
    <div className="calculator">
      <div id="display">{input || output}</div>
      <button id="zero" onClick={() => handleNumberClick(0)}>0</button>
      <button id="one" onClick={() => handleNumberClick(1)}>1</button>
      <button id="two" onClick={() => handleNumberClick(2)}>2</button>
      <button id="three" onClick={() => handleNumberClick(3)}>3</button>
      <button id="four" onClick={() => handleNumberClick(4)}>4</button>
      <button id="five" onClick={() => handleNumberClick(5)}>5</button>
      <button id="six" onClick={() => handleNumberClick(6)}>6</button>
      <button id="seven" onClick={() => handleNumberClick(7)}>7</button>
      <button id="eight" onClick={() => handleNumberClick(8)}>8</button>
      <button id="nine" onClick={() => handleNumberClick(9)}>9</button>
      <button id="add" onClick={() => handleOperatorClick('+')}>+</button>
      <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>
      <button id="multiply" onClick={() => handleOperatorClick('*')}>*</button>
      <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>
      <button id="decimal" onClick={handleDecimalClick}>.</button>
      <button id="equals" onClick={handleEqualsClick}>=</button>
      <button id="clear" onClick={handleClearClick}>C</button>
    </div>
  );
};

export default Calculator;
