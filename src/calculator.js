/**
 * Calculator Module - Practice Mini Project for CI/CD
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function isEven(num) {
  return num % 2 === 0;
}

function percentage(value, total) {
  if (total === 0) {
    throw new Error("Total cannot be zero for percentage calculation");
  }
  return (value / total) * 100;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  isEven,
  percentage,
};
