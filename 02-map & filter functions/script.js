/*
 * https://frontendeval.com/questions/array-prototype-map
 *
 * Implement a barebones Array.prototype.map function
 */
const map = (arr, cb) => {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(cb(arr[i], i));
  }
  return newArr;
};

const double = x => x * 2;
const doubleWithLogging = (x, i) => {
  console.log(`Element ${x} is at index ${i}`);
  return double(x);
};

const myArray = [1, 2, 3, 4, 5];
const myArray2 = [10, 20, 30, 40, 50];

const mappedArray = map(myArray, double);
const mappedArray2 = map(myArray2, doubleWithLogging);

console.log(mappedArray);
console.log(mappedArray2);