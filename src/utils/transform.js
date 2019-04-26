import { reshape } from './js-arabic-reshaper';
import direction from 'direction';
import reverse from "./reverse-string";

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

const transform = (str, {spaceHack = false, ligatures = false, ignoreIsolates = true} = {}) => {

  const neutral = str.split('').filter(char => isNeutral(char));
  
  let reversed;

  // A single word, no need to split
  if (neutral.length === 0) {
    reversed = isLTR(str) ? str : reverse(str);
  }
  else {
    reversed = split(str, neutral).map(word => {
      if (isLTR(word)) {
        return word;
      }
      else {
        const reshapedWord = reshape(word, {ligatures, ignoreIsolates});
        const reverseWord = reverse(reshapedWord);
        return reverseWord;
      }      
    });
  }

  let transformed;

  if (Array.isArray(reversed)) {
    const merged = reversed.map((v,i) => [v, neutral[i]]).reduce((a,b) => a.concat(b));
    transformed = merged.reverse().join('');
  }
  else {
    transformed = reversed;
  }

  if (spaceHack) {
    transformed = transformed.split('').join('\u200a');
  }

  transformed = transformed.split('\n').reverse().join('\n');

  return transformed;
}

if(typeof process !== 'undefined' && process.env.ROLLUP_WATCH) {
  const text = "أنا دائم التألق بالكتابة بالعربي with English. والعربية أيضاm";
  console.log(transform(text, {ligatures: false}));
}

export default transform;