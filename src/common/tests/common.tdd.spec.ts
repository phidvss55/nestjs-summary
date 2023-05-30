import { Calculator } from '../validations/calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add two numbers correctly', () => {
    const result = calculator.add(2, 3);
    expect(result).toEqual(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = calculator.subtract(5, 3);
    expect(result).toEqual(2);
  });

  it('should multiply two numbers correctly', () => {
    const result = calculator.multiply(4, 2);
    expect(result).toEqual(8);
  });

  it('should handle division by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrowError('Division by zero');
  });
});
