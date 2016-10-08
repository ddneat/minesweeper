export default (size, amount, generateRandom) => {
  const mines = [];

  const isNotUnique = mine => (
    mines.some(({ x, y }) => (x === mine.x && y === mine.y))
  );

  let candidate;
  while (mines.length < amount) {
    do {
      candidate = {
        x: generateRandom(size.x - 1),
        y: generateRandom(size.y - 1),
      };
    } while (isNotUnique(candidate));
    mines.push(candidate);
  }

  return mines;
};
