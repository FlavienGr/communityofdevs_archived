import firstLetter from './firstLetter';

const checkMaj = dataToChange => {
  const copy = { ...dataToChange };

  Object.keys(copy).map(item => {
    if (
      (copy[item] !== undefined && item === 'city') ||
      (copy[item] !== undefined && item === 'state')
    ) {
      copy[item] = firstLetter(copy[item].trim());
      return copy[item];
    }
    return item;
  });
  return copy;
};

export default checkMaj;
