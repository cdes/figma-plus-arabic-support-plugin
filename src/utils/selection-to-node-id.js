export default (selection) => {
  const leftSideArray = selection.slice(0, Math.floor(selection.length / 2));
  const rightSideArray = selection.slice(Math.floor(selection.length / 2), selection.length);

  return `${toString(leftSideArray)}:${toString(rightSideArray)}`;
}

const toString = (array) => array.reduce((accumulator, currentValue, index) => {
  return accumulator + (currentValue * Math.pow(256, index));
})