export default function(conditionFunction) {
  const poll = function(resolve) {
    if (conditionFunction()) resolve();
    else setTimeout(() => poll(resolve), 500);
  };

  return new Promise(poll);
}
