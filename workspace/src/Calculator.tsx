import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      try {
        const result = performCalculation(previousValue, currentValue, operation);
        setDisplay(String(result));
        setPreviousValue(result);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
        return;
      }
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        if (current === 0) {
          throw new Error('Division by zero');
        }
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      try {
        const currentValue = parseFloat(display);
        const result = performCalculation(previousValue, currentValue, operation);
        setDisplay(String(result));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={handleClear} className="button clear">
          C
        </button>
        <button onClick={() => handleOperation('/')} className="button operator">
          ÷
        </button>
        <button onClick={() => handleOperation('*')} className="button operator">
          ×
        </button>
        <button onClick={() => handleNumberClick('7')} className="button">
          7
        </button>
        <button onClick={() => handleNumberClick('8')} className="button">
          8
        </button>
        <button onClick={() => handleNumberClick('9')} className="button">
          9
        </button>
        <button onClick={() => handleOperation('-')} className="button operator">
          −
        </button>
        <button onClick={() => handleNumberClick('4')} className="button">
          4
        </button>
        <button onClick={() => handleNumberClick('5')} className="button">
          5
        </button>
        <button onClick={() => handleNumberClick('6')} className="button">
          6
        </button>
        <button onClick={() => handleOperation('+')} className="button operator">
          +
        </button>
        <button onClick={() => handleNumberClick('1')} className="button">
          1
        </button>
        <button onClick={() => handleNumberClick('2')} className="button">
          2
        </button>
        <button onClick={() => handleNumberClick('3')} className="button">
          3
        </button>
        <button onClick={handleEquals} className="button equals">
          =
        </button>
        <button
          onClick={() => handleNumberClick('0')}
          className="button zero"
        >
          0
        </button>
        <button onClick={handleDecimal} className="button">
          .
        </button>
      </div>
    </div>
  );
};
