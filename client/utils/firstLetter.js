const firstLetter = word => {
  if (typeof word !== 'string') return undefined;
  const array = word.split(' ');

  if (array.length > 1) {
    const twoOrMoreWords = array
      .map(item => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join(' ');

    return twoOrMoreWords;
  }
  const newWord = array.join('');
  return newWord.charAt(0).toUpperCase() + newWord.slice(1);
};

export default firstLetter;
