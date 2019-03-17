module.exports = function getZerosCount(number, base) {
  let multipliers = isPrime(base);
  if(baseIsSimple(multipliers)) return countSimpleZeros(number, base);
  return countNotSimpleZeros(number, multipliers);
}

function isPrime (n) {
  if (n===2) {
    return {2:1};
  }
  let j = 1;
  let i = 2;
  let a = new Array();
  do {
    if (n % i == 0){
      a[j] = i;
      j++;
      n = n / i;
    } else {
      i++;
    }
  } while (i < n);
  a[j] = i;
  let res = {};
  a.forEach(function(e){
    res[e] = 1 + ~~res[e];
  })
  return res;
}

function baseIsSimple(obj) {
  let keys = Object.keys(obj);
  if(keys.length == 1 && obj[keys[0]] == 1) return true;
  return false;
}

function countSimpleZeros(number, base) {
  let result = 0;
  let y;
  for(let i = base; i <= number; i += base) {
    y = i;
    while(y % base == 0) {
      result++;
      y = y/base;
    }
  }
  return result;
}

function getMaxKey (multipliers) {
  let keys = Object.keys(multipliers);
  if(keys.length == 1) return +keys[0];
  let curMax = 0;
  let mk, curPow, curMul;
  for(let i = 0; i < keys.length - 1; i++) {
    if(multipliers[keys[i]] < keys[i + 1]) {
      mK = keys[i + 1]; continue;
    }
    if(multipliers[keys[i]] == keys[i + 1]) {
      curMul = Math.max(Math.pow(keys[i], multipliers[keys[i]]), Math.pow(keys[i + 1], keys[i]));
    } else {
      curMul = keys[i] * Math.pow(keys[i + 1], multipliers[keys[i + 1]]);
    }
    curPow = Math.pow(keys[i], multipliers[keys[i]]);
    if(curPow < curMul) {
      if(curMax < curMul) {
        curMax = curMul;
        mK = keys[i + 1];
      }
    }
    if(curMax < curPow) {
      curMax = curPow;
      mK = keys[i];
    }
  }
  return +mK;
}

function countNotSimpleZeros(number, base) {
  let count = 0;
  let max = getMaxKey(base);
  let y;
  for(i = max; i <= number; i += max) {
    y = i;
    while(y % max == 0) {
      count++;
      y /= max;
    }
  }
  return count = Math.floor(count / base[max]);
}