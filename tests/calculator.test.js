const {
  add,
  subtract,
  multiply,
  divide,
  power,
  isEven,
  percentage,
} = require("../src/calculator");

describe("Calculator Automated Unit Tests", () => {
  describe("Addition", () => {
    test("should correctly add two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("should correctly add negative and positive numbers", () => {
      expect(add(-5, 10)).toBe(5);
    });

    test("should handle floating point numbers", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe("Subtraction", () => {
    test("should correctly subtract two numbers", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test("should result in a negative number when subtracting a larger number", () => {
      expect(subtract(5, 12)).toBe(-7);
    });
  });

  describe("Multiplication", () => {
    test("should correctly multiply two positive numbers", () => {
      expect(multiply(3, 7)).toBe(21);
    });

    test("should return 0 when multiplying by zero", () => {
      expect(multiply(100, 0)).toBe(0);
    });

    test("should handle multiplication of negative numbers", () => {
      expect(multiply(-4, -5)).toBe(20);
      expect(multiply(-4, 5)).toBe(-20);
    });
  });

  describe("Division", () => {
    test("should divide two numbers correctly", () => {
      expect(divide(20, 4)).toBe(5);
    });

    test("should handle decimal results", () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    test("should throw an error when dividing by zero", () => {
      expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
    });
  });

  describe("Power", () => {
    test("should calculate exponentiation correctly", () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 0)).toBe(1);
    });
  });

  describe("isEven", () => {
    test("should identify even numbers", () => {
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-2)).toBe(true);
    });

    test("should identify odd numbers", () => {
      expect(isEven(5)).toBe(false);
      expect(isEven(-7)).toBe(false);
    });
  });

  describe("Percentage", () => {
    test("should calculate percentage correctly", () => {
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(1, 4)).toBe(25);
    });

    test("should throw error if total is zero", () => {
      expect(() => percentage(50, 0)).toThrow(
        "Total cannot be zero for percentage calculation"
      );
    });
  });
});
