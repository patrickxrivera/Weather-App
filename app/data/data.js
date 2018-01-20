import * as Helpers from '../helpers/helpers';

const monthlyAllowance = square(5);
export const greeting =  `Your monthly allowance is: $${monthlyAllowance}`;

export function square(num) {
  return num * num;
}

export function subtract(num1, num2) {
  return num1 - num2;
}
