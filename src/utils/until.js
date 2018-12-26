export default (conditionFunction) => {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    else setTimeout(() => poll(resolve), 500);
  };

  return new Promise(poll);
}
