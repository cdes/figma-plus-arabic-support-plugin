import Reshaper from './arabic-reshaper';
import direction from 'direction';
import reverse from "./reverse-string";

const options = {
  ligatures: false,
}

const isLTR = (str) => direction(str) === 'ltr';
const isRTL = (str) => direction(str) === 'rtl';
const isNeutral = (str) => direction(str) === 'neutral';

const split = (str, tokens) => {
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++){
      str = str.split(tokens[i]).join(tempChar);
  }
  str = str.split(tempChar);
  return str;
}

export default (str) => {

  const finalString = Reshaper.reshape(str, options);
  const neutral = finalString.split('').filter(char => isNeutral(char));
  
  let reversed;
  let merged;

  // A single word, no need to split
  if (neutral.length === 0) {
    reversed = isLTR(finalString) ? finalString : reverse(finalString);
  }
  else {
    reversed = split(finalString, neutral).map(word => {
      return isLTR(word) ? word : reverse(word);
    });
  }

  if (Array.isArray(reversed)) {
    const merged = reversed.map((v,i) => [v, neutral[i]]).reduce((a,b) => a.concat(b));
    return merged.reverse().join('');
  }
  else {
    return reversed;
  }
}