export default (size, amount, generateRandom) => {
  const mines = [];

  const isMineUnique = (mine) => {
    const matchingMines = mines.filter(({ x, y }) => x === mine.x && y === mine.y);
    return matchingMines.length === 0;
  };

  let candidate;
  while (mines.length < amount) {
    do {
      candidate = {
        x: generateRandom(size.x - 1),
        y: generateRandom(size.y - 1),
      };
    } while (!isMineUnique(candidate));
    mines.push(candidate);
  }

  return mines;
};
