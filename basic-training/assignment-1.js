// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
  let largest = arr[0];
  let second = -Infinity;
  for(let i=0; i<arr.length; i++){
    if (arr[i] > largest ){
      second = largest;
      largest = arr[i];
    }
    else if(arr[i] < largest && arr[i] > second)
      second = arr[i];
  }
  return second;
}

// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
  let frequency = new Array(26).fill(0);

  for (let i = 0; i < string.length; i++) {           
    let index = string.charCodeAt(i) - 97; 
    frequency[index]++;
  }

  return frequency;
}

// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(unflatObject) {
  let result = {};

  function helper(object, prefix = "") {
    for (let key in object) {
      let newKey = prefix ? prefix + "." + key : key;

      if (typeof object[key] === "object" && object[key] !== null) {
        helper(object[key], newKey);
      } else {
        result[newKey] = object[key];
      }
    }
  }

  helper(unflatObject);

  return result;
}

// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(flatObject) {
  let result = {};

  for (let key in flatObject) {
    let keys = key.split(".");
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      let part = keys[i];

      if (!current[part]) {
        current[part] = {};
      }

      current = current[part];
    }

    current[keys[keys.length - 1]] = flatObject[key];
  }

  return result;
}
