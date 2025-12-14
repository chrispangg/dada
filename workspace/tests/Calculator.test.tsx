import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../src/Calculator';

const getDisplay = (container: HTMLElement) => {
  return container.querySelector('.display') as HTMLElement;
};

describe('Calculator Component', () => {
  it('should render calculator with display showing 0', () => {
    const { container } = render(<Calculator />);
    const display = getDisplay(container);
    expect(display).toHaveTextContent('0');
  });

  it('should display number when number button is clicked', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    fireEvent.click(button5);
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5');
  });

  it('should display multiple numbers when buttons are clicked in sequence', () => {
    const { container } = render(<Calculator />);
    const button1 = screen.getByRole('button', { name: '1' });
    const button2 = screen.getByRole('button', { name: '2' });
    const button3 = screen.getByRole('button', { name: '3' });
    
    fireEvent.click(button1);
    fireEvent.click(button2);
    fireEvent.click(button3);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('123');
  });

  it('should handle addition correctly', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonAdd = screen.getByRole('button', { name: '+' });
    const button3 = screen.getByRole('button', { name: '3' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonAdd);
    fireEvent.click(button3);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('8');
  });

  it('should handle subtraction correctly', () => {
    const { container } = render(<Calculator />);
    const button9 = screen.getByRole('button', { name: '9' });
    const buttonSubtract = screen.getByRole('button', { name: '−' });
    const button4 = screen.getByRole('button', { name: '4' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button9);
    fireEvent.click(buttonSubtract);
    fireEvent.click(button4);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5');
  });

  it('should handle multiplication correctly', () => {
    const { container } = render(<Calculator />);
    const button6 = screen.getByRole('button', { name: '6' });
    const buttonMultiply = screen.getByRole('button', { name: '×' });
    const button7 = screen.getByRole('button', { name: '7' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button6);
    fireEvent.click(buttonMultiply);
    fireEvent.click(button7);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('42');
  });

  it('should handle division correctly', () => {
    const { container } = render(<Calculator />);
    const button8 = screen.getByRole('button', { name: '8' });
    const buttonDivide = screen.getByRole('button', { name: '÷' });
    const button2 = screen.getByRole('button', { name: '2' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button8);
    fireEvent.click(buttonDivide);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('4');
  });

  it('should clear display when C button is clicked', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonClear = screen.getByRole('button', { name: 'C' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonClear);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('0');
  });

  it('should handle decimal numbers', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonDecimal = screen.getByRole('button', { name: '.' });
    const button2 = screen.getByRole('button', { name: '2' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonDecimal);
    fireEvent.click(button2);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5.2');
  });

  it('should handle decimal operations', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonDecimal = screen.getByRole('button', { name: '.' });
    const button5Buttons = screen.getAllByRole('button', { name: '5' });
    const button5Second = button5Buttons[button5Buttons.length - 1] as HTMLElement;
    const buttonAdd = screen.getByRole('button', { name: '+' });
    const button2 = screen.getByRole('button', { name: '2' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonDecimal);
    fireEvent.click(button5Second);
    fireEvent.click(buttonAdd);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('7.5');
  });

  it('should handle chained operations', () => {
    const { container } = render(<Calculator />);
    const button2 = screen.getByRole('button', { name: '2' });
    const buttonAdd = screen.getByRole('button', { name: '+' });
    const button3 = screen.getByRole('button', { name: '3' });
    const buttonMultiply = screen.getByRole('button', { name: '×' });
    const button4 = screen.getByRole('button', { name: '4' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button2);
    fireEvent.click(buttonAdd);
    fireEvent.click(button3);
    fireEvent.click(buttonMultiply);
    fireEvent.click(button4);
    fireEvent.click(buttonEquals);
    
    // 2 + 3 = 5, then 5 * 4 = 20
    const display = getDisplay(container);
    expect(display).toHaveTextContent('20');
  });

  it('should not add multiple decimals', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonDecimal = screen.getByRole('button', { name: '.' });
    const button2 = screen.getByRole('button', { name: '2' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonDecimal);
    fireEvent.click(button2);
    fireEvent.click(buttonDecimal);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5.2');
  });

  it('should handle zero button', () => {
    const { container } = render(<Calculator />);
    const buttonZero = screen.getByRole('button', { name: '0' });
    const button5 = screen.getByRole('button', { name: '5' });
    
    fireEvent.click(buttonZero);
    fireEvent.click(button5);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5');
  });

  it('should handle leading zero correctly', () => {
    const { container } = render(<Calculator />);
    const buttonZero = screen.getByRole('button', { name: '0' });
    const button5 = screen.getByRole('button', { name: '5' });
    
    fireEvent.click(buttonZero);
    fireEvent.click(button5);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('5');
  });

  it('should handle division by zero gracefully', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonDivide = screen.getByRole('button', { name: '÷' });
    const buttonZero = screen.getByRole('button', { name: '0' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonDivide);
    fireEvent.click(buttonZero);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('Error');
  });

  it('should handle division by zero in chained operations', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonAdd = screen.getByRole('button', { name: '+' });
    const button3 = screen.getByRole('button', { name: '3' });
    const buttonDivide = screen.getByRole('button', { name: '÷' });
    const buttonZero = screen.getByRole('button', { name: '0' });
    const buttonEquals = screen.getByRole('button', { name: '=' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonAdd);
    fireEvent.click(button3);
    fireEvent.click(buttonDivide);
    fireEvent.click(buttonZero);
    fireEvent.click(buttonEquals);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('Error');
  });

  it('should handle decimal point after operator', () => {
    const { container } = render(<Calculator />);
    const button5 = screen.getByRole('button', { name: '5' });
    const buttonAdd = screen.getByRole('button', { name: '+' });
    const buttonDecimal = screen.getByRole('button', { name: '.' });
    
    fireEvent.click(button5);
    fireEvent.click(buttonAdd);
    fireEvent.click(buttonDecimal);
    
    const display = getDisplay(container);
    expect(display).toHaveTextContent('0.');
  });
});
